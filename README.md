# Cynex | Roblox Scripter Portfolio

A static, editable portfolio built with semantic HTML, CSS, and vanilla JavaScript. It can be hosted on GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, or any standard web server.

## Preview locally

Opening `index.html` directly works and displays all saved project media. For live Roblox and Discord media refreshes, run a local web server so browser security rules do not treat the page as a `file://` document:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Edit content

- Portfolio text and sections: `index.html`
- Projects, games, groups, servers, and testimonials: `assets/js/data.js`
- Layout and animation system: `assets/css/styles.css`
- Interactions and rendering: `assets/js/app.js`
- Roblox/Discord media requests: `assets/js/media-service.js`
- Public proxy URL: `assets/js/runtime-config.js`

After changing JavaScript source files, rebuild the local-file-safe bundle:

```bash
npm run build
```

## Media behavior

Saved thumbnails are included under `assets/cached-media/` so cards never appear empty. When the site is hosted, the media service refreshes Roblox place icons, universe icons, group icons, and public Discord guild metadata. An optional Worker proxy is available under `worker/` for deployments where browser CORS rules block direct requests.

## Download button

The website links to `downloads/cynex-portfolio-source.zip`. Recreate that package after making changes so visitors always download the latest source.

## Tests

```bash
npm test
python tests/browser-audit.py
```
