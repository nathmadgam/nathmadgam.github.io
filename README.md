<p align="center">
  <a href="https://nathmadgam.github.io/"><img src="./assets/readme/hero.svg" width="100%" alt="Nathaniel Madrid, Roblox programmer. Software and Roblox systems, built to be maintained. Beside it, the chapter timeline of the Burgeran! systems demo the site features."></a>
</p>

# Nathaniel Madrid, Roblox programmer portfolio

The source for <https://nathmadgam.github.io/>, the portfolio of Nathaniel Madrid:
founder of DATAL Projects, lead developer of Burgeran! for Cly Games, a Roblox
and a Roblox programmer who builds gameplay, backend services, persistent data, and
interfaces in Luau.

Plain HTML, CSS, and ES modules. No framework, no build step, no dependencies.

**[Open the site](https://nathmadgam.github.io/)** · [Start a project](https://datalprojects.com/contact) · [Cynex Services on Discord](https://discord.gg/Pnjjkc6FHY)

<p align="center">
  <a href="https://nathmadgam.github.io/"><img src="./assets/readme/site-preview.webp" width="100%" alt="The live site in its dark default: the statement and Start a project on the left, the ship log opening on Burgeran! and its systems demo on the right, on desktop and on a phone."></a>
</p>

## What the page shows

The reader is a Roblox studio lead or game owner deciding whether to hire a programmer.
The page is a ship log: the left column holds who I am, the offer and the facts, then a
sticky index of the log; the right column is the log itself, one entry per kind of work
on a single spine, live work first, then archived.

1. **Burgeran!** Live on Roblox, with its chaptered systems demo (each chapter in "What
   I built" jumps the recording).
2. **Live games**, **businesses**, **system demos** (six, filterable),
   **studios and communities**, **client reviews**, **how I work** and the **contract**.
3. **Volunteering.** One small entry: I volunteer with BetterGov.ph. The community
   portals I help with are folded inside it, with a note that they are community-run
   and not official government websites.
4. **Contact.** Start a project through DATAL Projects, plus direct channels.

The spine fills with blue down to the reading position as the page scrolls, each
entry's dot lights once it is reached, and the index marks the entry in view.

## Design rules

Written down so changes stay deliberate instead of drifting back to generic
defaults (gradients, glass, card grids, the same fade on everything).

**Colour.** BetterGov blue on navy, one spot colour. Brand blue `#0032A0` fills
buttons (white text, with a `#2F6BFF` edge on dark), `#2F6BFF` draws the spine, reached
dots, stars and the glow, and `#8AB0FF` is accent text on dark. The ground is `#0b1020`
with cards `#10172b`. Green marks live work only. The only gradients are the soft glow behind the opening and the
dotted grid in the page margins. The checked WCAG contrast table sits at the top of
`styles.css`; add a row for any new text pair.

**Type.** One family, Source Sans 3 (Roblox ships it as `Enum.Font.SourceSans`).
Hierarchy comes from size, weight, italic and colour. No uppercase tracked
labels; labels are short, sentence case and used only to name a group.

**Surfaces.** No elevation shadows or blur. Content is separated by spacing and 1px
rules. Radii are 8px for controls and media, a circle for the portrait, and full pills for
status stamps.

**Numbers.** Numbers appear only where they carry information: demo timestamps and
the process steps, whose order matters.

**Motion.** Each content type has its own reveal (see the Motion block in
`styles.css`), on a long, soft ease with no overshoot. Reveals start just before
an element scrolls into view, so content is settled by the time it is read. The
process line follows scroll position. With `prefers-reduced-motion` everything
renders in its final state.

## Theming

Light and dark palettes are both defined as CSS custom properties at the top of
`styles.css`. Dark is the default for every visitor. Light is applied from an
explicit `data-theme="light"` on the root element, set by the header toggle and
stored in `localStorage`. A small inline script in `index.html` applies the saved
theme before first paint so the other palette never flashes.

Only the colour tokens change between themes. Nothing else in the stylesheet is
theme-aware, so a new component picks up dark mode automatically as long as it
uses the tokens.

## Structure

```
index.html             markup, metadata, and the inline SVG icon sprite
assets/css/styles.css  design tokens and all component styles
assets/js/app.js       rendering and behaviour (ES module)
assets/js/data.js      project, venture, experience, capability, network, and review content
assets/posters/        video poster frames (960×540)
assets/cached-media/   Roblox, Discord, and venture images
assets/contract-pages/ contract page previews
assets/fallbacks/      SVG placeholders used if a bitmap fails to load
assets/readme/         images used by this README
images/                portrait, header mark, favicons, and the Cynex Services logo
videos/                project demo recordings
downloads/             the client agreement PDF
```

## Editing content

Content lives in `assets/js/data.js`. The BetterGov.ph portal links are plain HTML in
the volunteering entry of `index.html`. Adding a project means adding one entry
plus a poster image and an MP4; no other file needs to change. When a stylesheet
or script changes, bump its `?v=` query in `index.html` so returning visitors get
the new file.

## Local preview

`index.html` loads `app.js` as an ES module, so it needs to be served over HTTP
rather than opened from the filesystem. Any static server works, for example:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.
