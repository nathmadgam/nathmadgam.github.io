import { projects, games, skills, process, robloxGroups, discordServers, reviews } from "./data.js";
import { getRobloxGameImages, getRobloxGameDetails, getRobloxGroupImages, getDiscordServer, loadImageSafely } from "./media-service.js";

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);
}

function icon(name, className = "ui-icon") {
  const paths = {
    play: '<path d="m9 7 8 5-8 5Z"/>',
    volume: '<path d="M5 10h3l4-3v10l-4-3H5Z"/><path d="M15 9.5c1.4 1.4 1.4 3.6 0 5M17.5 7c2.8 2.8 2.8 7.2 0 10"/>',
    external: '<path d="M7 17 17 7M8 7h9v9"/>',
    roblox: '<path d="m8 4 12 4-4 12-12-4Z"/><path d="m10.5 9.5 4 1.3-1.3 4-4-1.3Z"/>',
    discord: '<path d="M7.4 6.2A16 16 0 0 1 12 5.5a16 16 0 0 1 4.6.7c1.6 2.2 2.2 4.5 2 6.8-1.4 1-2.8 1.6-4.2 1.9l-1-1.3c.7-.2 1.3-.5 1.9-.9-1.8.8-4.8.8-6.6 0 .6.4 1.2.7 1.9.9l-1 1.3A11.5 11.5 0 0 1 5.4 13c-.2-2.3.4-4.6 2-6.8Z"/><path d="M9 11.7h.01M15 11.7h.01"/>',
    code: '<path d="m9 7-5 5 5 5M15 7l5 5-5 5M13.5 5 10.5 19"/>',
    download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14"/>',
  };
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] ?? paths.code}</svg>`;
}

function renderProjects() {
  const grid = qs("[data-project-grid]");
  if (!projects.length) {
    grid.innerHTML = '<p class="network-empty">No project demos are published yet.</p>';
    return;
  }
  grid.innerHTML = projects.map((project, index) => `
    <article class="project-card reveal" data-tilt style="--reveal-delay:${Math.min(index * 60, 240)}ms">
      <div class="project-media">
        <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
        <img src="${escapeHtml(project.poster)}" alt="Video preview for ${escapeHtml(project.title)}" width="960" height="540" loading="lazy" decoding="async">
        <div class="project-media-glow" aria-hidden="true"></div>
        <button class="project-play" type="button" data-video="${escapeHtml(project.video)}" data-poster="${escapeHtml(project.poster)}" data-title="${escapeHtml(project.title)}" aria-label="Play ${escapeHtml(project.title)} demo with audio">
          <span class="project-play-symbol">${icon("play")}</span><span>Play demo</span><span class="project-audio">${icon("volume")} audio</span>
        </button>
      </div>
      <div class="project-body">
        <div class="project-meta"><span>${escapeHtml(project.category)}</span><span>${escapeHtml(project.year)}</span></div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tag-list">${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
    </article>`).join("");
}

function renderGames() {
  const grid = qs("[data-game-grid]");
  if (!games.length) {
    grid.innerHTML = '<p class="network-empty">No Roblox experiences are configured yet.</p>';
    return;
  }
  grid.innerHTML = games.map((game, index) => {
    const initialImage = game.cachedImage || game.fallback;
    return `
    <a class="game-card reveal" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer" data-game-id="${game.id}" data-tilt style="--reveal-delay:${Math.min(index * 100, 300)}ms;--card-index:${index}">
      <div class="media-shell" data-state="fallback">
        <div class="media-skeleton" aria-hidden="true"></div>
        <img class="media-image" src="${escapeHtml(initialImage)}" alt="Official Roblox artwork for ${escapeHtml(game.name)}" width="512" height="512" loading="lazy" decoding="async">
        <span class="media-type-badge">${icon("roblox")} Roblox experience</span>
      </div>
      <div class="game-card-body">
        <div class="game-card-head"><h3 data-game-name>${escapeHtml(game.name)}</h3><span class="game-card-arrow" aria-hidden="true">${icon("external")}</span></div>
        <p data-game-description>${escapeHtml(game.description)}</p>
        <dl class="game-credits">
          <div><dt>Created by</dt><dd data-game-creator>${escapeHtml(game.creator)}</dd></div>
          <div><dt>My role</dt><dd>${escapeHtml(game.role)}</dd></div>
        </dl>
      </div>
    </a>`;
  }).join("");
}

function renderSkills() {
  qs("[data-skill-grid]").innerHTML = skills.map((skill, index) => `
    <article class="skill-item reveal" style="--reveal-delay:${Math.min(index * 65, 390)}ms;--skill:${Number(skill.percentage) || 0}%">
      <span class="skill-code">${String(index + 1).padStart(2, "0")}</span>
      <div class="skill-copy"><div class="skill-title-row"><h3>${escapeHtml(skill.title)}</h3><strong><span data-skill-value="${Number(skill.percentage) || 0}">0</span>%</strong></div><p>${escapeHtml(skill.description)}</p><div class="skill-meter" aria-label="${escapeHtml(skill.title)} proficiency: ${Number(skill.percentage) || 0} percent"><span></span></div></div>
    </article>`).join("");
}

function renderProcess() {
  qs("[data-process-grid]").innerHTML = process.map((item, index) => `
    <li class="process-card reveal process-card-${index + 1}" data-tilt style="--reveal-delay:${index * 80}ms">
      <span class="process-visual" aria-hidden="true"><i></i><i></i><i></i><b></b></span>
      <h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
    </li>`).join("");
}

function networkCard(item, type, index) {
  const id = type === "roblox" ? item.groupId : item.inviteCode;
  const typeIcon = type === "roblox" ? "roblox" : "discord";
  return `
    <a class="network-card reveal" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" data-network-type="${type}" data-network-id="${escapeHtml(id)}" data-tilt style="--reveal-delay:${Math.min(index * 55, 220)}ms">
      <div class="network-icon-shell" data-state="fallback">
        <div class="media-skeleton" aria-hidden="true"></div>
        <img class="network-icon" src="${escapeHtml(item.cachedImage || item.fallback)}" alt="${escapeHtml(item.name)} icon" width="150" height="150" loading="lazy" decoding="async">
        <span class="network-platform" aria-hidden="true">${icon(typeIcon)}</span>
      </div>
      <div><h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.description)}</p><span class="network-role">${escapeHtml(item.role)}</span></div>
      <span class="network-arrow" aria-hidden="true">${icon("external")}</span>
    </a>`;
}

function renderNetwork() {
  qs("[data-roblox-groups]").innerHTML = robloxGroups.length
    ? robloxGroups.map((item, index) => networkCard(item, "roblox", index)).join("")
    : '<p class="network-empty">No Roblox groups are configured.</p>';
  qs("[data-discord-servers]").innerHTML = discordServers.length
    ? discordServers.map((item, index) => networkCard(item, "discord", index)).join("")
    : '<p class="network-empty">No Discord servers are configured.</p>';
}

function renderReviews() {
  const list = qs("[data-review-list]");
  if (!reviews.length) {
    list.innerHTML = '<p class="network-empty">Verified client feedback will appear here.</p>';
    return;
  }
  list.innerHTML = `
    <div class="review-stage reveal" data-review-stage tabindex="0" aria-label="Client testimonial slideshow">
      <article class="review-card" data-review-card>
        <div class="review-topline">
          <span class="review-index" data-review-count>01 / ${String(reviews.length).padStart(2, "0")}</span>
          <span class="review-rating" aria-label="5 out of 5 stars">★★★★★</span>
        </div>
        <blockquote>
          <span class="review-quote-mark" aria-hidden="true">“</span>
          <span data-review-typed aria-hidden="true"></span><span class="type-caret" aria-hidden="true"></span>
        </blockquote>
        <p class="sr-only" data-review-full aria-live="polite"></p>
        <div class="review-source" data-review-source>
          <div class="review-person">
            <strong data-review-name></strong>
            <span data-review-location></span>
          </div>
          <dl class="review-details">
            <div><dt>Budget</dt><dd data-review-price></dd></div>
            <div><dt>Delivery</dt><dd data-review-duration></dd></div>
            <div><dt>Posted</dt><dd data-review-age></dd></div>
          </dl>
          <a data-review-platform target="_blank" rel="noopener noreferrer"></a>
        </div>
        <div class="review-footer">
          <div class="review-dots" role="tablist" aria-label="Choose testimonial">
            ${reviews.map((_, index) => `<button type="button" role="tab" aria-label="Show testimonial ${index + 1}" data-review-dot="${index}"></button>`).join("")}
          </div>
          <div class="review-controls">
            <button type="button" data-review-prev aria-label="Previous testimonial">←</button>
            <button type="button" data-review-next aria-label="Next testimonial">→</button>
          </div>
        </div>
      </article>
      <div class="review-progress" aria-hidden="true"><span data-review-progress></span></div>
    </div>`;
}

function setupReviewCarousel() {
  const stage = qs("[data-review-stage]");
  if (!stage || !reviews.length) return;

  const card = qs("[data-review-card]", stage);
  const typed = qs("[data-review-typed]", stage);
  const full = qs("[data-review-full]", stage);
  const name = qs("[data-review-name]", stage);
  const location = qs("[data-review-location]", stage);
  const platform = qs("[data-review-platform]", stage);
  const price = qs("[data-review-price]", stage);
  const duration = qs("[data-review-duration]", stage);
  const age = qs("[data-review-age]", stage);
  const count = qs("[data-review-count]", stage);
  const progress = qs("[data-review-progress]", stage);
  const dots = qsa("[data-review-dot]", stage);
  let current = 0;
  let frame = 0;
  let transitionTimer = 0;
  let advanceTimer = 0;
  let progressFrame = 0;
  let paused = false;
  let started = false;
  let complete = false;

  const clearMotion = () => {
    cancelAnimationFrame(frame);
    cancelAnimationFrame(progressFrame);
    clearTimeout(transitionTimer);
    clearTimeout(advanceTimer);
  };

  const updateStaticContent = review => {
    name.textContent = review.name;
    location.textContent = `${review.location}${review.repeatClient ? " · Repeat client" : ""}`;
    price.textContent = review.price || "Not listed";
    duration.textContent = review.duration || "Not listed";
    age.textContent = review.age || "Client review";
    platform.textContent = `View on ${review.platform}`;
    platform.href = review.platformUrl;
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(reviews.length).padStart(2, "0")}`;
    full.textContent = `“${review.quote}” — ${review.name}, ${review.platform}`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === current);
      dot.setAttribute("aria-selected", String(index === current));
      dot.tabIndex = index === current ? 0 : -1;
    });
  };

  const scheduleAdvance = () => {
    clearTimeout(advanceTimer);
    cancelAnimationFrame(progressFrame);
    progress.style.transform = "scaleX(0)";
    if (paused || reducedMotion) return;
    const duration = 5600;
    const start = performance.now();
    const tick = now => {
      const amount = Math.min((now - start) / duration, 1);
      progress.style.transform = `scaleX(${amount})`;
      if (amount < 1 && !paused) progressFrame = requestAnimationFrame(tick);
    };
    progressFrame = requestAnimationFrame(tick);
    advanceTimer = setTimeout(() => showSlide(current + 1), duration);
  };

  const finishTyping = () => {
    complete = true;
    card.classList.add("is-complete");
    scheduleAdvance();
  };

  const typeQuote = text => {
    typed.textContent = "";
    complete = false;
    const duration = Math.min(Math.max(text.length * 31, 1050), 3200);
    const start = performance.now();
    const tick = now => {
      const amount = Math.min((now - start) / duration, 1);
      const characters = Math.max(1, Math.floor(text.length * amount));
      typed.textContent = text.slice(0, characters);
      if (amount < 1) frame = requestAnimationFrame(tick);
      else finishTyping();
    };
    frame = requestAnimationFrame(tick);
  };

  function showSlide(nextIndex, instant = false) {
    clearMotion();
    current = (nextIndex + reviews.length) % reviews.length;
    complete = false;
    card.classList.remove("is-complete");
    card.classList.add("is-changing");
    progress.style.transform = "scaleX(0)";

    const swap = () => {
      const review = reviews[current];
      updateStaticContent(review);
      typed.textContent = reducedMotion || instant ? review.quote : "";
      card.classList.remove("is-changing");
      if (reducedMotion || instant) finishTyping();
      else typeQuote(review.quote);
    };

    transitionTimer = setTimeout(swap, instant ? 0 : 520);
  }

  qs("[data-review-prev]", stage).addEventListener("click", () => showSlide(current - 1));
  qs("[data-review-next]", stage).addEventListener("click", () => showSlide(current + 1));
  dots.forEach(dot => dot.addEventListener("click", () => showSlide(Number(dot.dataset.reviewDot))));

  const pause = () => {
    paused = true;
    clearTimeout(advanceTimer);
    cancelAnimationFrame(progressFrame);
  };
  const resume = () => {
    paused = false;
    if (complete) scheduleAdvance();
  };
  stage.addEventListener("pointerenter", pause);
  stage.addEventListener("pointerleave", resume);
  stage.addEventListener("focusin", pause);
  stage.addEventListener("focusout", event => { if (!stage.contains(event.relatedTarget)) resume(); });

  if (reducedMotion) {
    started = true;
    showSlide(0, true);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!started && entries.some(entry => entry.isIntersecting)) {
      started = true;
      showSlide(0);
      observer.disconnect();
    }
  }, { threshold: .35 });
  observer.observe(stage);
}

async function hydrateGameMedia() {
  const [images, details] = await Promise.all([
    getRobloxGameImages(games).catch(() => new Map()),
    getRobloxGameDetails(games).catch(() => new Map()),
  ]);
  await Promise.all(games.map(async game => {
    const card = qs(`[data-game-id="${game.id}"]`);
    if (!card) return;
    const shell = qs(".media-shell", card);
    const img = qs(".media-image", card);
    const media = images.get(game.id);
    const localImage = game.cachedImage || game.fallback;
    await loadImageSafely(img, media?.imageUrl, localImage, shell);

    const official = details.get(game.id);
    if (official?.name) qs("[data-game-name]", card).textContent = official.name;
    if (official?.creator) qs("[data-game-creator]", card).textContent = official.creator;
    if (official?.description) qs("[data-game-description]", card).textContent = official.description;
  }));
}

async function hydrateRobloxGroups() {
  const results = await getRobloxGroupImages(robloxGroups);
  await Promise.all(robloxGroups.map(async group => {
    const card = qs(`[data-network-type="roblox"][data-network-id="${group.groupId}"]`);
    if (!card) return;
    await loadImageSafely(qs(".network-icon", card), results.get(group.groupId)?.imageUrl, group.cachedImage || group.fallback, qs(".network-icon-shell", card));
  }));
}

async function hydrateDiscordServers() {
  await Promise.all(discordServers.map(async server => {
    const card = qs(`[data-network-type="discord"][data-network-id="${server.inviteCode}"]`);
    if (!card) return;
    const shell = qs(".network-icon-shell", card);
    const img = qs(".network-icon", card);
    try {
      const info = await getDiscordServer(server);
      await loadImageSafely(img, info.iconUrl, server.cachedImage || server.fallback, shell);
      const description = qs("p", card);
      if (info.memberCount) description.textContent = `${Number(info.memberCount).toLocaleString()} members · ${server.description}`;
    } catch {
      await loadImageSafely(img, null, server.cachedImage || server.fallback, shell);
    }
  }));
}

function setupDialog() {
  const dialog = qs("[data-media-dialog]");
  const video = qs("[data-dialog-video]", dialog);
  const shell = qs(".dialog-video-shell", dialog);
  const title = qs("[data-dialog-title]", dialog);
  const status = qs("[data-dialog-status]", dialog);

  const updateAudioStatus = () => {
    status.classList.toggle("is-muted", video.muted || video.volume === 0);
    status.lastChild.textContent = video.muted || video.volume === 0
      ? " Audio muted — enable sound in the player controls."
      : " Audio enabled — use the player controls to adjust volume.";
  };

  const close = () => {
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
    shell.dataset.loading = "false";
    document.body.classList.remove("dialog-open");
    if (dialog.open) dialog.close();
  };

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-video]");
    if (!trigger) return;
    title.textContent = trigger.dataset.title;
    video.poster = trigger.dataset.poster || "";
    video.src = trigger.dataset.video;
    video.muted = false;
    video.volume = 0.9;
    shell.dataset.loading = "true";
    document.body.classList.add("dialog-open");
    dialog.showModal();
    updateAudioStatus();
    video.play().catch(() => {
      status.lastChild.textContent = " Press play to start this demo with audio.";
    });
  });

  video.setAttribute("controlsList", "nodownload noplaybackrate");
  video.disablePictureInPicture = true;
  video.addEventListener("contextmenu", event => event.preventDefault());
  video.addEventListener("dragstart", event => event.preventDefault());
  video.addEventListener("canplay", () => { shell.dataset.loading = "false"; });
  video.addEventListener("playing", () => { shell.dataset.loading = "false"; });
  video.addEventListener("volumechange", updateAudioStatus);
  video.addEventListener("error", () => {
    shell.dataset.loading = "false";
    status.lastChild.textContent = " This video could not be loaded. Try opening the portfolio through a local web server.";
  });
  qs("[data-dialog-close]", dialog).addEventListener("click", close);
  dialog.addEventListener("click", event => { if (event.target === dialog) close(); });
  dialog.addEventListener("cancel", event => { event.preventDefault(); close(); });
}

function setupNavigation() {
  const toggle = qs("[data-menu-toggle]");
  const nav = qs("[data-mobile-nav]");
  const setOpen = open => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.dataset.open = String(open);
    nav.setAttribute("aria-hidden", String(!open));
    nav.inert = !open;
    document.body.classList.toggle("menu-open", open);
    qs(".sr-only", toggle).textContent = open ? "Close navigation" : "Open navigation";
  };
  setOpen(false);
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", event => { if (event.target.closest("a")) setOpen(false); });
  addEventListener("resize", () => { if (innerWidth > 1000) setOpen(false); });
  addEventListener("keydown", event => { if (event.key === "Escape") setOpen(false); });

  const sections = qsa("main section[id]");
  const links = qsa(".desktop-nav a");
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    links.forEach(link => link.toggleAttribute("aria-current", link.hash === `#${current.target.id}`));
  }, { rootMargin: "-35% 0px -55%", threshold: [0, .1, .5] });
  sections.forEach(section => observer.observe(section));
}

function setupReveal() {
  const items = qsa(".reveal");
  if (reducedMotion) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -7%", threshold: .08 });
  items.forEach(item => observer.observe(item));
}

function setupScrollEffects() {
  const progress = qs("[data-scroll-progress]");
  const header = qs("[data-header]");
  let ticking = false;
  const update = () => {
    const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    progress.style.transform = `scaleX(${Math.min(scrollY / max, 1)})`;
    header.classList.toggle("is-scrolled", scrollY > 16);
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

function setupPointerInteractions() {
  if (reducedMotion || !finePointer) return;
  const halo = qs(".pointer-halo");
  let pointerX = innerWidth / 2;
  let pointerY = innerHeight / 2;
  let haloX = pointerX;
  let haloY = pointerY;
  addEventListener("pointermove", event => { pointerX = event.clientX; pointerY = event.clientY; }, { passive: true });

  const tiltItems = qsa("[data-tilt], [data-tilt-soft]").map(element => ({
    element,
    strength: element.hasAttribute("data-tilt-soft") ? 1.5 : 3,
    tx: 0, ty: 0, cx: 0, cy: 0, sx: 50, sy: 50,
  }));
  tiltItems.forEach(item => {
    item.element.addEventListener("pointermove", event => {
      const rect = item.element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      item.tx = -py * item.strength;
      item.ty = px * item.strength;
      item.sx = (px + .5) * 100;
      item.sy = (py + .5) * 100;
    });
    item.element.addEventListener("pointerleave", () => { item.tx = 0; item.ty = 0; item.sx = 50; item.sy = 50; });
  });

  const magneticItems = qsa("[data-magnetic]").map(element => ({ element, tx: 0, ty: 0, cx: 0, cy: 0 }));
  magneticItems.forEach(item => {
    item.element.addEventListener("pointermove", event => {
      const rect = item.element.getBoundingClientRect();
      item.tx = (event.clientX - (rect.left + rect.width / 2)) * .035;
      item.ty = (event.clientY - (rect.top + rect.height / 2)) * .05;
    });
    item.element.addEventListener("pointerleave", () => { item.tx = 0; item.ty = 0; });
  });

  const tick = () => {
    haloX += (pointerX - haloX) * .075;
    haloY += (pointerY - haloY) * .075;
    halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
    tiltItems.forEach(item => {
      item.cx += (item.tx - item.cx) * .085;
      item.cy += (item.ty - item.cy) * .085;
      item.element.style.setProperty("--tilt-x", `${item.cx.toFixed(3)}deg`);
      item.element.style.setProperty("--tilt-y", `${item.cy.toFixed(3)}deg`);
      item.element.style.setProperty("--spot-x", `${item.sx.toFixed(1)}%`);
      item.element.style.setProperty("--spot-y", `${item.sy.toFixed(1)}%`);
    });
    magneticItems.forEach(item => {
      item.cx += (item.tx - item.cx) * .075;
      item.cy += (item.ty - item.cy) * .075;
      item.element.style.setProperty("--mag-x", `${item.cx.toFixed(2)}px`);
      item.element.style.setProperty("--mag-y", `${item.cy.toFixed(2)}px`);
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function setupCounters() {
  const counters = qsa("[data-count]");
  if (reducedMotion) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      const start = performance.now();
      const duration = 850;
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(element);
    });
  }, { threshold: .55 });
  counters.forEach(counter => observer.observe(counter));
}

function setupLiveClock() {
  const clocks = qsa("[data-live-clock]");
  if (!clocks.length) return;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const update = () => clocks.forEach(clock => { clock.textContent = `${formatter.format(new Date())} PHT`; });
  update();
  setInterval(update, 1000);
}

function setupLiveMetrics() {
  const metrics = qsa("[data-live-count]");
  const rail = qs(".live-metrics");
  if (!metrics.length || !rail) return;
  if (reducedMotion) { metrics.forEach(metric => { metric.textContent = metric.dataset.liveCount || "0"; }); return; }
  let played = false;
  const observer = new IntersectionObserver(entries => {
    if (played || !entries.some(entry => entry.isIntersecting)) return;
    played = true;
    const startTime = performance.now();
    const duration = 1500;
    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      metrics.forEach(metric => {
        const target = Number(metric.dataset.liveCount) || 0;
        metric.textContent = String(Math.round(target * eased));
        if (progress === 1) metric.closest(".live-metric")?.classList.add("is-counted");
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.disconnect();
  }, { threshold: .35 });
  observer.observe(rail);
}
function setupTextScramble() {
  if (reducedMotion || !finePointer) return;
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-";
  qsa(".section-kicker span:last-child, [data-scramble]").forEach(element => {
    const original = element.textContent;
    let running = false;
    element.addEventListener("pointerenter", () => {
      if (running) return;
      running = true;
      const start = performance.now();
      const duration = 520;
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(original.length * progress);
        element.textContent = [...original].map((character, index) => {
          if (character === " ") return " ";
          return index < revealed ? character : glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("");
        if (progress < 1) requestAnimationFrame(tick);
        else {
          element.textContent = original;
          running = false;
        }
      };
      requestAnimationFrame(tick);
    });
  });
}

function setupHeroParallax() {
  if (reducedMotion || !finePointer) return;
  const hero = qs(".hero");
  if (!hero) return;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  hero.addEventListener("pointermove", event => {
    const rect = hero.getBoundingClientRect();
    tx = (event.clientX - rect.left) / rect.width - .5;
    ty = (event.clientY - rect.top) / rect.height - .5;
  });
  hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; });
  const tick = () => {
    cx += (tx - cx) * .055;
    cy += (ty - cy) * .055;
    hero.style.setProperty("--hero-x", cx.toFixed(4));
    hero.style.setProperty("--hero-y", cy.toFixed(4));
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function setupDownloadPulse() {
  qsa("[data-source-download]").forEach(link => {
    link.addEventListener("click", () => {
      link.classList.remove("is-downloading");
      requestAnimationFrame(() => link.classList.add("is-downloading"));
      setTimeout(() => link.classList.remove("is-downloading"), 1300);
    });
  });
}

function setupSkillMeters() {
  const items = qsa(".skill-item");
  if (!items.length) return;
  const run = item => {
    const element = qs("[data-skill-value]", item);
    if (!element || item.dataset.meterStarted === "true") return;
    item.dataset.meterStarted = "true";
    const target = Number(element.dataset.skillValue || 0);
    item.classList.add("is-meter-active");
    if (reducedMotion) { element.textContent = String(target); return; }
    const start = performance.now();
    const duration = 1650;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = progress >= 1 ? String(target) : String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    run(entry.target);
    observer.unobserve(entry.target);
  }), { threshold: .12, rootMargin: "0px 0px -8% 0px" });
  items.forEach(item => observer.observe(item));
}

function setupAmbientCanvas() {
  const canvas = qs("[data-ambient-canvas]");
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  let width = 0, height = 0, dpr = 1;
  let pointer = { x: -9999, y: -9999 };
  let particles = [];
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth;
    height = innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(22, Math.min(64, Math.round(width / 28)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * (.16 + (index % 4) * .025),
      vy: (Math.random() - .5) * (.16 + (index % 3) * .025),
      r: .6 + Math.random() * 1.25,
      phase: Math.random() * Math.PI * 2,
    }));
  };
  addEventListener("resize", resize, { passive: true });
  addEventListener("pointermove", event => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
  addEventListener("pointerleave", () => { pointer.x = -9999; pointer.y = -9999; });
  resize();
  const tick = time => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 180) {
        const force = (180 - distance) / 1800;
        p.vx -= dx * force * .0018;
        p.vy -= dy * force * .0018;
      }
      p.vx *= .997;
      p.vy *= .997;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
      const pulse = .55 + Math.sin(time * .0012 + p.phase) * .3;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,38,56,${.15 + pulse * .22})`;
      ctx.arc(p.x, p.y, p.r + pulse * .35, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < particles.length; j += 1) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 118) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,38,56,${(1 - d / 118) * .085})`;
          ctx.lineWidth = .7;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function setupContractViewer() {
  const viewer = qs("[data-contract-viewer]");
  if (!viewer) return;
  const pages = qsa("[data-contract-page]", viewer);
  const jumps = qsa("[data-contract-jump]", viewer);
  const current = qs("[data-contract-current]", viewer);
  const viewport = qs("[data-contract-viewport]", viewer);
  const zoomIn = qs("[data-contract-zoom-in]", viewer);
  const zoomOut = qs("[data-contract-zoom-out]", viewer);
  let scale = 1;

  const setCurrent = pageNumber => {
    if (current) current.textContent = String(pageNumber);
    jumps.forEach(button => button.classList.toggle("is-active", button.dataset.contractJump === String(pageNumber)));
  };
  const applyScale = () => viewer.style.setProperty("--contract-scale", scale.toFixed(2));
  zoomIn?.addEventListener("click", () => { scale = Math.min(1.35, scale + .1); applyScale(); });
  zoomOut?.addEventListener("click", () => { scale = Math.max(.75, scale - .1); applyScale(); });
  jumps.forEach(button => button.addEventListener("click", () => {
    const page = pages.find(item => item.dataset.contractPage === button.dataset.contractJump);
    page?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }));

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrent(visible.target.dataset.contractPage);
  }, { root: viewport, threshold: [.25, .45, .65] });
  pages.forEach(page => observer.observe(page));
}

function validateExternalLinks() {
  const invalid = qsa('a[target="_blank"]').filter(link => !/^https:\/\//.test(link.href));
  if (invalid.length) console.warn("Invalid external links detected", invalid);
}

function init() {
  renderProjects();
  renderGames();
  renderSkills();
  renderProcess();
  renderNetwork();
  renderReviews();
  setupReviewCarousel();
  setupDialog();
  setupNavigation();
  setupReveal();
  setupScrollEffects();
  setupPointerInteractions();
  setupCounters();
  setupSkillMeters();
  setupLiveClock();
  setupLiveMetrics();
  setupTextScramble();
  setupHeroParallax();
  setupAmbientCanvas();
  setupContractViewer();
  setupDownloadPulse();
  validateExternalLinks();

  Promise.allSettled([hydrateGameMedia(), hydrateRobloxGroups(), hydrateDiscordServers()]).then(results => {
    results.forEach(result => { if (result.status === "rejected") console.warn("Media hydration failed safely", result.reason); });
  });
}

init();
