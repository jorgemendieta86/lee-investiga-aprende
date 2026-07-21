# JM — Lee, investiga, aprende

**Sitio web educativo sobre metodología de la investigación**

![JM Logo](https://img.shields.io/badge/JM-Investiga_y_aprende-38b9c9?style=for-the-badge&labelColor=12172a)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

---

## Descripción

**JM — Lee, investiga, aprende** es una plataforma web educativa diseñada para brindar contenido práctico y accesible sobre metodología de la investigación. El sitio ofrece:

- **Sección de Temas**: Contenido académico fundamentado con citas de autores referentes sobre diseño de proyectos, investigación cuantitativa, cualitativa, instrumentos de recolección, normas APA 7 y más.
- **Sección de Videos**: Contenido destacado del perfil de TikTok `@jmleeinvestigaaprende`.
- **Contacto directo**: Botón funcional de WhatsApp para consultas sobre metodología.
- **Modo oscuro/claro**: Alternancia de temas con persistencia en localStorage.
- **Diseño responsivo**: Adaptado para dispositivos móviles, tablets y escritorio.
- **Animaciones de scroll**: Efectos de aparición al hacer scroll con IntersectionObserver.

---

## Estructura del proyecto

```
LEE INVESTIGA APRENDE WEB/
├── README.md                    # Este archivo
├── Diseño/
│   └── landing_jm_investigacion_v5.html   # Diseño original de referencia
└── site/                        # Sitio web desplegable en Netlify
    ├── index.html               # Página principal
    ├── css/
    │   └── styles.css           # Estilos personalizados (basado en diseño original)
    ├── js/
    │   └── main.js              # Lógica: modos, modales, animaciones, contenido
    └── img/                     # Carpeta para imágenes (opcional)
```

---

## Despliegue en Netlify

### Opción 1: Arrastrar y soltar (más rápida)
1. Ve a [app.netlify.com](https://app.netlify.com)
2. Arrastra la carpeta `site/` directamente al área de despliegue
3. ¡Listo! Netlify generará una URL pública automáticamente

### Opción 2: Conectar con GitHub (actualización automática)
1. Sube el repositorio a GitHub
2. En Netlify, haz clic en **"New site from Git"**
3. Selecciona tu repositorio de GitHub
4. Configuración de build:
   - **Build command**: `echo "Static site"`
   - **Publish directory**: `site`
5. Cada push a `main` desplegará automáticamente los cambios

---

## Funcionalidades principales

### Sección de Temas con contenido académico
- **Diseño de Proyecto**: Problema, preguntas, objetivos, justificación
- **Investigación Cuantitativa**: Variables, hipótesis, muestreo, análisis
- **Investigación Cualitativa**: Paradigmas, diseños, técnicas de recolección
- **Instrumentos**: Construcción, validación y confiabilidad
- **APA 7**: Citas, referencias, formato general
- **Consultas**: Canal de contacto directo

### Videos de TikTok
- Incorporación de videos del perfil `@jmleeinvestigaaprende`
- Tarjetas de video con diseño responsivo

### Botón de WhatsApp
- Número: **+51 922 444 639**
- Mensaje predeterminado: "Hola, quisiera recibir información sobre los contenidos y recursos de metodología de la investigación"
- Botón flotante visible en todas las páginas

---

## Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos personalizados con variables CSS |
| **JavaScript** | Interactividad, modales, modo oscuro, animaciones |
| **IntersectionObserver API** | Animaciones al hacer scroll |
| **WhatsApp API** | Enlace directo de contacto |

---

## Cómo actualizar el contenido

### Modificar el contenido de los temas
Edita el archivo `site/js/main.js` y busca el objeto `temasContenido`. Cada tema tiene:
- `titulo`: Nombre que aparece en el modal
- `contenido`: HTML con el contenido académico, incluyendo citas y referencias

### Agregar videos de TikTok
En `site/index.html`, busca la sección `<section class="section" id="videos">` y agrega los embeds de TikTok usando el formato:
```html
<blockquote class="tiktok-embed" cite="URL_DEL_VIDEO" data-video-id="ID_DEL_VIDEO"></blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>
```

### Cambiar el número de WhatsApp
Busca y reemplaza `51922444639` en todos los archivos HTML y JS.

---

## Créditos

- **Diseño original**: `landing_jm_investigacion_v5.html`
- **Contenido académico**: Basado en obras de Sampieri, Hernández-Sampieri, Creswell, Arias, Flick, Denzin, Lincoln, APA y otros autores referentes en metodología de la investigación
- **Videos**: Perfil `@jmleeinvestigaaprende` en TikTok

---

## Licencia

© 2026 JM — Lee, investiga, aprende. Todos los derechos reservados.
