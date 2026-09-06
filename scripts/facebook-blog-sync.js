#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT_DIR = process.cwd();
const DEFAULT_SITE_URL = 'https://jmleeinvestigaaprende.com';
const DEFAULT_PAGE_ID = '61585830158735';

const MODE = process.env.MODE || process.argv[2] || 'auto';
const DRY_RUN = String(process.env.DRY_RUN || '').toLowerCase() === 'true';
const SITE_URL = normalizeSiteUrl(process.env.SITE_URL || DEFAULT_SITE_URL);
const PAGE_ID = process.env.FACEBOOK_PAGE_ID || DEFAULT_PAGE_ID;
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '';

async function main() {
  const allPosts = getAllPosts();

  if (!allPosts.length) {
    throw new Error('No se encontraron articulos del blog para sincronizar.');
  }

  if (MODE === 'list') {
    logDiscoveredPosts(allPosts);
    return;
  }

  const selectedPosts = MODE === 'backfill'
    ? allPosts
    : allPosts.filter((post) => getChangedFiles().includes(post.file));

  if (!selectedPosts.length) {
    console.log('No hay articulos nuevos para publicar en Facebook.');
    return;
  }

  console.log(`Modo: ${MODE}`);
  console.log(`Dry run: ${DRY_RUN ? 'si' : 'no'}`);
  console.log(`Articulos seleccionados: ${selectedPosts.length}`);

  if (DRY_RUN) {
    selectedPosts.forEach((post) => {
      console.log(`- ${post.title} -> ${post.url}`);
    });
    return;
  }

  if (!PAGE_ACCESS_TOKEN) {
    throw new Error('Falta la variable FACEBOOK_PAGE_ACCESS_TOKEN.');
  }

  const existingUrls = await getExistingFacebookUrls();
  let created = 0;
  let skipped = 0;

  for (const post of selectedPosts) {
    if (existingUrls.has(post.url)) {
      skipped += 1;
      console.log(`Saltado (ya existe): ${post.title}`);
      continue;
    }

    const response = await publishToFacebook(post);
    created += 1;
    existingUrls.add(post.url);
    console.log(`Publicado: ${post.title} -> ${response.id}`);
  }

  console.log(`Resultado final: ${created} publicados, ${skipped} omitidos.`);
}

function getAllPosts() {
  const indexedPosts = getIndexedPosts();
  const indexedFiles = new Set(indexedPosts.map((post) => post.file));
  const articleFiles = fs.readdirSync(ROOT_DIR)
    .filter((file) => /^blog-(?!html$).+\.html$/i.test(file))
    .sort();

  const posts = indexedPosts.slice();
  for (const file of articleFiles) {
    if (!indexedFiles.has(file)) {
      posts.push(readArticlePost(file));
    }
  }

  return posts.sort((a, b) => {
    const left = a.datetime || '';
    const right = b.datetime || '';
    return left.localeCompare(right) || a.file.localeCompare(b.file);
  });
}

function getIndexedPosts() {
  const blogIndexPath = path.join(ROOT_DIR, 'blog.html');
  if (!fs.existsSync(blogIndexPath)) {
    return [];
  }

  const html = fs.readFileSync(blogIndexPath, 'utf8');
  const cardRegex = /<a href="(blog-[^"]+\.html)" class="blog-card[^\"]*">[\s\S]*?<time datetime="([^"]+)">([\s\S]*?)<\/time>[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<p>([\s\S]*?)<\/p>/gi;
  const posts = [];
  let match;

  while ((match = cardRegex.exec(html)) !== null) {
    const file = match[1].trim();
    const articleDetails = readArticlePost(file);
    posts.push({
      ...articleDetails,
      datetime: cleanText(match[2]),
      dateLabel: cleanText(match[3]),
      title: cleanText(match[4]) || articleDetails.title,
      excerpt: cleanText(match[5]) || articleDetails.excerpt
    });
  }

  return posts;
}

function readArticlePost(file) {
  const filePath = path.join(ROOT_DIR, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const title = cleanText(extract(html, /<h1>([\s\S]*?)<\/h1>/i)) || file;
  const subtitle = cleanText(extract(html, /<p class="article-subtitle">([\s\S]*?)<\/p>/i));
  const metaDescription = cleanText(extract(html, /<meta name="description" content="([^"]+)"/i));
  const dateLabel = cleanText(extract(html, /<span class="article-date">[\s\S]*?<\/svg>\s*([\s\S]*?)<\/span>/i));

  return {
    file,
    title,
    excerpt: subtitle || metaDescription,
    dateLabel,
    datetime: '',
    url: `${SITE_URL}/${file}`,
    message: buildFacebookMessage({ title, excerpt: subtitle || metaDescription, url: `${SITE_URL}/${file}` })
  };
}

function buildFacebookMessage(post) {
  const lines = [post.title];
  if (post.excerpt) {
    lines.push('', post.excerpt);
  }
  lines.push('', 'Lee el articulo completo aqui:', post.url);
  return lines.join('\n');
}

function getChangedFiles() {
  if (MODE !== 'auto') {
    return [];
  }

  const before = process.env.GITHUB_EVENT_BEFORE;
  const after = process.env.GITHUB_SHA || 'HEAD';
  let diffTarget = [];

  if (before && !/^0+$/.test(before)) {
    diffTarget = [before, after];
  } else {
    try {
      execFileSync('git', ['rev-parse', 'HEAD~1'], { cwd: ROOT_DIR, stdio: 'ignore' });
      diffTarget = ['HEAD~1', 'HEAD'];
    } catch (error) {
      return [];
    }
  }

  const output = execFileSync('git', ['diff', '--name-only', diffTarget[0], diffTarget[1], '--', 'blog-*.html'], {
    cwd: ROOT_DIR,
    encoding: 'utf8'
  });

  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && line !== 'blog.html' && /^blog-(?!html$).+\.html$/i.test(line));
}

async function getExistingFacebookUrls() {
  const existingUrls = new Set();
  let nextUrl = graphUrl(`/${PAGE_ID}/feed?fields=message&limit=100`);
  let pagesRead = 0;

  while (nextUrl && pagesRead < 5) {
    const payload = await graphRequest(nextUrl, { method: 'GET' });
    const posts = Array.isArray(payload.data) ? payload.data : [];

    for (const post of posts) {
      const urls = extractUrls(post.message || '');
      urls.forEach((url) => existingUrls.add(url));
    }

    nextUrl = payload.paging && payload.paging.next ? payload.paging.next : null;
    pagesRead += 1;
  }

  return existingUrls;
}

async function publishToFacebook(post) {
  const response = await graphRequest(graphUrl(`/${PAGE_ID}/feed`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      access_token: PAGE_ACCESS_TOKEN,
      message: post.message,
      link: post.url
    })
  });

  return response;
}

async function graphRequest(url, options) {
  const requestUrl = appendToken(url);
  const response = await fetch(requestUrl, options);
  const payload = await response.json();

  if (!response.ok || payload.error) {
    const message = payload && payload.error && payload.error.message
      ? payload.error.message
      : `Facebook Graph API devolvio HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function appendToken(url) {
  const parsed = new URL(url);
  if (!parsed.searchParams.has('access_token')) {
    parsed.searchParams.set('access_token', PAGE_ACCESS_TOKEN);
  }
  return parsed.toString();
}

function graphUrl(pathname) {
  return `https://graph.facebook.com/v23.0${pathname}`;
}

function extract(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : '';
}

function cleanText(value) {
  return decodeHtml(String(value || ''))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&aacute;/gi, 'a')
    .replace(/&eacute;/gi, 'e')
    .replace(/&iacute;/gi, 'i')
    .replace(/&oacute;/gi, 'o')
    .replace(/&uacute;/gi, 'u')
    .replace(/&ntilde;/gi, 'n')
    .replace(/&uuml;/gi, 'u');
}

function extractUrls(text) {
  return Array.from(text.matchAll(/https?:\/\/[^\s]+/gi), (match) => match[0].replace(/[),.;]+$/, ''));
}

function normalizeSiteUrl(value) {
  return String(value || DEFAULT_SITE_URL).replace(/\/+$/, '');
}

function logDiscoveredPosts(posts) {
  console.log(`Articulos detectados: ${posts.length}`);
  posts.forEach((post) => {
    console.log(`- ${post.dateLabel || 'Sin fecha'} | ${post.title} | ${post.url}`);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
