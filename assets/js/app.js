import { projects, games, skills, process, robloxGroups, discordServers, reviews } from "./data.js";
import { getRobloxGameImages, getRobloxGroupImages, getDiscordServer, loadImageSafely } from "./media-service.js";

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
    <a class="game-card reveal" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer" data-game-id="${game.id}" data-tilt style="--reveal-delay:${Math.min(index * 90, 270)}ms;--card-index:${index}">
      <div class="media-shell" data-state="fallback">
        <div class="media-skeleton" aria-hidden="true"></div>
        <img class="media-image" src="${escapeHtml(initialImage)}" alt="Roblox experience artwork for ${escapeHtml(game.name)}" width="512" height="512" loading="lazy" decoding="async">
        <span class="media-type-badge">${icon("roblox")} Roblox</span>
        <span class="media-state-label">Saved Roblox thumbnail</span>
      </div>
      <div class="game-card-body">
        <div class="game-card-head"><h3>${escapeHtml(game.name)}</h3><span class="game-card-arrow" aria-hidden="true">${icon("external")}</span></div>
        <p>${escapeHtml(game.description)}</p>
        <dl class="game-credits">
          <div><dt>Creator</dt><dd>${escapeHtml(game.creator)}</dd></div>
          <div><dt>My role</dt><dd>${escapeHtml(game.role)}</dd></div>
        </dl>
        <span class="game-id">${game.idType.toUpperCase()} ID / ${escapeHtml(game.id)}</span>
      </div>
    </a>`;
  }).join("");
}

function renderSkills() {
  qs("[data-skill-grid]").innerHTML = skills.map((skill, index) => `
    <article class="skill-item reveal" style="--reveal-delay:${Math.min(index * 45, 250)}ms">
      <span class="skill-code">S-${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(skill.title)}</h3><p>${escapeHtml(skill.description)}</p></div>
      <span class="skill-pulse" aria-hidden="true"></span>
    </article>`).join("");
}

function renderProcess() {
  qs("[data-process-grid]").innerHTML = process.map((item, index) => `
    <li class="process-card reveal" style="--reveal-delay:${index * 80}ms"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></li>`).join("");
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
          <div>
            <strong data-review-name></strong>
            <span data-review-location></span>
          </div>
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
    location.textContent = review.location;
    platform.textContent = `Posted on ${review.platform}`;
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
    const duration = 4600;
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
    const duration = Math.min(Math.max(text.length * 27, 900), 2500);
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

    transitionTimer = setTimeout(swap, instant ? 0 : 260);
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
  const results = await getRobloxGameImages(games);
  await Promise.all(games.map(async game => {
    const card = qs(`[data-game-id="${game.id}"]`);
    if (!card) return;
    const shell = qs(".media-shell", card);
    const img = qs(".media-image", card);
    const label = qs(".media-state-label", card);
    const media = results.get(game.id);
    const localImage = game.cachedImage || game.fallback;
    const loaded = await loadImageSafely(img, media?.imageUrl, localImage, shell);
    label.textContent = loaded === "loaded"
      ? "Live Roblox thumbnail"
      : media?.reason === "blocked" ? "Thumbnail unavailable" : "Saved Roblox thumbnail";
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
  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  const animateHalo = () => {
    currentX += (targetX - currentX) * .16;
    currentY += (targetY - currentY) * .16;
    halo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animateHalo);
  };
  addEventListener("pointermove", event => { targetX = event.clientX; targetY = event.clientY; }, { passive: true });
  animateHalo();

  qsa("[data-tilt], [data-tilt-soft]").forEach(element => {
    const strength = element.hasAttribute("data-tilt-soft") ? 1.6 : 3.2;
    element.addEventListener("pointermove", event => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      element.style.setProperty("--tilt-x", `${(-py * strength).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(px * strength).toFixed(2)}deg`);
      element.style.setProperty("--spot-x", `${((px + .5) * 100).toFixed(1)}%`);
      element.style.setProperty("--spot-y", `${((py + .5) * 100).toFixed(1)}%`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--spot-x", "50%");
      element.style.setProperty("--spot-y", "50%");
    });
  });

  qsa("[data-magnetic]").forEach(element => {
    element.addEventListener("pointermove", event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * .035;
      const y = (event.clientY - (rect.top + rect.height / 2)) * .06;
      element.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
      element.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--mag-x", "0px");
      element.style.setProperty("--mag-y", "0px");
    });
  });
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
  if (!metrics.length || reducedMotion) return;
  metrics.forEach((metric, index) => {
    const target = Number(metric.dataset.liveCount);
    let cycle = 0;
    const animate = () => {
      const start = performance.now();
      const from = Math.max(0, target - Math.max(3, Math.round(target * .35)));
      const duration = 1250 + index * 180;
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        metric.textContent = String(Math.round(from + (target - from) * eased));
        if (progress < 1) requestAnimationFrame(tick);
        else metric.closest(".live-metric")?.classList.add("is-counted");
      };
      requestAnimationFrame(tick);
      cycle += 1;
      if (cycle < 3) setTimeout(animate, 8500 + index * 700);
    };
    setTimeout(animate, 380 + index * 180);
  });
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
  hero.addEventListener("pointermove", event => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    hero.style.setProperty("--hero-x", x.toFixed(3));
    hero.style.setProperty("--hero-y", y.toFixed(3));
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0");
    hero.style.setProperty("--hero-y", "0");
  });
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
  setupLiveClock();
  setupLiveMetrics();
  setupTextScramble();
  setupHeroParallax();
  setupDownloadPulse();
  validateExternalLinks();

  Promise.allSettled([hydrateGameMedia(), hydrateRobloxGroups(), hydrateDiscordServers()]).then(results => {
    results.forEach(result => { if (result.status === "rejected") console.warn("Media hydration failed safely", result.reason); });
  });
}

init();
