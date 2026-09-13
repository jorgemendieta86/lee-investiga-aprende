// ===== TikTok lazy-load =====
let tiktokScriptLoaded = false;
function loadTiktokScript(cb) {
  if (tiktokScriptLoaded) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://www.tiktok.com/embed.js';
  s.async = true;
  s.onload = function() { tiktokScriptLoaded = true; cb(); };
  document.body.appendChild(s);
}

document.querySelectorAll('.tiktok-lazy-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var wrapper = btn.closest('.embed-wrapper');
    var videoId = wrapper.dataset.tiktokId;
    var user = wrapper.dataset.tiktokUser;
    if (!videoId || !user) return;
    loadTiktokScript(function() {
      var bq = document.createElement('blockquote');
      bq.className = 'tiktok-embed';
      bq.cite = 'https://www.tiktok.com/@' + user + '/video/' + videoId;
      bq.dataset.videoId = videoId;
      bq.style.cssText = 'max-width:605px;min-width:325px';
      var sec = document.createElement('section');
      var a = document.createElement('a');
      a.target = '_blank';
      a.href = 'https://www.tiktok.com/@' + user + '?refer=embed';
      a.textContent = '@' + user;
      sec.appendChild(a);
      sec.appendChild(document.createTextNode(' Video de TikTok'));
      bq.appendChild(sec);
      wrapper.innerHTML = '';
      wrapper.appendChild(bq);
      wrapper.classList.add('loaded');
      if (typeof tiktok !== 'undefined' && tiktok.embed) {
        tiktok.embed();
      }
    });
  });
});

// ===== Tema oscuro/claro =====
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
let saved = null;
try { saved = localStorage.getItem('jm-theme'); } catch(e) {}
const initial = saved || 'light';
function paint(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem('jm-theme', theme); } catch(e) {}
  const isDark = theme === 'dark';
  icon.innerHTML = isDark
    ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>'
    : '<path d="M12 3a6.5 6.5 0 1 0 9 9 8.4 8.4 0 0 1-9-9Z"></path>';
  toggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}
paint(initial);
toggle.addEventListener('click', () => paint(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// ===== Menú móvil =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// ===== Header scroll =====
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

// ===== Reveal on scroll =====
if ('IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        revealObserver.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) revealObserver.observe(reveals[i]);
} else {
  var allReveals = document.querySelectorAll('.reveal');
  for (var j = 0; j < allReveals.length; j++) allReveals[j].classList.add('visible');
}

// ===== Active nav link =====
if ('IntersectionObserver' in window) {
  var sectionLinks = document.querySelectorAll('[data-section]');
  var sectionsArr = [];
  for (var i = 0; i < sectionLinks.length; i++) {
    sectionsArr.push(document.getElementById(sectionLinks[i].dataset.section));
  }
  var activeObserver = new IntersectionObserver(function(entries) {
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].isIntersecting) {
        for (var k = 0; k < sectionLinks.length; k++) {
          var isActive = sectionLinks[k].dataset.section === entries[j].target.id;
          sectionLinks[k].classList.toggle('active', isActive);
          if (isActive) sectionLinks[k].setAttribute('aria-current', 'page');
          else sectionLinks[k].removeAttribute('aria-current');
        }
      }
    }
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  for (var s = 0; s < sectionsArr.length; s++) {
    if (sectionsArr[s]) activeObserver.observe(sectionsArr[s]);
  }
}
