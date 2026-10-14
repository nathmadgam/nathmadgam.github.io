/**
 * Cynex Services portfolio site behaviour.
 * Renders list content from data.js and wires up navigation, the demo player,
 * the contract viewer, the email copy button, the project filter, and the motion
 * layer (scroll reveals and the process line). No external dependencies;
 * every animation respects prefers-reduced-motion.
 */
import {
  featured,
  ventures,
  projects,
  games,
  freelanceProjects,
  publicWork,
  capabilities,
  process,
  robloxGroups,
  discordServers,
  reviews,
} from "./data.js?v=2026-10-14b";

const CONTACT_EMAIL = "nathanielmadridgaminde@proton.me";
const CONTACT_URL = "https://datalprojects.com/contact";

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const escapeHtml = value =>
  String(value).replace(/[&<>"']/g, character =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

/** "m:ss" for a time in seconds. */
const formatTime = seconds =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

/** Attributes that make an element open the shared video player, optionally at a time. */
const demoTrigger = (demo, start = 0) =>
  `data-video="${escapeHtml(demo.video)}" data-title="${escapeHtml(demo.title)}" ` +
  `data-poster="${escapeHtml(demo.poster)}" data-chapters="${escapeHtml(demo.id)}" data-start="${start}"`;

const chapterSets = new Map([[featured.demo.id, featured.demo.chapters]]);

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
    <article class="feature">
      <button class="feature-media" type="button" data-motion="wipe" ${demoTrigger(game.demo)}
              aria-label="Watch the ${escapeHtml(game.demo.title)} (${escapeHtml(game.demo.duration)})">
        <img src="${escapeHtml(game.image)}" data-fallback="${escapeHtml(game.fallback)}"
             alt="" width="768" height="432" loading="lazy" decoding="async">
        <span class="feature-status">${escapeHtml(game.status)}</span>
        <span class="feature-play" aria-hidden="true">
          <span class="feature-play-icon">${icon("play")}</span>
          <span class="feature-play-copy"><strong>Watch the systems demo</strong><small>${escapeHtml(game.demo.duration)} &middot; ${game.demo.chapters.length - 1} chapters</small></span>
        </span>
      </button>
      <div class="feature-body" data-motion="rise">
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
          <button class="btn btn-primary" type="button" ${demoTrigger(game.demo)}>
            ${icon("play")}Watch demo
          </button>
          <a class="btn btn-secondary" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer">
            Play on Roblox${icon("external")}
          </a>
          <a class="btn btn-secondary" href="${CONTACT_URL}" target="_blank" rel="noopener noreferrer">Build something similar</a>
        </div>
      </div>
      <div class="feature-systems">
        <h4 class="column-label">What I built <small>Select a system to watch it in the demo</small></h4>
        <ul>
          ${game.highlights.map(item => `
          <li data-motion="fade">
            <button class="feature-chapter" type="button" ${demoTrigger(game.demo, item.start)}>
              <span class="feature-chapter-time">${icon("play")}${formatTime(item.start)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.description)}</span>
            </button>
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
    <article class="venture${venture.lead ? " venture-lead" : ""}" data-motion="draw">
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
      <div>
        <p class="venture-copy">${escapeHtml(venture.description)}</p>
        <p class="venture-tags"><span class="visually-hidden">Focus areas: </span>${venture.tags.map(escapeHtml).join(" &middot; ")}</p>
        <a class="text-link venture-link" href="${escapeHtml(venture.url)}"${target}>
          ${escapeHtml(venture.linkLabel)}${icon(external ? "external" : "arrow-right")}
        </a>
      </div>
    </article>`;
  }).join("");
}

function renderProjects() {
  const list = qs("[data-project-list]");
  if (!list) return;
  list.innerHTML = projects.map(project => `
    <article class="project" data-category="${escapeHtml(project.category)}">
      <button class="project-media" type="button" data-motion="wipe"
              data-video="${escapeHtml(project.video)}"
              data-title="${escapeHtml(project.title)}"
              aria-label="Play the ${escapeHtml(project.title)} demo">
        <img src="${escapeHtml(project.poster)}" alt="Still frame from the ${escapeHtml(project.title)} demo"
             width="960" height="540" loading="lazy" decoding="async">
        <span class="play-badge" aria-hidden="true">${icon("play")}Play demo</span>
      </button>
      <div class="project-body" data-motion="fade">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-meta meta">${escapeHtml(project.category)}, ${escapeHtml(project.year)}</p>
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
      if (match) qsa("[data-motion]", project).forEach(settle);
    });
  });
}

function renderExperiences() {
  const list = qs("[data-experience-list]");
  if (!list) return;
  list.innerHTML = games.map(game => `
    <article class="experience" data-motion="slide">
      <img class="experience-thumb" src="${escapeHtml(game.cachedImage ?? game.fallback)}"
           data-fallback="${escapeHtml(game.fallback)}"
           alt="Thumbnail for ${escapeHtml(game.name)}"
           width="496" height="279" loading="lazy" decoding="async">
      <div>
        <h3 class="experience-name">${escapeHtml(game.name)}</h3>
        <p class="experience-meta meta">${escapeHtml(game.role)} for ${escapeHtml(game.creator)}</p>
        <p class="experience-copy">${escapeHtml(game.description)}</p>
        <a class="text-link" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer">
          Open on Roblox${icon("external")}
        </a>
      </div>
    </article>`).join("");
  attachImageFallbacks(list);
}

/** Shared markup for the ruled, linked rows used by freelance work and the network. */
const linkedRow = ({ url, name, description, role, image, fallback, fit = "cover", label }) => `
    <li data-motion="draw">
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"
         aria-label="${escapeHtml(label ?? `${name}, ${role} (opens in a new tab)`)}">
        <img src="${escapeHtml(image)}"${fallback ? ` data-fallback="${escapeHtml(fallback)}"` : ""}
             data-fit="${fit}" alt="" width="44" height="44" loading="lazy" decoding="async">
        <span class="row-copy">
          <strong>${escapeHtml(name)}</strong>
          <small>${escapeHtml(description)}</small>
        </span>
        <span class="row-role">${escapeHtml(role)}${icon("external")}</span>
      </a>
    </li>`;

function renderFreelance() {
  const major = qs("[data-freelance-major]");
  const publicList = qs("[data-public-work]");

  if (major) {
    major.innerHTML = freelanceProjects.map(project => linkedRow({
      url: project.url,
      name: project.name,
      description: project.description,
      role: "Freelance",
      image: project.cachedImage,
      fit: "contain",
      label: `Open the ${project.name} community page (opens in a new tab)`,
    })).join("");
  }

  if (publicList) {
    publicList.innerHTML = publicWork.map(work => linkedRow({
      url: work.url,
      name: work.name,
      description: work.description,
      role: "Visit site",
      image: work.favicon,
      fit: "contain",
      label: `Visit ${work.name} (opens in a new tab)`,
    })).join("");
  }
}

function renderCapabilities() {
  const list = qs("[data-capability-list]");
  if (!list) return;
  list.innerHTML = capabilities.map(item => `
    <div class="capability" data-motion="draw">
      <dt>${escapeHtml(item.title)}</dt>
      <dd>${escapeHtml(item.description)}</dd>
    </div>`).join("");
}

function renderProcess() {
  const list = qs("[data-process-list]");
  if (!list) return;
  list.innerHTML = process.map((step, index) => `
    <li class="process-step" data-step>
      <span class="process-index" aria-hidden="true">${index + 1}</span>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.description)}</p>
    </li>`).join("");
}

function renderNetwork() {
  const entry = item => linkedRow({
    url: item.url,
    name: item.name,
    description: item.description,
    role: item.role,
    image: item.cachedImage ?? item.fallback,
    fallback: item.fallback,
  });

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
  const lead = qs("[data-review-lead]");
  const summary = qs("[data-review-summary]");
  if (!list) return;

  const facts = review =>
    `${escapeHtml(review.location)}, ${escapeHtml(review.price)} order over ${escapeHtml(review.duration)}, ${escapeHtml(review.age)}`;
  const byline = review =>
    `${escapeHtml(review.name)}${review.repeatClient ? '<span class="review-repeat">Repeat client</span>' : ""}`;

  const leading = reviews.find(review => review.featured);
  if (lead && leading) {
    lead.innerHTML = `
      <figure class="review-lead" data-motion="rise">
        <blockquote>${escapeHtml(leading.quote)}</blockquote>
        <figcaption>
          <p class="review-by">${byline(leading)}</p>
          <p class="review-facts meta">${facts(leading)}</p>
        </figcaption>
      </figure>`;
  }

  if (summary && reviews.length) {
    const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const profile = reviews[0].platformUrl;
    summary.innerHTML = `
      <span class="review-stars" role="img" aria-label="${average.toFixed(1)} out of 5 stars">${icon("star").repeat(Math.round(average))}</span>
      <span>${average.toFixed(1)} average across ${reviews.length} ${escapeHtml(reviews[0].platform)} orders</span>
      ${profile ? `<a class="text-link" href="${escapeHtml(profile)}" target="_blank" rel="noopener noreferrer">See the ${escapeHtml(reviews[0].platform)} profile${icon("external")}</a>` : ""}`;
  }

  list.innerHTML = reviews.filter(review => review !== leading).map(review => `
    <li class="review" data-motion="draw">
      <blockquote>${escapeHtml(review.quote)}</blockquote>
      <p class="review-by">${byline(review)}</p>
      <p class="review-facts meta">${facts(review)}</p>
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

/**
 * Final state for one [data-motion] element: mark it in, then drop the
 * attribute once its transition has run so component styles (hover
 * transitions in particular) take over again.
 */
function settle(element) {
  if (!element.hasAttribute("data-motion") || element.classList.contains("is-in")) return;
  element.classList.add("is-in");
  const order = Number(element.style.getPropertyValue("--i") || 0);
  setTimeout(() => {
    element.removeAttribute("data-motion");
    element.style.removeProperty("--i");
  }, order * 110 + 1800);
}

/**
 * Scroll reveals. Each element's variant is set in markup (see the Motion
 * block in styles.css); elements that enter view together are staggered in
 * document order. Reduced motion settles everything immediately.
 */
function setupMotion() {
  document.documentElement.classList.add("motion-ready");
  const targets = qsa("[data-motion]");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    targets.forEach(target => {
      target.classList.add("is-in");
      target.removeAttribute("data-motion");
    });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    let order = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      entry.target.style.setProperty("--i", String(Math.min(order++, 5)));
      settle(entry.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.12 });

  targets.forEach(target => observer.observe(target));
}

/**
 * Process line: on wide screens an ember rule runs across the four steps as
 * the section scrolls up the viewport, and each step is marked reached as
 * the line passes it. Text is never hidden.
 */
function setupProcess() {
  const root = qs("[data-process]");
  const steps = qsa("[data-step]", root ?? document);
  if (!root || !steps.length) return;

  const mark = progress => {
    root.style.setProperty("--progress", progress.toFixed(3));
    steps.forEach((step, index) =>
      step.classList.toggle("is-reached", progress >= (index + 0.35) / steps.length));
  };

  if (prefersReducedMotion.matches) {
    mark(1);
    return;
  }

  let queued = false;
  const update = () => {
    queued = false;
    const top = root.getBoundingClientRect().top;
    // 0 when the steps reach 85% down the viewport, 1 once they are at 35%.
    const start = innerHeight * 0.85;
    const end = innerHeight * 0.35;
    mark(Math.min(Math.max((start - top) / (start - end), 0), 1));
  };
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue, { passive: true });
  update();
}

function setupPlayer() {
  const dialog = qs("[data-player]");
  const video = qs("[data-player-video]", dialog ?? document);
  const title = qs("[data-player-title]", dialog ?? document);
  const close = qs("[data-player-close]", dialog ?? document);
  const chapterList = qs("[data-player-chapters]", dialog ?? document);
  if (!dialog || !video || !title || !close) return;

  let chapters = [];

  const renderChapters = () => {
    if (!chapterList) return;
    chapterList.hidden = chapters.length === 0;
    chapterList.innerHTML = chapters.map(chapter => `
      <li><button type="button" data-seek="${chapter.start}">
        <span>${formatTime(chapter.start)}</span>${escapeHtml(chapter.label)}
      </button></li>`).join("");
  };

  // Highlight the chapter containing the playhead.
  const syncChapter = () => {
    if (!chapterList || !chapters.length) return;
    const time = video.currentTime;
    let active = 0;
    chapters.forEach((chapter, index) => { if (time + 0.25 >= chapter.start) active = index; });
    qsa("[data-seek]", chapterList).forEach((button, index) => {
      if (index === active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  };

  const seek = seconds => {
    if (!seconds) return;
    // Seeking before metadata loads is ignored by some browsers.
    if (video.readyState >= 1) video.currentTime = seconds;
    else video.addEventListener("loadedmetadata", () => { video.currentTime = seconds; }, { once: true });
  };

  const open = trigger => {
    title.textContent = trigger.dataset.title ?? "Project demo";
    chapters = chapterSets.get(trigger.dataset.chapters) ?? [];
    renderChapters();
    if (trigger.dataset.poster) video.poster = trigger.dataset.poster;
    else video.removeAttribute("poster");
    video.src = trigger.dataset.video;
    seek(Number(trigger.dataset.start) || 0);
    syncChapter();
    dialog.showModal();
    video.play().catch(() => { /* autoplay may be blocked; controls remain */ });
  };

  const shut = () => {
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
    chapters = [];
    renderChapters();
  };

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-video]");
    if (trigger) open(trigger);
  });

  chapterList?.addEventListener("click", event => {
    const button = event.target.closest("[data-seek]");
    if (!button) return;
    video.currentTime = Number(button.dataset.seek);
    video.play().catch(() => {});
  });
  video.addEventListener("timeupdate", syncChapter);
  video.addEventListener("seeked", syncChapter);

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
setupCopyEmail();
setupThemeToggle();
setupMobileNav();
setupScrollSpy();
setupPlayer();
setupContract();
setupProcess();
setupMotion();
