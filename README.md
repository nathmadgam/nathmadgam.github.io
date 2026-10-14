# Cynex Services, Roblox programmer portfolio

Portfolio site for Cynex Services (Nathaniel Madrid), published at
<https://nathmadgam.github.io/>.

Plain HTML, CSS, and ES modules. No framework, no build step, no dependencies.

## Structure

```
index.html            markup, metadata, and the inline SVG icon sprite
assets/css/styles.css design tokens and all component styles
assets/js/app.js      rendering and behaviour (ES module)
assets/js/data.js     project, experience, capability, network, and review content
assets/posters/       video poster frames (960×540)
assets/cached-media/  Roblox and Discord avatars
assets/contract-pages/ contract page previews
assets/fallbacks/     SVG placeholders used if a bitmap fails to load
images/               portrait, plus the Cynex Services logo (.png) and favicon (.ico)
videos/               project demo recordings
downloads/            the client agreement PDF
```

## Design rules

Written down so changes stay deliberate instead of drifting back to generic
defaults (gradients, glass, card grids, the same fade on everything).

**Brief.** The reader is a Roblox studio lead or game owner deciding whether to
hire a programmer. They came to see proof of shipped work, then get in touch.
They see the statement and Burgeran! first; "Start a project" is the easiest
action on the page and goes straight to <https://datalprojects.com/contact>.

**Colour.** Every colour comes from the Cynex mark (`images/cynex-services.png`):
violet `#9356f5`, ember `#fc9053`, and the white glyph, plus tints and shades of
the violet. Colours are flat planes; nothing is a gradient. The checked WCAG
contrast table sits at the top of `styles.css`; add a row for any new text pair.

**Type.** One family, Source Sans 3 (Roblox ships it as `Enum.Font.SourceSans`).
Hierarchy comes from size, weight, italic and colour. No uppercase tracked
labels; labels are short, sentence case and used only to name a group.

**Surfaces.** No card shells, elevation shadows or blur. Content is separated by
spacing and 1px rules. Radii stay at 4px.

**Numbers.** Only the process steps are numbered, because their order matters.

**Motion.** Each content type has its own reveal (see the Motion block in
`styles.css`), on a long, soft ease with no overshoot. The process line follows
scroll position.
No motion hides text while it is being read, and with `prefers-reduced-motion`
everything renders in its final state.

## Theming

Light and dark palettes are both defined as CSS custom properties at the top of
`styles.css`. Dark is applied either from `prefers-color-scheme` or from an
explicit `data-theme="dark"` on the root element, set by the header toggle and
stored in `localStorage`. A small inline script in `index.html` applies the saved
theme before first paint so the other palette never flashes.

Only the colour tokens change between themes. Nothing else in the stylesheet is
theme-aware, so a new component picks up dark mode automatically as long as it
uses the tokens.

## Editing content

Content lives in `assets/js/data.js`. Adding a project means adding one entry
plus a poster image and an MP4; no other file needs to change.

## Local preview

`index.html` loads `app.js` as an ES module, so it needs to be served over HTTP
rather than opened from the filesystem. Any static server works, for example:

```
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

`.github/workflows/deploy-pages.yml` stages the site files into `_site` and
publishes them with GitHub Pages on every push to `main`. Because this is a user
site served from the domain root, all asset paths are relative and no base path
is configured. `.nojekyll` keeps Pages from running Jekyll over the output.

Note that GitHub Pages is case-sensitive: filenames in `data.js` and `index.html`
must match the files on disk exactly.

## Icons

Interface icons are [Lucide](https://lucide.dev) (ISC) and brand icons are
[Simple Icons](https://simpleicons.org) (CC0), inlined as a single `<symbol>`
sprite in `index.html` so there is no icon dependency or extra request.

## Contact

Every "Contact" and "Start a project" link points to the DATAL Projects contact
page, <https://datalprojects.com/contact>, and opens in a new tab. The Contact
section links there too and lists the direct channels (email, Discord,
LinkedIn, X). The site itself stores nothing.
