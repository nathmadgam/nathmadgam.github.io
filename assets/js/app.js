/**
 * Cynex Services portfolio site behaviour.
 * Renders list content from data.js and wires up navigation, the demo player,
 * the contract viewer, the inquiry form, and the interactive layer (scroll
 * progress, pointer glow, hero roles, project filter, counters). No external
 * dependencies; every animation respects prefers-reduced-motion.
 */
import {
  featured,
  ventures,
  heroRoles,
  projects,
  games,
  freelanceProjects,
  publicWork,
  capabilities,
  process,
  robloxGroups,
  discordServers,
  reviews,
} from "./data.js";

const CONTACT_EMAIL = "nathanielmadridgaminde@proton.me";

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const escapeHtml = value =>
  String(value).replace(/[&<>"']/g, character =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

const icon = (name, className = "icon") =>
  `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

/** Swap to the local SVG fallback when a cached bitmap is missing. */
function attachImageFallbacks(root) {
  qsa("img[data-fallback]", root).forEach(image => {
    image.addEventListener("error", () => {
      const fallback = image.dataset.fallback;
      if (!fallback || image.src.endsWith(fallback)) return;
      image.src = fallback;
    }, { once: true });
  });
}

/* ------------------------------------------------------------------ render */

function renderFeatured() {
  const root = qs("[data-featured]");
  if (!root) return;
  const game = featured;
  root.innerHTML = `
    <article class="feature reveal" data-glow>
      <a class="feature-media" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer"
         aria-label="Play ${escapeHtml(game.name)} on Roblox (opens in a new tab)">
        <img src="${escapeHtml(game.image)}" data-fallback="${escapeHtml(game.fallback)}"
             alt="Key art for ${escapeHtml(game.name)}: a player orders at a red burger stall while customers eat nearby"
             width="768" height="432" loading="lazy" decoding="async">
        <span class="feature-status">${escapeHtml(game.status)}</span>
      </a>
      <div class="feature-body">
        <div class="feature-identity">
          <img src="${escapeHtml(game.icon)}" data-fallback="${escapeHtml(game.fallback)}"
               alt="" width="256" height="256" loading="lazy" decoding="async">
          <div>
            <h3 class="feature-name">${escapeHtml(game.name)}</h3>
            <p class="feature-role">${escapeHtml(game.role)}</p>
          </div>
        </div>
        <p class="feature-summary">${escapeHtml(game.summary)}</p>
        <dl class="feature-facts">
          <div><dt>Studio</dt><dd><a class="text-link" href="${escapeHtml(game.studioUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(game.studio)}${icon("external")}</a></dd></div>
          <div><dt>Genre</dt><dd>${escapeHtml(game.genre)}</dd></div>
        </dl>
        <div class="feature-actions">
          <a class="btn btn-primary" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer">
            ${icon("play")}Play on Roblox
          </a>
          <a class="btn btn-secondary" href="#contact">Build something similar</a>
        </div>
      </div>
      <div class="feature-systems">
        <h4 class="column-label">What I built</h4>
        <ul>
          ${game.highlights.map(item => `
          <li>
            ${icon("check")}
            <span><strong>${escapeHtml(item.title)}</strong>${escapeHtml(item.description)}</span>
          </li>`).join("")}
        </ul>
      </div>
    </article>`;
  attachImageFallbacks(root);
}

function renderVentures() {
  const list = qs("[data-venture-list]");
  if (!list) return;
  list.innerHTML = ventures.map(venture => {
    const external = /^https?:/.test(venture.url);
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `
    <article class="venture reveal${venture.lead ? " venture-lead" : ""}" data-glow>
      <div class="venture-head">
        <div class="venture-logo" data-tone="${escapeHtml(venture.logoTone)}">
          <img src="${escapeHtml(venture.logo)}" alt="${escapeHtml(venture.name)} logo"
               width="256" height="256" loading="lazy" decoding="async">
        </div>
        <div>
          <h3 class="venture-name">${escapeHtml(venture.name)}</h3>
          <p class="venture-role">${escapeHtml(venture.role)}</p>
        </div>
      </div>
      <p class="venture-copy">${escapeHtml(venture.description)}</p>
      <ul class="chip-list" aria-label="Focus areas">
        ${venture.tags.map(tag => `<li class="chip">${escapeHtml(tag)}</li>`).join("")}
      </ul>
      <a class="text-link venture-link" href="${escapeHtml(venture.url)}"${target}>
        ${escapeHtml(venture.linkLabel)}${icon(external ? "external" : "arrow-right")}
      </a>
    </article>`;
  }).join("");
}

function renderProjects() {
  const list = qs("[data-project-list]");
  if (!list) return;
  list.innerHTML = projects.map(project => `
    <article class="project reveal" data-category="${escapeHtml(project.category)}">
      <button class="project-media" type="button" data-glow
              data-video="${escapeHtml(project.video)}"
              data-title="${escapeHtml(project.title)}"
              aria-label="Play the ${escapeHtml(project.title)} demo">
        <img src="${escapeHtml(project.poster)}" alt="Still frame from the ${escapeHtml(project.title)} demo"
             width="960" height="540" loading="lazy" decoding="async">
        <span class="play-badge" aria-hidden="true">${icon("play")}</span>
      </button>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-meta">
          <span>${escapeHtml(project.category)}</span>
          <span class="sep" aria-hidden="true">/</span>
          <span>${escapeHtml(project.year)}</span>
        </p>
        <p class="project-copy">${escapeHtml(project.description)}</p>
        <p class="project-tags">${project.tags.map(escapeHtml).join(" &middot; ")}</p>
      </div>
    </article>`).join("");
}

function renderProjectFilter() {
  const bar = qs("[data-project-filter]");
  const list = qs("[data-project-list]");
  if (!bar || !list) return;
  const categories = ["All", ...new Set(projects.map(project => project.category))];
  bar.innerHTML = categories.map((category, index) => `
    <button class="filter-chip" type="button" data-filter="${escapeHtml(category)}"
            aria-pressed="${index === 0}">${escapeHtml(category)}</button>`).join("");

  bar.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const selected = button.dataset.filter;
    qsa("[data-filter]", bar).forEach(chip =>
      chip.setAttribute("aria-pressed", String(chip === button)));
    qsa(".project", list).forEach(project => {
      const match = selected === "All" || project.dataset.category === selected;
      project.hidden = !match;
      // Filtered-in cards may not have crossed the reveal threshold yet.
      if (match) project.classList.add("is-visible");
    });
  });
}

function renderExperiences() {
  const list = qs("[data-experience-list]");
  if (!list) return;
  list.innerHTML = games.map(game => `
    <article class="experience reveal">
      <img class="experience-thumb" src="${escapeHtml(game.cachedImage ?? game.fallback)}"
           data-fallback="${escapeHtml(game.fallback)}"
           alt="Thumbnail for ${escapeHtml(game.name)}"
           width="496" height="279" loading="lazy" decoding="async">
      <div>
        <h3 class="experience-name">${escapeHtml(game.name)}</h3>
        <p class="experience-meta">${escapeHtml(game.creator)} &middot; ${escapeHtml(game.role)}</p>
        <p class="experience-copy">${escapeHtml(game.description)}</p>
        <a class="text-link" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer">
          Open on Roblox${icon("external")}
        </a>
      </div>
    </article>`).join("");
  attachImageFallbacks(list);
}

function renderFreelance() {
  const major = qs("[data-freelance-major]");
  const publicList = qs("[data-public-work]");

  if (major) {
    major.innerHTML = freelanceProjects.map(project => `
      <article class="freelance-card reveal">
        <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer"
           aria-label="Open ${escapeHtml(project.name)} community page (opens in a new tab)">
          <div class="freelance-logo" data-glow>
            <img src="${escapeHtml(project.cachedImage)}" alt="Official ${escapeHtml(project.name)} community logo"
                 width="150" height="150" loading="lazy" decoding="async">
          </div>
          <div class="freelance-card-body">
            <p class="freelance-meta">Freelance collaboration</p>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <span class="text-link">View community${icon("external")}</span>
          </div>
        </a>
      </article>`).join("");
  }

  if (publicList) {
    publicList.innerHTML = publicWork.map(work => `
      <article class="public-work-item reveal">
        <div class="public-work-identity">
          <div class="public-work-icon">
            <img src="${escapeHtml(work.favicon)}" alt="${escapeHtml(work.name)} website favicon" width="48" height="48" loading="lazy" decoding="async">
          </div>
          <div>
            <p class="freelance-meta">Public previous work</p>
            <h4>${escapeHtml(work.name)}</h4>
            <p>${escapeHtml(work.description)}</p>
          </div>
        </div>
        <a class="text-link" href="${escapeHtml(work.url)}" target="_blank" rel="noopener noreferrer"
           aria-label="Visit ${escapeHtml(work.name)} (opens in a new tab)">
          Visit site${icon("external")}
        </a>
      </article>`).join("");
  }
}

function renderCapabilities() {
  const list = qs("[data-capability-list]");
  if (!list) return;
  list.innerHTML = capabilities.map(item => `
    <div class="capability reveal">
      <dt>${escapeHtml(item.title)}</dt>
      <dd>${escapeHtml(item.description)}</dd>
    </div>`).join("");
}

function renderProcess() {
  const list = qs("[data-process-list]");
  if (!list) return;
  list.innerHTML = process.map((step, index) => `
    <li class="process-step reveal">
      <span class="process-index">${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.description)}</p>
    </li>`).join("");
}

function renderNetwork() {
  const entry = (item, external) => `
    <li>
      <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHtml(item.cachedImage ?? item.fallback)}"
             data-fallback="${escapeHtml(item.fallback)}"
             alt="" width="44" height="44" loading="lazy" decoding="async">
        <span class="network-copy">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(item.description)}</small>
        </span>
        <span class="network-role">${escapeHtml(item.role)}</span>
      </a>
    </li>`;

  const groups = qs("[data-roblox-groups]");
  const servers = qs("[data-discord-servers]");
  if (groups) {
    groups.innerHTML = robloxGroups.map(entry).join("");
    attachImageFallbacks(groups);
  }
  if (servers) {
    servers.innerHTML = discordServers.map(entry).join("");
    attachImageFallbacks(servers);
  }
}

function renderReviews() {
  const list = qs("[data-review-list]");
  if (!list) return;
  list.innerHTML = reviews.map(review => `
    <li class="review reveal">
      <p class="review-stars" role="img" aria-label="${review.rating} out of 5 stars">
        ${icon("star").repeat(review.rating)}
      </p>
      <blockquote>${escapeHtml(review.quote)}</blockquote>
      <p class="review-by">
        ${escapeHtml(review.name)}
        ${review.repeatClient ? '<span class="review-repeat">Repeat client</span>' : ""}
      </p>
      <p class="review-facts">
        ${escapeHtml(review.location)} &middot; ${escapeHtml(review.price)} &middot;
        ${escapeHtml(review.duration)} &middot; ${escapeHtml(review.age)}
      </p>
    </li>`).join("");
}

/* ---------------------------------------------------------------- behaviour */

function setupHeader() {
  const header = qs("[data-header]");
  if (!header) return;
  const sentinel = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  sentinel();
  addEventListener("scroll", sentinel, { passive: true });
}

/**
 * Theme toggle. The palette itself is switched by CSS via [data-theme] on the
 * root element; this only records the choice and keeps the label accurate.
 */
function setupThemeToggle() {
  const toggle = qs("[data-theme-toggle]");
  if (!toggle) return;
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const activeTheme = () =>
    root.dataset.theme || (systemDark.matches ? "dark" : "light");

  const syncLabel = () => {
    toggle.setAttribute(
      "aria-label",
      activeTheme() === "dark" ? "Switch to the light theme" : "Switch to the dark theme",
    );
  };

  toggle.addEventListener("click", () => {
    const next = activeTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) { /* storage blocked; the choice lasts for this page only */ }
    syncLabel();
  });

  // Keep following the OS until the visitor picks a theme explicitly.
  systemDark.addEventListener("change", () => {
    if (!root.dataset.theme) syncLabel();
  });

  syncLabel();
}

function setupMobileNav() {
  const toggle = qs("[data-menu-toggle]");
  const nav = qs("[data-mobile-nav]");
  if (!toggle || !nav) return;

  const setOpen = open => {
    nav.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = icon(open ? "x" : "menu");
  };

  toggle.addEventListener("click", () => setOpen(nav.hidden));
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) setOpen(false);
  });
  addEventListener("keydown", event => {
    if (event.key === "Escape" && !nav.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  matchMedia("(min-width: 900px)").addEventListener("change", event => {
    if (event.matches) setOpen(false);
  });
}

/** Mark the nav link matching the section currently in view. */
function setupScrollSpy() {
  const links = qsa('.primary-nav a[href^="#"], .mobile-nav a[href^="#"]');
  if (!links.length || !("IntersectionObserver" in window)) return;

  // Keep document order so the topmost visible section wins, not link order.
  const linked = new Set(links.map(link => link.hash.slice(1)));
  const sections = qsa("main section[id]").filter(section => linked.has(section.id));

  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    const current = sections.find(section => visible.has(section.id))?.id;
    links.forEach(link => {
      if (current && link.hash === `#${current}`) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(section => observer.observe(section));
}

/** Group-level reveal: one observer, elements fade in place. */
function setupReveal() {
  const targets = qsa(".reveal");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    targets.forEach(target => target.classList.add("is-static"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  targets.forEach(target => observer.observe(target));
}

function setupPlayer() {
  const dialog = qs("[data-player]");
  const video = qs("[data-player-video]", dialog ?? document);
  const title = qs("[data-player-title]", dialog ?? document);
  const close = qs("[data-player-close]", dialog ?? document);
  if (!dialog || !video || !title || !close) return;

  const open = trigger => {
    title.textContent = trigger.dataset.title ?? "Project demo";
    video.src = trigger.dataset.video;
    dialog.showModal();
    video.play().catch(() => { /* autoplay may be blocked; controls remain */ });
  };

  const shut = () => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  };

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-video]");
    if (trigger) open(trigger);
  });

  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", shut);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

function setupContract() {
  const contract = qs("[data-contract]");
  if (!contract) return;
  const viewport = qs("[data-contract-viewport]", contract);
  const current = qs("[data-contract-current]", contract);
  const previous = qs("[data-contract-prev]", contract);
  const next = qs("[data-contract-next]", contract);
  const pages = qsa("[data-contract-page]", contract);
  if (!viewport || !pages.length) return;

  let index = 0;

  const sync = () => {
    current.textContent = String(index + 1);
    previous.disabled = index === 0;
    next.disabled = index === pages.length - 1;
  };

  const goTo = target => {
    index = Math.min(Math.max(target, 0), pages.length - 1);
    pages[index].scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    sync();
  };

  previous.addEventListener("click", () => goTo(index - 1));
  next.addEventListener("click", () => goTo(index + 1));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      index = pages.indexOf(active.target);
      sync();
    }, { root: viewport, threshold: 0.55 });
    pages.forEach(page => observer.observe(page));
  }

  sync();
}

function setupInquiryForm() {
  const form = qs("[data-inquiry-form]");
  if (!form) return;
  const status = qs("[data-inquiry-status]", form);
  const statusText = qs("span", status);
  const statusIcon = qs("use", status);

  const announce = (message, state) => {
    status.hidden = false;
    status.dataset.state = state;
    statusText.textContent = message;
    statusIcon.setAttribute("href", state === "error" ? "#i-x" : "#i-check");
  };

  form.addEventListener("submit", event => {
    event.preventDefault();

    const fields = qsa("input, select, textarea", form);
    fields.forEach(field => field.removeAttribute("aria-invalid"));

    const invalid = fields.find(field => !field.checkValidity());
    if (invalid) {
      invalid.setAttribute("aria-invalid", "true");
      invalid.focus();
      announce("Please complete the highlighted field.", "error");
      return;
    }

    const data = new FormData(form);
    const get = key => String(data.get(key) ?? "").trim();
    const subject = `Roblox project inquiry: ${get("projectType")}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Project type: ${get("projectType")}`,
      `Target timeline: ${get("timeline") || "Not specified"}`,
      "",
      "Brief:",
      get("brief"),
    ].join("\n");

    announce("Email prepared. Your mail app should open shortly.", "ok");
    location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/** Thin gradient bar in the header tracking page scroll. */
function setupScrollProgress() {
  const bar = qs("[data-scroll-progress]");
  if (!bar) return;
  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty("--progress", max > 0 ? String(Math.min(scrollY / max, 1)) : "0");
  };
  addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  addEventListener("resize", update, { passive: true });
  update();
}

/**
 * Pointer-follow highlight. One delegated listener writes the pointer position
 * into --mx/--my on the hero and on whichever [data-glow] card is hovered; CSS
 * does the drawing. Skipped for touch and reduced motion.
 */
function setupPointerGlow() {
  if (prefersReducedMotion.matches || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const hero = qs("[data-hero]");
  let frame = 0;
  let last = null;

  const paint = () => {
    frame = 0;
    if (!last) return;
    const { x, y, target } = last;
    const card = target instanceof Element ? target.closest("[data-glow]") : null;
    for (const element of [card, hero]) {
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      if (y < rect.top || y > rect.bottom) continue;
      element.style.setProperty("--mx", `${x - rect.left}px`);
      element.style.setProperty("--my", `${y - rect.top}px`);
    }
  };

  addEventListener("pointermove", event => {
    last = { x: event.clientX, y: event.clientY, target: event.target };
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });
}

/** Cycles the hero role line. Screen readers get the full list from static text. */
function setupHeroRoles() {
  const track = qs("[data-hero-roles]");
  if (!track || !heroRoles.length) return;
  track.textContent = heroRoles[0];
  if (prefersReducedMotion.matches || heroRoles.length < 2) return;

  let index = 0;
  setInterval(() => {
    if (document.hidden) return;
    track.classList.add("is-leaving");
    setTimeout(() => {
      index = (index + 1) % heroRoles.length;
      track.textContent = heroRoles[index];
      track.classList.remove("is-leaving");
    }, 260);
  }, 2800);
}

/** Counts the About facts up from zero the first time they scroll into view. */
function setupCounters() {
  const values = qsa(".facts dd").filter(dd => /^\d+$/.test(dd.textContent.trim()));
  if (!values.length || prefersReducedMotion.matches || !("IntersectionObserver" in window)) return;

  const run = dd => {
    const target = Number(dd.dataset.count);
    const start = performance.now();
    const duration = 900;
    const step = now => {
      const t = Math.min((now - start) / duration, 1);
      dd.textContent = String(Math.round(target * (1 - (1 - t) ** 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      run(entry.target);
    });
  }, { threshold: 0.6 });

  values.forEach(dd => {
    dd.dataset.count = dd.textContent.trim();
    dd.textContent = "0";
    observer.observe(dd);
  });
}

function setupCopyEmail() {
  const button = qs("[data-copy-email]");
  const label = qs("[data-copy-label]", button ?? document);
  if (!button || !label) return;
  const original = label.textContent;
  let timer = 0;

  button.addEventListener("click", async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      copied = true;
    } catch (error) { /* clipboard unavailable (insecure context or denied) */ }
    label.textContent = copied ? "Email address copied" : CONTACT_EMAIL;
    button.dataset.state = copied ? "ok" : "fallback";
    clearTimeout(timer);
    timer = setTimeout(() => {
      label.textContent = original;
      delete button.dataset.state;
    }, 2400);
  });
}

/* --------------------------------------------------------------------- init */

renderFeatured();
renderVentures();
renderProjects();
renderProjectFilter();
renderExperiences();
renderFreelance();
renderCapabilities();
renderProcess();
renderNetwork();
renderReviews();

setupHeader();
setupScrollProgress();
setupPointerGlow();
setupHeroRoles();
setupCounters();
setupCopyEmail();
setupThemeToggle();
setupMobileNav();
setupScrollSpy();
setupPlayer();
setupContract();
setupInquiryForm();
setupReveal();
