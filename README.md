# Protagonistas Mineras 2026 — Smartlink

Micrositio de una sola página para la campaña **Protagonistas Mineras** de Gold Fields Perú (5ª convocatoria, 2026). HTML + CSS + JS vanilla — sin build, sin npm.

## Contenido y fuente de verdad

Todo el copy del sitio proviene del PPT `PLAN DIFUSION PPMM 2026 VF.pptx` (objetivos, mensajes clave, cronograma de convocatoria, gremios aliados) y de la descripción del programa dada al construir el sitio. El PPT **no contenía** perfiles individuales de protagonistas (nombres, cargos, historias, citas personales) — por eso el sitio está centrado en el programa y su convocatoria, no en biografías inventadas.

Las 4 fotografías reales usadas (`assets/source/`) se convirtieron a WebP en `assets/img/`:

| Archivo original | Uso en el sitio |
|---|---|
| `WhatsApp Image 2026-02-26 at 4.25.06 PM.jpeg` | Hero (mirador de la operación) |
| `DSC05205.jpg` | Galería — retrato en planta de procesos |
| `WhatsApp-Image-2025-05-29-at-10.01.45-AM.jpeg` | Galería — foto grupal con marco oficial |
| `captura-4-comunidad.jpg` | Galería — dos protagonistas en campo |

Ninguna de estas fotos tiene un nombre propio asociado; los `alt` describen la escena de forma respetuosa, sin atribuir identidad no confirmada.

## Pendiente de tu parte

1. **Enlace de postulación**: en `lib/manifest.js`, `applyUrl` está en `null`. El botón "Postulación próximamente" se activa solo automáticamente en cuanto pongas la URL real ahí (desde el 8 de julio de 2026).
2. **URLs absolutas de `index.html`**: reemplaza `https://TU-USUARIO.github.io/protagonistas-mineras/` por la URL real de tu GitHub Pages en las etiquetas `canonical`, `og:url`, `og:image` y `twitter:image` — son necesarias para que la vista previa se vea bien al compartir en redes.

## Estructura

```
index.html          ← contenido, hardcodeado (el sitio se lee igual sin JS)
styles.css           ← una sola hoja, mobile-first
main.js              ← IIFE, progressive enhancement (nav, reveals, timeline "HOY")
lib/manifest.js      ← datos de campaña (applyUrl, fechas clave)
assets/img/          ← imágenes WebP + favicon.svg + og-image.jpg
assets/source/        ← fotos originales (no se sube al repo, ver .gitignore)
tools/                ← libwebp usado para convertir a WebP (dev-only, no se sube)
.nojekyll             ← evita que GitHub Pages procese el sitio con Jekyll
```

## Vista previa local

```
python -m http.server 8765
```
y abre `http://localhost:8765/`. También funciona abriendo `index.html` directamente con doble clic (todas las rutas son relativas).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta (`git init`, `git add`, `git commit`, `git push`).
2. En el repo: **Settings → Pages**.
3. En **Source**, elige **Deploy from a branch**.
4. Rama: `main` (o la que uses) — carpeta: **/ (root)**, ya que `index.html` está en la raíz.
5. Guarda. GitHub publica en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` en 1–2 minutos.
6. Actualiza las URLs absolutas mencionadas arriba y vuelve a subir (`git push`) para que las previews de Open Graph/Twitter apunten al lugar correcto.

### Dominio propio (opcional)

Si más adelante agregas un dominio propio, crea un archivo `CNAME` (sin extensión) en la raíz del repo con el dominio, por ejemplo:
```
protagonistasmineras.goldfields.pe
```
y configura el registro DNS correspondiente apuntando a GitHub Pages.

### Cache-busting

Cada `<link>` y `<script>` en `index.html` lleva `?v=20260701`. En cada deploy futuro, sube ese número (o usa la fecha del día) para forzar que los navegadores descarguen la versión nueva de `styles.css`, `main.js` y `lib/manifest.js`.
