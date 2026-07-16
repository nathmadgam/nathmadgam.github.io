/** @typedef {{title:string, category:string, year:string, description:string, tags:string[], video:string, poster:string}} Project */
/** @typedef {{name:string, id:string, idType:'place'|'universe', url:string, description:string, fallback:string}} RobloxGame */
/** @typedef {{name:string, groupId:string, role:string, description:string, url:string, fallback:string}} RobloxGroup */
/** @typedef {{name:string, role:string, description:string, inviteCode:string, url:string, fallback:string, guildId?:string, iconHash?:string}} DiscordServer */

/** @type {Project[]} */
export const projects = [
  {
    title: "Rock Stacking",
    category: "Gameplay architecture",
    year: "2024",
    description: "A competitive throw-and-rebuild loop with team state, hit validation, round flow, and responsive feedback tuned around accuracy and coordination.",
    tags: ["Luau", "Round state", "Team gameplay"],
    video: "videos/rockstacking.mp4",
    poster: "assets/posters/rockstacking.webp",
  },
  {
    title: "Map Voting",
    category: "UI + systems",
    year: "2024",
    description: "A complete voting flow that connects presentation, server-owned vote state, map selection, and clean handoff into the game loop.",
    tags: ["UI state", "Remote events", "Game loop"],
    video: "videos/map-voting-system.mp4",
    poster: "assets/posters/map-voting-system.webp",
  },
  {
    title: "Global Donation Board",
    category: "Persistent economy",
    year: "2024",
    description: "Cross-server donation data with shared ranking, consistency safeguards, and a presentation layer that remains responsive while values update.",
    tags: ["DataStore", "Cross-server", "Economy"],
    video: "videos/global-donation-board.mp4",
    poster: "assets/posters/global-donation-board.webp",
  },
  {
    title: "Enemy Nextbot",
    category: "NPC behaviour",
    year: "2024",
    description: "Configurable pursuit behaviour using PathfindingService, obstacle-aware route refreshes, and separation between navigation, targeting, and damage logic.",
    tags: ["Pathfinding", "NPC AI", "Configuration"],
    video: "videos/pathfinding.mp4",
    poster: "assets/posters/pathfinding.webp",
  },
  {
    title: "Interactive Main Menu",
    category: "Interface systems",
    year: "2024",
    description: "A modular menu with controlled camera states, animated transitions, and a layout designed to adapt across different game themes and screen sizes.",
    tags: ["UI/UX", "Camera", "Transitions"],
    video: "videos/interactive-main-menu.mp4",
    poster: "assets/posters/interactive-main-menu.webp",
  },
  {
    title: "Tycoon Framework",
    category: "Reusable framework",
    year: "2024",
    description: "A data-backed purchase framework with unlock dependencies, visual affordances, persistence, and a structure that scales beyond a single map.",
    tags: ["Framework", "Persistence", "Purchases"],
    video: "videos/tycoon-creation.mp4",
    poster: "assets/posters/tycoon-creation.webp",
  },
];

/** @type {RobloxGame[]} */
export const games = [
  {
    name: "Grow Your Pet",
    id: "110811521450324",
    idType: "place",
    url: "https://www.roblox.com/games/110811521450324/GROW-YOUR-PET",
    description: "Published Roblox experience included in the original portfolio.",
    fallback: "assets/fallbacks/grow-your-pet.svg",
  },
  {
    name: "Soft Pink Tower",
    id: "95624995252294",
    idType: "place",
    url: "https://www.roblox.com/games/95624995252294/Soft-Pink-Tower",
    description: "Tower experience with development contribution listed in the original portfolio.",
    fallback: "assets/fallbacks/soft-pink-tower.svg",
  },
  {
    name: "Soft Pink Wallhop Tower",
    id: "101848404389998",
    idType: "place",
    url: "https://www.roblox.com/games/101848404389998/Soft-Pink-Wallhop-Tower",
    description: "Wallhop tower experience with development contribution listed in the original portfolio.",
    fallback: "assets/fallbacks/soft-pink-wallhop.svg",
  },
];

export const skills = [
  { title: "Luau architecture", description: "Module boundaries, explicit state, typed Luau patterns, reusable APIs, and maintainable service layers." },
  { title: "Server-authoritative gameplay", description: "Validation, remotes, round systems, interaction mechanics, cooldowns, and exploit-resistant ownership." },
  { title: "Persistent data", description: "DataStore strategy, profile/session handling, autosave, migrations, failure recovery, and cross-server state." },
  { title: "UI systems", description: "Responsive Roblox interfaces, state-driven flows, camera transitions, menus, voting, shops, and feedback." },
  { title: "NPC + pathfinding", description: "Target selection, route refreshes, obstacle handling, configurable behaviours, and performance constraints." },
  { title: "Moderation + platform APIs", description: "Ban workflows, permissions, audit-friendly actions, safe API boundaries, and visitor-friendly error states." },
  { title: "Economy systems", description: "Purchases, donations, global boards, progression dependencies, and consistent display of changing values." },
  { title: "Performance + debugging", description: "Profiling, event cleanup, request deduplication, cache design, clear development logging, and graceful fallback." },
];

export const process = [
  { title: "Define", description: "Translate the mechanic into states, owners, constraints, success conditions, and concrete failure cases." },
  { title: "Prototype", description: "Build the smallest end-to-end path first so interaction, networking, and data assumptions can be tested early." },
  { title: "Harden", description: "Add validation, cancellation, retries, persistence safeguards, instrumentation, and reduced-motion or low-end considerations." },
  { title: "Handoff", description: "Document modules, configuration, extension points, known limits, and the checks required before release." },
];

/** @type {RobloxGroup[]} */
export const robloxGroups = [
  { name: "Tenasa Games", groupId: "34265738", role: "Founder", description: "Roblox development group listed in the original portfolio.", url: "https://www.roblox.com/communities/34265738/Tenasa-Games", fallback: "assets/fallbacks/group-tenasa.svg" },
  { name: "SOL Co.", groupId: "153339776", role: "Main developer", description: "Creative game community and development group.", url: "https://www.roblox.com/communities/153339776/SOL-Co", fallback: "assets/fallbacks/group-sol.svg" },
  { name: "Skydda Concord Studio", groupId: "81081641", role: "Developer", description: "Independent Roblox development studio.", url: "https://www.roblox.com/communities/81081641/Skydda-Concord-Studio", fallback: "assets/fallbacks/group-skydda.svg" },
  { name: "Corebound Games", groupId: "312003009", role: "Admin", description: "Early-stage Roblox game studio.", url: "https://www.roblox.com/communities/312003009/Corebound-Games", fallback: "assets/fallbacks/group-corebound.svg" },
];

/** @type {DiscordServer[]} */
export const discordServers = [
  { name: "Summit Developers", role: "Pioneer", description: "Roblox developer community listed in the original portfolio.", inviteCode: "UXsEATcmaa", url: "https://discord.gg/UXsEATcmaa", fallback: "assets/fallbacks/discord-summit.svg" },
  { name: "Cynex Services", role: "Founder", description: "The portfolio's primary Discord contact server.", inviteCode: "Pnjjkc6FHY", url: "https://discord.gg/Pnjjkc6FHY", fallback: "assets/fallbacks/discord-cynex.svg" },
];

export const reviews = [
  { name: "lotteryshot", location: "United States", quote: "Went beyond and helped with extra work, excellent and fair." },
  { name: "skyebsu", location: "United Kingdom · repeat client", quote: "Pays keen attention to detail, extremely good at scripting, very quick to respond!" },
  { name: "loaf_bread", location: "Philippines", quote: "He was able to fulfill all of my requests and even provided some valuable ideas. Any minor issues were promptly resolved." },
];
