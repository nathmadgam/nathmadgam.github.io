/** @typedef {{title:string, category:string, year:string, description:string, tags:string[], video:string, poster:string}} Project */
/** @typedef {{name:string, id:string, idType:'place'|'universe', universeId?:string, creator:string, role:string, url:string, description:string, fallback:string, cachedImage?:string}} RobloxGame */
/** @typedef {{name:string, groupId:string, role:string, description:string, url:string, fallback:string, cachedImage?:string, cacheName?:string}} RobloxGroup */
/** @typedef {{name:string, role:string, description:string, inviteCode:string, url:string, fallback:string, cachedImage?:string, cacheName?:string, guildId?:string, iconHash?:string}} DiscordServer */

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
    creator: "Skydda Concord Studio",
    role: "Programmer",
    url: "https://www.roblox.com/games/110811521450324/GROW-YOUR-PET",
    description: "A pet-growth experience featuring progression, player-facing systems, and production gameplay scripting.",
    cachedImage: "assets/cached-media/grow-your-pet.webp",
    fallback: "assets/fallbacks/grow-your-pet.svg",
  },
  {
    name: "Soft Pink Tower",
    id: "95624995252294",
    idType: "place",
    universeId: "9333955742",
    creator: "Lazy Tower Studio",
    role: "Programmer",
    url: "https://www.roblox.com/games/95624995252294/Soft-Pink-Tower",
    description: "A polished tower experience with gameplay and production scripting contributions.",
    cachedImage: "assets/cached-media/soft-pink-tower.webp",
    fallback: "assets/fallbacks/soft-pink-tower.svg",
  },
  {
    name: "Soft Pink Wallhop Tower",
    id: "101848404389998",
    idType: "place",
    universeId: "9397456825",
    creator: "Lazy Tower Studio",
    role: "Programmer",
    url: "https://www.roblox.com/games/101848404389998/Soft-Pink-Wallhop-Tower",
    description: "A wallhop-focused tower experience with gameplay and systems programming contributions.",
    cachedImage: "assets/cached-media/soft-pink-wallhop.webp",
    fallback: "assets/fallbacks/soft-pink-wallhop.svg",
  },
];

export const skills = [
  { title: "Programming + problem solving", description: "Turning product requirements into dependable features with clear logic, practical trade-offs, and readable implementation." },
  { title: "Software architecture", description: "Modular services, typed Luau, explicit state, reusable components, configuration, and maintainable code ownership." },
  { title: "Backend development", description: "Server-authoritative systems, validation, permissions, remote communication, session ownership, and secure boundaries." },
  { title: "Data systems", description: "Persistence, profiles, autosave, migrations, recovery paths, cross-server state, and consistent progression data." },
  { title: "User interface development", description: "Responsive interfaces, state-driven menus, interaction feedback, camera flows, onboarding, shops, and voting." },
  { title: "Testing + debugging", description: "Reproducing defects, checking edge cases, logging useful context, validating failure states, and preventing regressions." },
  { title: "Performance optimization", description: "Profiling, event cleanup, network efficiency, cache design, request deduplication, and runtime-focused improvements." },
  { title: "Collaboration + delivery", description: "Scope communication, version-control habits, documentation, configurable handoff, and clean support for continued development." },
];

export const process = [
  { title: "Scope", description: "Define the player flow, technical ownership, saved data, edge cases, success criteria, and exact production requirements." },
  { title: "Build", description: "Create a working end-to-end version early, then organize the feature into clear client, server, UI, and data responsibilities." },
  { title: "Test", description: "Check validation, exploits, respawns, disconnects, persistence failures, mobile layouts, performance, and interaction edge cases." },
  { title: "Deliver", description: "Clean the code, document configuration and extension points, verify the final build, and hand over a maintainable system." },
];

/** @type {RobloxGroup[]} */
export const robloxGroups = [
  { name: "Tenasa Games", groupId: "34265738", role: "Founder", description: "Roblox development group for original projects and collaborative production work.", url: "https://www.roblox.com/communities/34265738/Tenasa-Games", cachedImage: "assets/cached-media/group-tenasa.webp", fallback: "assets/fallbacks/group-tenasa.svg", cacheName: "group-tenasa.webp" },
  { name: "SOL Co.", groupId: "153339776", role: "Main developer", description: "Creative Roblox community with development and systems contributions.", url: "https://www.roblox.com/communities/153339776/SOL-Co", cachedImage: "assets/cached-media/group-sol.webp", fallback: "assets/fallbacks/group-sol.svg", cacheName: "group-sol.webp" },
  { name: "Skydda Concord Studio", groupId: "81081641", role: "Developer", description: "Independent Roblox studio behind collaborative experience development.", url: "https://www.roblox.com/communities/81081641/Skydda-Concord-Studio", cachedImage: "assets/cached-media/group-skydda.webp", fallback: "assets/fallbacks/group-skydda.svg", cacheName: "group-skydda.webp" },
  { name: "Corebound Games", groupId: "312003009", role: "Admin", description: "Roblox game studio focused on building and organizing new projects.", url: "https://www.roblox.com/communities/312003009/Corebound-Games", cachedImage: "assets/cached-media/group-corebound.webp", fallback: "assets/fallbacks/group-corebound.svg", cacheName: "group-corebound.webp" },
];

/** @type {DiscordServer[]} */
export const discordServers = [
  { name: "Summit Developers", role: "Pioneer", description: "A Roblox developer community for collaboration, feedback, and technical discussion.", inviteCode: "UXsEATcmaa", url: "https://discord.gg/UXsEATcmaa", fallback: "assets/fallbacks/discord-summit.svg", cachedImage: "assets/cached-media/discord-summit.webp", cacheName: "discord-summit.webp" },
  { name: "Cynex Services", role: "Founder", description: "The primary server for project inquiries, development updates, and direct contact.", inviteCode: "sAQtQyyS", url: "https://discord.gg/sAQtQyyS", fallback: "assets/fallbacks/discord-cynex.svg", cachedImage: "assets/cached-media/discord-cynex.webp", cacheName: "discord-cynex.webp" },
];

export const reviews = [
  { name: "lotteryshot", location: "United States", platform: "Fiverr", platformUrl: "https://www.fiverr.com/nathmad54", quote: "Went beyond and helped with extra work, excellent and fair." },
  { name: "skyebsu", location: "United Kingdom · repeat client", platform: "Fiverr", platformUrl: "https://www.fiverr.com/nathmad54", quote: "Pays keen attention to detail, extremely good at scripting, very quick to respond!" },
  { name: "loaf_bread", location: "Philippines", platform: "Fiverr", platformUrl: "https://www.fiverr.com/nathmad54", quote: "He was able to fulfill all of my requests and even provided some valuable ideas. Any minor issues were promptly resolved." },
];
