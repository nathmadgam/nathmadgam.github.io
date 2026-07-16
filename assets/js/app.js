import { projects, games, skills, process, robloxGroups, discordServers, reviews } from "./data.js";
import { getRobloxGameImages, getRobloxGroupImages, getDiscordServer, loadImageSafely } from "./media-service.js";

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);
}

function renderProjects() {
  const grid = qs("[data-project-grid]");
  if (!projects.length) {
    grid.innerHTML = '<p class="network-empty">No project demos are published yet.</p>';
    return;
  }
  grid.innerHTML = projects.map((project, index) => `
    <article class="project-card reveal">
      <div class="project-media">
        <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
        <img src="${escapeHtml(project.poster)}" alt="Video preview for ${escapeHtml(project.title)}" width="960" height="540" loading="lazy">
        <button class="project-play" type="button" data-video="${escapeHtml(project.video)}" data-title="${escapeHtml(project.title)}" aria-label="Play ${escapeHtml(project.title)} demo">▶ PLAY DEMO</button>
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
  grid.innerHTML = games.map(game => `
    <a class="game-card reveal" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer" data-game-id="${game.id}">
      <div class="media-shell" data-state="loading">
        <div class="media-skeleton" aria-hidden="true"></div>
        <img class="media-image" alt="Roblox thumbnail for ${escapeHtml(game.name)}" width="512" height="512" loading="lazy">
        <span class="media-state-label">Loading Roblox media…</span>
      </div>
      <div class="game-card-body">
        <div class="game-card-head"><h3>${escapeHtml(game.name)}</h3><span class="game-card-arrow" aria-hidden="true">↗</span></div>
        <p>${escapeHtml(game.description)}</p>
        <span class="game-id">${game.idType.toUpperCase()} ID / ${escapeHtml(game.id)}</span>
      </div>
    </a>`).join("");
}

function renderSkills() {
  qs("[data-skill-grid]").innerHTML = skills.map((skill, index) => `
    <article class="skill-item">
      <span class="skill-code">S-${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(skill.title)}</h3><p>${escapeHtml(skill.description)}</p></div>
      <span class="skill-pulse" aria-hidden="true"></span>
    </article>`).join("");
}

function renderProcess() {
  qs("[data-process-grid]").innerHTML = process.map(item => `
    <li class="process-card reveal"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></li>`).join("");
}

function networkCard(item, type) {
  const id = type === "roblox" ? item.groupId : item.inviteCode;
  return `
    <a class="network-card reveal" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" data-network-type="${type}" data-network-id="${escapeHtml(id)}">
      <div class="network-icon-shell" data-state="loading">
        <div class="media-skeleton" aria-hidden="true"></div>
        <img class="network-icon" alt="${escapeHtml(item.name)} icon" width="150" height="150" loading="lazy">
      </div>
      <div><h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.description)}</p><span class="network-role">${escapeHtml(item.role)}</span></div>
      <span class="network-arrow" aria-hidden="true">↗</span>
    </a>`;
}

function renderNetwork() {
  qs("[data-roblox-groups]").innerHTML = robloxGroups.length
    ? robloxGroups.map(item => networkCard(item, "roblox")).join("")
    : '<p class="network-empty">No Roblox groups are configured.</p>';
  qs("[data-discord-servers]").innerHTML = discordServers.length
    ? discordServers.map(item => networkCard(item, "discord")).join("")
    : '<p class="network-empty">No Discord servers are configured.</p>';
}

function renderReviews() {
  const list = qs("[data-review-list]");
  if (!reviews.length) {
    list.innerHTML = '<p class="network-empty">Verified client feedback will appear here.</p>';
    return;
  }
  list.innerHTML = reviews.map(review => `
    <article class="review-card reveal">
      <div class="review-person">${escapeHtml(review.name)}</div>
      <blockquote>“${escapeHtml(review.quote)}”<cite>${escapeHtml(review.location)}</cite></blockquote>
    </article>`).join("");
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
    const loaded = await loadImageSafely(img, media?.imageUrl, game.fallback, shell);
    if (loaded !== "loaded") label.textContent = media?.reason === "blocked" ? "Roblox media moderated" : "Local fallback image";
  }));
}

async function hydrateRobloxGroups() {
  const results = await getRobloxGroupImages(robloxGroups);
  await Promise.all(robloxGroups.map(async group => {
    const card = qs(`[data-network-type="roblox"][data-network-id="${group.groupId}"]`);
    if (!card) return;
    const shell = qs(".network-icon-shell", card);
    const img = qs(".network-icon", card);
    await loadImageSafely(img, results.get(group.groupId)?.imageUrl, group.fallback, shell);
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
      await loadImageSafely(img, info.iconUrl, server.fallback, shell);
      const description = qs("p", card);
      if (info.memberCount) description.textContent = `${Number(info.memberCount).toLocaleString()} members · ${server.description}`;
    } catch {
      await loadImageSafely(img, null, server.fallback, shell);
    }
  }));
}

function setupDialog() {
  const dialog = qs("[data-media-dialog]");
  const video = qs("[data-dialog-video]", dialog);
  const title = qs("[data-dialog-title]", dialog);
  const close = () => {
    video.pause();
    video.removeAttribute("src");
    video.load();
    if (dialog.open) dialog.close();
  };
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-video]");
    if (!trigger) return;
    title.textContent = trigger.dataset.title;
    video.src = trigger.dataset.video;
    dialog.showModal();
    video.play().catch(() => {});
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
    nav.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    qs(".sr-only", toggle).textContent = open ? "Close navigation" : "Open navigation";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", event => { if (event.target.matches("a")) setOpen(false); });
  addEventListener("resize", () => { if (innerWidth > 1000) setOpen(false); });

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
  }, { rootMargin: "0px 0px -8%", threshold: .08 });
  items.forEach(item => observer.observe(item));
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
  setupDialog();
  setupNavigation();
  setupReveal();
  validateExternalLinks();

  Promise.allSettled([hydrateGameMedia(), hydrateRobloxGroups(), hydrateDiscordServers()]).then(results => {
    results.forEach(result => { if (result.status === "rejected") console.warn("Media hydration failed safely", result.reason); });
  });
}

init();
