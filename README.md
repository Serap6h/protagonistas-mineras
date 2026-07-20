# Tu Ruta Protagonista — Smartlink

Micrositio de una sola página: guía del proceso de postulación a **Protagonistas Mineras**, el programa de Gold Fields Perú que impulsa la participación femenina en la minería. HTML + CSS + JS vanilla — sin build, sin npm.

## Contenido y fuente de verdad

Todo el copy (las 8 etapas del proceso de selección, tips, notas, el bloque de Eficiencia Profesional, los temas de recursos y las FAQs) proviene de `TU RUTA PROTAGONISTA.docx`. La única parte que no sale de ese documento es la introducción breve de la sección "Protagonistas Mineras", que reutiliza la descripción del programa ya validada anteriormente.

Historial: reemplazó a una versión de 13 etapas (`Blog PPMM.pptx`), que a su vez reemplazó a la versión inicial de plan de difusión (`PLAN DIFUSION PPMM 2026 VF.pptx`).

### Diseño del proceso como "ruta"

Las 8 etapas se muestran como una línea/ruta vertical con nodos numerados. Un sello de contacto por etapa indica qué equipo te contacta: **Eficiencia Profesional** (ocre, etapas 1–3) y **Gold Fields** (navy, etapas 4–8), con un marcador de relevo entre la etapa 3 y la 4. Cada etapa es un `<details>` nativo que abre su detalle (qué significa, qué esperar, tips).

### Recursos → toolkit de Eficiencia Profesional

Los botones "Explorar recursos" y "Prepararme mejor" enlazan al toolkit externo:
`https://t-sml.mtrbio.com/public/smartlink/eficienciaprofesionalredes` (se abre en pestaña nueva).

## Paleta de marca

Los colores se tomaron directamente de [goldfields.com.pe](https://goldfields.com.pe/) (inspeccionando su CSS, no inventados):

| Color | Hex | Uso |
|---|---|---|
| Navy | `#001D39` | Dominante — títulos, hero, CTA final |
| Teal | `#1BB398` | Acento principal — botones, links, números de etapa |
| Dorado | `#C8A064` | Acento terciario — detalles, tips |
| Fondo claro | `#EEEEF0` | Fondo base |

Tipografía: **Open Sans** (la misma que usa el sitio oficial).

## Fotografías

Las 4 fotos reales (`assets/source/`) convertidas a WebP en `assets/img/`. Ninguna tiene nombre propio asociado — los `alt` describen la escena sin atribuir identidad no confirmada:

| Archivo | Uso actual |
|---|---|
| `hero-mirador.webp` | Hero |
| `retrato-planta.webp` | Sección "Protagonistas Mineras" |
| `comunidad-dos.webp` | Banner "protagonistas en campo" dentro de "La ruta" |
| `comunidad-frame.webp` | Sin usar actualmente (disponible para reincorporar) |

## Estructura

```
index.html          ← contenido, hardcodeado (el sitio se lee igual sin JS)
styles.css           ← una sola hoja, mobile-first
main.js              ← IIFE, progressive enhancement (nav, reveals, anclas)
lib/manifest.js      ← datos mínimos de marca
assets/img/          ← imágenes WebP + favicon.svg + og-image.jpg
assets/source/        ← fotos originales (no se sube al repo, ver .gitignore)
tools/                ← libwebp usado para convertir a WebP (dev-only, no se sube)
.nojekyll             ← evita que GitHub Pages procese el sitio con Jekyll
```

Las 13 etapas del proceso y las FAQs usan `<details>`/`<summary>` nativos de HTML — funcionan sin JavaScript.

## Vista previa local

Sin Python instalado, se usa un servidor mínimo en PowerShell:
```
powershell -File tools/serve.ps1 -Port 8765
```
y abre `http://localhost:8765/`. También funciona abriendo `index.html` directamente con doble clic.

## Publicar en GitHub Pages

Ya está publicado en **https://serap6h.github.io/protagonistas-mineras/**. Para futuros cambios:

```bash
git add .
git commit -m "describe tu cambio"
git push
```

GitHub reconstruye el sitio solo en 1-2 minutos con cada push a `main` (Settings → Pages ya está configurado: rama `main`, carpeta `/root`).

### Cache-busting

Cada `<link>` y `<script>` en `index.html` lleva `?v=20260702`. En cada deploy futuro, sube ese número (o usa la fecha del día) para forzar que los navegadores descarguen la versión nueva de `styles.css`, `main.js` y `lib/manifest.js`.
