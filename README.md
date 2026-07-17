# Cynex | Roblox Scripter Portfolio

A static, editable Roblox developer portfolio built with semantic HTML, CSS, and vanilla JavaScript. It is ready for GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, or a standard web server.

## Preview locally

Opening `index.html` directly displays the complete site with saved local media. For development, serve the folder over HTTP:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Edit the portfolio

- Page copy and section structure: `index.html`
- Projects, live games, skills, groups, servers, and testimonials: `assets/js/data.js`
- Layout, typography, responsive rules, and animation system: `assets/css/styles.css`
- Rendering and interactions: `assets/js/app.js`
- Roblox and Discord media requests: `assets/js/media-service.js`
- Public proxy configuration: `assets/js/runtime-config.js`

After changing JavaScript source files, rebuild the browser bundle:

```bash
npm run build
```

## Client agreement

The website includes a scrollable five-page document viewer with page thumbnails, zoom controls, an open-in-browser action, and a direct download for:

- `downloads/Cynex-Services-Agreement-Fillable.pdf`
- `downloads/Cynex-Services-Agreement-Original.pdf`

The fillable version contains 32 editable project, payment, contact, milestone, and signature fields. The developer email is prefilled as `nathanielmadridgaminde@proton.me`. Rendered page previews are stored in `assets/contract-pages/` so the form remains readable inside the portfolio without depending on a browser PDF plug-in.

## Content and interaction

The portfolio data file includes six demonstrations, three published experiences, eight professional proficiency areas, four Roblox groups, two Discord communities, and nine Fiverr client reviews. Continuous decorative motion, pointer interpolation, counters, skill meters, a typed testimonial carousel, live time, and the document viewer are implemented without a frontend framework. Motion is disabled when `prefers-reduced-motion` is active.

## Roblox and Discord media

Saved images under `assets/cached-media/` render immediately, so cards never depend on a successful third-party request to remain usable.

For deployed sites, `npm run cache-media` refreshes game thumbnails, Roblox group icons, and public Discord server icons from the official services. The GitHub Pages workflow in `.github/workflows/deploy-pages.yml` runs this refresh during deployment and once each week. Existing local images remain in place when a service is unavailable or an invite no longer resolves.

An optional Worker proxy is included under `worker/` for environments where direct browser requests are blocked by CORS.

## Build and verify

```bash
npm run build
npm test
python tests/browser-audit.py
```
