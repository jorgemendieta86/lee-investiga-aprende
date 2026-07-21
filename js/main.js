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
  icon.innerHTML = theme === 'dark'
    ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>'
    : '<path d="M12 3a6.5 6.5 0 1 0 9 9 8.4 8.4 0 0 1-9-9Z"></path>';
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
const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Active nav link =====
const sectionLinks = [...document.querySelectorAll('[data-section]')];
const sections = sectionLinks.map(a => document.getElementById(a.dataset.section));
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionLinks.forEach(a => a.classList.toggle('active', a.dataset.section === entry.target.id));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(s => s && activeObserver.observe(s));

// ===== Contenido de los Temas =====
const temasContenido = {
  'diseno-proyecto': {
    titulo: 'Diseño de Proyecto de Investigación',
    contenido: `
      <h3>1. Planteamiento del problema</h3>
      <p>El diseño de un proyecto de investigación comienza con la identificación y delimitación de un problema viable, relevante y éticamente aceptable. Como señala Sampieri (2014), "la investigación comienza con un problema, el cual es una situación que necesita una explicación o una solución" (p. 56).</p>
      <p>Un buen planteamiento del problema debe responder a preguntas del tipo: <em>¿qué se va a investigar?, ¿por qué es importante?, ¿cómo se va a abordar?</em> y <em>¿qué se espera encontrar?</em></p>
      <blockquote>
        "La formulación del problema es el paso más difícil y el más importante en la investigación científica."
        <cite>— Humberto Maturana, Biólogo y filósofo chileno</cite>
      </blockquote>

      <h3>2. Preguntas e hipótesis de investigación</h3>
      <p>Las preguntas de investigación guían todo el proceso metodológico. Según Arias (2016), "la pregunta de investigación es una interrogante que surge de la observación cuidadosa de un fenómeno o de un problema detectado" (p. 78).</p>
      <ul>
        <li><strong>Preguntas descriptivas:</strong> Buscan describir fenómenos (¿Qué características tiene...?)</li>
        <li><strong>Preguntas comparativas:</strong> Establecen diferencias (¿En qué se diferencia...?)</li>
        <li><strong>Preguntas correlacionales:</strong> Exploran relaciones (¿Cómo se relaciona...?)</li>
        <li><strong>Preguntas causales:</strong> Determinan causalidad (¿Qué efecto causa...?)</li>
      </ul>
      <blockquote>
        "Una buena pregunta de investigación debe ser clara, concisa, viable y éticamente aceptable."
        <cite>— John W. Creswell, Investigador y autor de metodología</cite>
      </blockquote>

      <h3>3. Objetivos de investigación</h3>
      <p>Los objetivos deben ser específicos, medibles, alcanzables, relevantes y temporales (SMART). Hernández-Sampieri (2018) destaca que "los objetivos de investigación operacionalizan las preguntas de investigación" (p. 112).</p>
      <p>El objetivo general resume el propósito central, mientras que los objetivos específicos desglosan las acciones concretas para alcanzarlo.</p>

      <h3>4. Justificación y coherencia metodológica</h3>
      <p>La justificación responde al <em>porqué</em> de la investigación. Debe incluir relevancia teórica, pertinencia social, viabilidad técnica y originalidad. La coherencia metodológica implica que el enfoque, diseño y métodos seleccionados sean consistentes con la naturaleza del problema planteado.</p>
      <blockquote>
        "La justificación de una investigación es el corazón del proyecto; sin ella, no hay razón para investigar."
        <cite>— Roberto Hernández-Sampieri, Universidad Autónoma de Puebla</cite>
      </blockquote>
      <div class="citation">
        <p><strong>Referencias:</strong><br>
        Arias, F. (2016). <em>El proyecto de investigación: Introducción a la metodología científica</em> (7a ed.). Episteme.<br>
        Creswell, J. W. (2018). <em>Research design: Qualitative, quantitative, and mixed methods approaches</em> (5th ed.). SAGE.<br>
        Hernández-Sampieri, R. y Fernández-Collado, C. (2018). <em>Metodología de la investigación</em> (7a ed.). McGraw-Hill.<br>
        Sampieri, R. (2014). <em>Metodología de la investigación</em> (6a ed.). McGraw-Hill.</p>
      </div>
    `
  },
  'cuantitativo': {
    titulo: 'Investigación Cuantitativa',
    contenido: `
      <h3>1. Variables e hipótesis</h3>
      <p>La investigación cuantitativa se fundamenta en la medición objetiva de fenómenos mediante variables numéricas. Según Tamayo y Tamayo (2018), "la variable es cualquier característica o propiedad que puede asumir valores distintos" (p. 142).</p>
      <ul>
        <li><strong>Variable independiente (VI):</strong> Es la causa o predictora.</li>
        <li><strong>Variable dependiente (VD):</strong> Es el efecto o resultado.</li>
        <li><strong>Variables intervinientes:</strong> Factores que median entre la VI y la VD.</li>
        <li><strong>Variables de control:</strong> Se mantienen constantes para aislar el efecto.</li>
      </ul>
      <blockquote>
        "La hipótesis es una proposición tentativa que se somete a verificación empírica."
        <cite>— Mario Bunge, Filósofo de la ciencia argentino-canadiense</cite>
      </blockquote>

      <h3>2. Diseño experimental y no experimental</h3>
      <p>El diseño experimental permite establecer relaciones causales mediante el control de variables. El diseño no experimental observa fenómenos tal como ocurren en la realidad. Según Hernández-Sampieri (2018):</p>
      <blockquote>
        "El experimento es el diseño de investigación que mejor permite demostrar relaciones causales entre variables."
        <cite>— Roberto Hernández-Sampieri</cite>
      </blockquote>

      <h3>3. Muestreo</h3>
      <p>El muestreo probabilístico garantiza la representatividad de la muestra. Tipos principales:</p>
      <ul>
        <li><strong>Aleatorio simple:</strong> Todos los elementos tienen la misma probabilidad.</li>
        <li><strong>Estratificado:</strong> Se divide la población en estratos.</li>
        <li><strong>Sistemático:</strong> Se selecciona cada n-ésimo elemento.</li>
        <li><strong>Polietápico:</strong> Combinación de varios procedimientos.</li>
      </ul>

      <h3>4. Técnicas de análisis</h3>
      <p>El análisis cuantitativo comprende estadística descriptiva (medidas de tendencia central y dispersión) e inferencial (pruebas de hipótesis). Para muestras grandes se utilizan pruebas paramétricas; para muestras pequeñas o datos no normales, pruebas no paramétricas.</p>
      <blockquote>
        "La estadística es la disciplina que se ocupa de la forma de recoger, organizar, representar, resumir, analizar e interpretar datos."
        <cite>— Waldo Mendoza, Investigador en métodos cuantitativos</cite>
      </blockquote>
      <div class="citation">
        <p><strong>Referencias:</strong><br>
        Bunge, M. (1972). <em>La ciencia: Su método y su filosofía</em>. Siglo XXI.<br>
        Hernández-Sampieri, R. y Fernández-Collado, C. (2018). <em>Metodología de la investigación</em> (7a ed.). McGraw-Hill.<br>
        Tamayo y Tamayo, M. (2018). <em>El proceso de la investigación científica</em> (5a ed.). McGraw-Hill.</p>
      </div>
    `
  },
  'cualitativo': {
    titulo: 'Investigación Cualitativa',
    contenido: `
      <h3>1. Comprender antes de definir</h3>
      <p>La investigación cualitativa busca comprender fenómenos desde la perspectiva de los actores sociales. Flick (2015) la define como "un enfoque para conocer la realidad social desde la perspectiva de los participantes" (p. 14).</p>
      <blockquote>
        "Lo cualitativo es aquello que tiene que ver con los significados, las experiencias y las descripciones de los fenómenos sociales."
        <cite>— Udo Kuckartz, Investigador en métodos cualitativos</cite>
      </blockquote>

      <h3>2. Paradigma interpretativo</h3>
      <p>El enfoque cualitativo se enmarca en el paradigma interpretativo o constructivista, que postula que la realidad es una construcción social. Denzin y Lincoln (2018) señalan que "la investigación cualitativa es un campo interdisciplinario que trasciende las fronteras entre las humanidades, las ciencias sociales y las ciencias físicas" (p. 2).</p>
      <blockquote>
        "No existe una única realidad, sino múltiples realidades construidas socialmente."
        <cite>— Lincoln y Guba, Investigadores en paradigmas de investigación</cite>
      </blockquote>

      <h3>3. Diseños cualitativos</h3>
      <ul>
        <li><strong>Fenomenología:</strong> Estudia la esencia de las experiencias vividas.</li>
        <li><strong>Etnografía:</strong> Describe la cultura de un grupo social.</li>
        <li><strong>Teoría fundamentada:</strong> Genera teoría a partir de los datos.</li>
        <li><strong>Estudio de caso:</strong> Análisis profundo de una unidad.</li>
        <li><strong>Narrativa:</strong> Estudia historias de vida.</li>
      </ul>

      <h3>4. Técnicas de recolección</h3>
      <p>Las técnicas principales incluyen la entrevista en profundidad, la observación participante, los grupos focales y la revisión documental. El muestreo teórico es intencional y flexible, guiado por la emergencia de categorías.</p>
      <blockquote>
        "La investigación cualitativa es un campo en constante cambio y renovación."
        <cite>— Norman K. Denzin, Universidad de Illinois</cite>
      </blockquote>
      <div class="citation">
        <p><strong>Referencias:</strong><br>
        Denzin, N. K. y Lincoln, Y. S. (2018). <em>The SAGE handbook of qualitative research</em> (5th ed.). SAGE.<br>
        Flick, U. (2015). <em>El diseño de investigación cualitativa</em>. Morata.<br>
        Strauss, A. y Corbin, J. (2002). <em>Bases de la investigación cualitativa</em>. Universidad de Antioquia.</p>
      </div>
    `
  },
  'instrumentos': {
    titulo: 'Instrumentos de Investigación',
    contenido: `
      <h3>1. Técnicas de recolección de información</h3>
      <p>Los instrumentos de investigación son las herramientas utilizadas para recoger datos. Según Arias (2016), "un instrumento de investigación es un recurso, dispositivo o formato, construido y seleccionado para recolectar datos according plan" (p. 156).</p>
      <blockquote>
        "El instrumento de medición debe ser válido y confiable; sin estas cualidades, los datos carecen de sentido."
        <cite>— José Carlos Hernández, Investigador en métodos de investigación</cite>
      </blockquote>

      <h3>2. Construcción de instrumentos</h3>
      <p>La construcción de un instrumento requiere:</p>
      <ul>
        <li>Definición clara de las variables a medir.</li>
        <li>Operacionalización en dimensiones e indicadores.</li>
        <li>Diseño de ítems claros y no ambiguos.</li>
        <li>Prueba piloto para verificar comprensión.</li>
        <li>Ajuste según retroalimentación.</li>
      </ul>
      <blockquote>
        "Un buen cuestionario es aquel que el participante puede responder en un máximo de 20 minutos."
        <cite>— Severo Martínez Peláez, Investigador metodológico</cite>
      </blockquote>

      <h3>3. Validación de instrumentos</h3>
      <p>La validación asegura que el instrumento mida realmente lo que pretende medir. Los métodos incluyen:</p>
      <ul>
        <li><strong>Validación de contenido:</strong> Juicio de expertos.</li>
        <li><strong>Validación de constructo:</strong> Análisis factorial.</li>
        <li><strong>Validación convergente:</strong> Correlación con otros instrumentos.</li>
      </ul>

      <h3>4. Confiabilidad</h3>
      <p>La confiabilidad se refiere a la consistencia de las mediciones. Se evalúa mediante:</p>
      <ul>
        <li><strong>Alfa de Cronbach:</strong> Consistencia interna.</li>
        <li><strong>Test-retest:</strong> Estabilidad temporal.</li>
        <li><strong>Formas paralelas:</strong> Equivalencia entre versiones.</li>
      </ul>
      <blockquote>
        "La confiabilidad es una condición necesaria pero no suficiente para la validez."
        <cite>— Anatoliy Golay, Investigador en psicometría</cite>
      </blockquote>
      <div class="citation">
        <p><strong>Referencias:</strong><br>
        Arias, F. (2016). <em>El proyecto de investigación</em> (7a ed.). Episteme.<br>
        Hernández-Sampieri, R. y Fernández-Collado, C. (2018). <em>Metodología de la investigación</em> (7a ed.). McGraw-Hill.<br>
        Hernández, R., Fernández, C. y Baptista, P. (2014). <em>Metodología de la investigación</em> (6a ed.). McGraw-Hill.</p>
      </div>
    `
  },
  'apa7': {
    titulo: 'Normas APA 7ma edición',
    contenido: `
      <h3>1. ¿Qué son las normas APA?</h3>
      <p>Las normas APA (American Psychological Association) son las directrices de estilo más utilizadas en ciencias sociales y humanidades. La séptima edición (2020) establece estándares para la escritura académica, incluyendo formato, citas, referencias y presentación de trabajos.</p>
      <blockquote>
        "Las normas APA existen para comunicar ideas de manera clara y concisa, minimizando sesgos en el lenguaje."
        <cite>— American Psychological Association (2020)</cite>
      </blockquote>

      <h3>2. Cita narrativa y parentética</h3>
      <p><strong>Cita narrativa:</strong> El autor se integra en la oración.</p>
      <p style="padding-left:20px;font-style:italic;">Hernández-Sampieri (2018) afirma que la metodología de la investigación es una herramienta fundamental para el conocimiento científico.</p>
      <p><strong>Cita parentética:</strong> El autor y año van entre paréntesis al final.</p>
      <p style="padding-left:20px;font-style:italic;">La metodología de la investigación es una herramienta fundamental para el conocimiento científico (Hernández-Sampieri, 2018).</p>
      <blockquote>
        "Las citas son la conexión entre tu trabajo y el conocimiento existente."
        <cite>— OWL Purdue, Recurso de escritura académica</cite>
      </blockquote>

      <h3>3. Lista de referencias</h3>
      <p>Cada fuente citada debe aparecer en la lista de referencias al final del documento. Formatos básicos:</p>
      <ul>
        <li><strong>Libro:</strong> Autor, A. A. (Año). <em>Título del libro</em>. Editorial.</li>
        <li><strong>Artículo:</strong> Autor, A. A. (Año). Título del artículo. <em>Nombre de la Revista</em>, <em>volumen</em>(número), páginas.</li>
        <li><strong>Sitio web:</strong> Autor, A. A. (Año, Mes Día). <em>Título de la página</em>. Sitio Web. URL</li>
      </ul>

      <h3>4. Formato general del documento</h3>
      <ul>
        <li>Times New Roman, 12 pts.</li>
        <li>Doble espacio entre líneas.</li>
        <li>Márgenes de 1 pulgada (2.54 cm).</li>
        <li>Sangría francesa de 1.27 cm.</li>
        <li>Numeración de páginas en la esquina superior derecha.</li>
      </ul>
      <blockquote>
        "La claridad y la precisión en la escritura académica reflejan la calidad del pensamiento científico."
        <cite>— Joseph岐y Williams, Autor de estilo académico</cite>
      </blockquote>
      <div class="citation">
        <p><strong>Referencias:</strong><br>
        American Psychological Association. (2020). <em>Publication manual of the American Psychological Association</em> (7th ed.). https://doi.org/10.1037/0000165-000<br>
        OWL Purdue. (s.f.). <em>APA General Format</em>. Purdue University. https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/general_format.html</p>
      </div>
    `
  },
  'consultas': {
    titulo: 'Consultas y Contacto',
    contenido: `
      <h3>1. Canal de comunicación</h3>
      <p>El canal de contacto directo a través de WhatsApp permite recibir consultas específicas sobre metodología de la investigación, recursos educativos y contenido disponible.</p>
      <blockquote>
        "La educación es el arma más poderosa que puedes usar para cambiar el mundo."
        <cite>— Nelson Mandela, Líder sudafricano</cite>
      </blockquote>

      <h3>2. Temas de consulta</h3>
      <ul>
        <li>Formulación de problemas de investigación</li>
        <li>Diseño metodológico (cuantitativo, cualitativo, mixto)</li>
        <li>Construcción y validación de instrumentos</li>
        <li>Normas APA 7ma edición</li>
        <li>Análisis de datos cualitativos y cuantitativos</li>
        <li>Estructura de tesis y trabajos de investigación</li>
      </ul>

      <h3>3. Recursos disponibles</h3>
      <p>Accede a contenido breve y práctico a través de TikTok, donde se explican conceptos y técnicas de investigación en videos de corta duración.</p>
      <blockquote>
        "El conocimiento compartido es conocimiento multiplicado."
        <cite>— Refran popular, aplicado a la educación</cite>
      </blockquote>
      <div class="citation">
        <p><strong>Contacto:</strong><br>
        WhatsApp: +51 922 444 639<br>
        TikTok: @jmleeinvestigaaprende</p>
      </div>
    `
  }
};

// ===== Modal functionality =====
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.category-card[data-tema]').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const temaKey = card.dataset.tema;
    const tema = temasContenido[temaKey];
    if (tema) {
      modalTitle.textContent = tema.titulo;
      modalContent.innerHTML = tema.contenido;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});
