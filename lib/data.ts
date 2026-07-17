import { assetPath } from "@/lib/paths";

export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  video: string;
  poster: string;
};

export type Game = {
  name: string;
  placeId: string;
  universeId?: string;
  creator: string;
  role: "Programmer";
  url: string;
  description: string;
  cachedImage: string;
  fallback: string;
};

export type Skill = {
  title: string;
  percentage: number;
  description: string;
};

export type NetworkItem = {
  name: string;
  role: string;
  description: string;
  url: string;
  cachedImage: string;
  fallback: string;
  groupId?: string;
  inviteCode?: string;
};

export type Review = {
  name: string;
  location: string;
  repeatClient: boolean;
  rating: number;
  age: string;
  price: string;
  duration: string;
  quote: string;
};

export const projects: Project[] = [
  {
    title: "Rock Stacking",
    category: "Gameplay architecture",
    year: "2024",
    description: "A competitive throw-and-rebuild loop with team state, hit validation, round flow, and responsive feedback tuned around accuracy and coordination.",
    tags: ["Luau", "Round state", "Team gameplay"],
    video: assetPath("/videos/rockstacking.mp4"),
    poster: assetPath("/assets/posters/rockstacking.webp"),
  },
  {
    title: "Map Voting",
    category: "Interface systems",
    year: "2024",
    description: "A complete voting flow connecting presentation, server-owned vote state, map selection, and a clean handoff into the game loop.",
    tags: ["UI state", "Remote events", "Game loop"],
    video: assetPath("/videos/map-voting-system.mp4"),
    poster: assetPath("/assets/posters/map-voting-system.webp"),
  },
  {
    title: "Global Donation Board",
    category: "Persistent economy",
    year: "2024",
    description: "Cross-server donation data with shared ranking, consistency safeguards, and a responsive presentation layer for changing values.",
    tags: ["DataStore", "Cross-server", "Economy"],
    video: assetPath("/videos/global-donation-board.mp4"),
    poster: assetPath("/assets/posters/global-donation-board.webp"),
  },
  {
    title: "Enemy Nextbot",
    category: "NPC behaviour",
    year: "2024",
    description: "Configurable pursuit behaviour using PathfindingService, obstacle-aware route refreshes, and separated navigation, targeting, and damage logic.",
    tags: ["Pathfinding", "NPC AI", "Configuration"],
    video: assetPath("/videos/pathfinding.mp4"),
    poster: assetPath("/assets/posters/pathfinding.webp"),
  },
  {
    title: "Interactive Main Menu",
    category: "Interface systems",
    year: "2024",
    description: "A modular menu with controlled camera states, animated transitions, and a layout designed to adapt across themes and screen sizes.",
    tags: ["UI/UX", "Camera", "Transitions"],
    video: assetPath("/videos/interactive-main-menu.mp4"),
    poster: assetPath("/assets/posters/interactive-main-menu.webp"),
  },
  {
    title: "Tycoon Framework",
    category: "Reusable framework",
    year: "2024",
    description: "A data-backed purchase framework with unlock dependencies, visual affordances, persistence, and a structure that scales beyond one map.",
    tags: ["Framework", "Persistence", "Purchases"],
    video: assetPath("/videos/tycoon-creation.mp4"),
    poster: assetPath("/assets/posters/tycoon-creation.webp"),
  },
];

export const games: Game[] = [
  {
    name: "Grow Your Pet",
    placeId: "110811521450324",
    creator: "Skydda Concord Studio",
    role: "Programmer",
    url: "https://www.roblox.com/games/110811521450324/GROW-YOUR-PET",
    description: "Raise a pet through a progression-focused Roblox experience, expand its growth, and continue building toward larger milestones over time.",
    cachedImage: assetPath("/assets/cached-media/grow-your-pet.webp"),
    fallback: assetPath("/assets/fallbacks/grow-your-pet.svg"),
  },
  {
    name: "[CARRY] Soft Pink Tower",
    placeId: "95624995252294",
    universeId: "9333955742",
    creator: "Lazy Tower Studio",
    role: "Programmer",
    url: "https://www.roblox.com/games/95624995252294/Soft-Pink-Tower",
    description: "Climb a soft pink obstacle tower built around timing, movement, and repeat runs through progressively demanding stages.",
    cachedImage: assetPath("/assets/cached-media/soft-pink-tower.webp"),
    fallback: assetPath("/assets/fallbacks/soft-pink-tower.svg"),
  },
  {
    name: "Soft Pink Wallhop Tower",
    placeId: "101848404389998",
    universeId: "9397456825",
    creator: "Lazy Tower Studio",
    role: "Programmer",
    url: "https://www.roblox.com/games/101848404389998/Soft-Pink-Wallhop-Tower",
    description: "Climb a soft pink tower built around wallhop movement, precision platforming, and increasingly demanding obstacle sections.",
    cachedImage: assetPath("/assets/cached-media/soft-pink-wallhop.webp"),
    fallback: assetPath("/assets/fallbacks/soft-pink-wallhop.svg"),
  },
];

export const skills: Skill[] = [
  { title: "Programming Fundamentals", percentage: 95, description: "Writing clear Luau, structuring control flow, selecting suitable data structures, solving defects, and turning requirements into dependable features." },
  { title: "Software Architecture", percentage: 91, description: "Organizing larger projects into reusable modules and services with explicit responsibilities, predictable state, and maintainable code." },
  { title: "Gameplay Development", percentage: 94, description: "Building player mechanics, rounds, interactions, combat rules, cooldowns, NPC behaviour, and responsive client-server feedback." },
  { title: "Backend Development", percentage: 90, description: "Creating server-authoritative logic, validating requests, managing permissions and sessions, and keeping important rules secure from the client." },
  { title: "Database Management", percentage: 92, description: "Designing DataStore profiles, autosave, migrations, recovery paths, cross-server state, and reliable progression." },
  { title: "User Interface Development", percentage: 87, description: "Developing responsive interfaces, menus, onboarding, shops, voting flows, camera states, and readable player feedback." },
  { title: "Testing and Optimization", percentage: 89, description: "Reproducing edge cases, profiling runtime behaviour, reducing unnecessary network work, cleaning events, and verifying features across devices." },
  { title: "Team Collaboration", percentage: 93, description: "Communicating scope, documenting systems, using version control, preparing configurable handoffs, and supporting continued development." },
];

export const process = [
  { title: "Scope", description: "Define the player flow, technical ownership, saved data, edge cases, success criteria, and production requirements." },
  { title: "Build", description: "Create an end-to-end version early, then organize the feature into clear client, server, interface, and data responsibilities." },
  { title: "Test", description: "Check validation, exploits, respawns, disconnects, persistence failures, mobile layouts, performance, and interaction edge cases." },
  { title: "Deliver", description: "Clean the code, document configuration and extension points, verify the final build, and hand over a maintainable system." },
];

export const robloxGroups: NetworkItem[] = [
  { name: "Tenasa Games", groupId: "34265738", role: "Founder", description: "Roblox development group for original projects and collaborative production work.", url: "https://www.roblox.com/communities/34265738/Tenasa-Games", cachedImage: assetPath("/assets/cached-media/group-tenasa.webp"), fallback: assetPath("/assets/fallbacks/group-tenasa.svg") },
  { name: "SOL Co.", groupId: "153339776", role: "Main developer", description: "Creative Roblox community with development and systems contributions.", url: "https://www.roblox.com/communities/153339776/SOL-Co", cachedImage: assetPath("/assets/cached-media/group-sol.webp"), fallback: assetPath("/assets/fallbacks/group-sol.svg") },
  { name: "Skydda Concord Studio", groupId: "81081641", role: "Developer", description: "Independent Roblox studio behind collaborative experience development.", url: "https://www.roblox.com/communities/81081641/Skydda-Concord-Studio", cachedImage: assetPath("/assets/cached-media/group-skydda.webp"), fallback: assetPath("/assets/fallbacks/group-skydda.svg") },
  { name: "Corebound Games", groupId: "312003009", role: "Admin", description: "Roblox game studio focused on building and organizing new projects.", url: "https://www.roblox.com/communities/312003009/Corebound-Games", cachedImage: assetPath("/assets/cached-media/group-corebound.webp"), fallback: assetPath("/assets/fallbacks/group-corebound.svg") },
];

export const discordServers: NetworkItem[] = [
  { name: "Summit Developers", inviteCode: "UXsEATcmaa", role: "Pioneer", description: "A Roblox developer community for collaboration, feedback, and technical discussion.", url: "https://discord.gg/UXsEATcmaa", cachedImage: assetPath("/assets/cached-media/discord-summit.webp"), fallback: assetPath("/assets/fallbacks/discord-summit.svg") },
  { name: "Cynex Services", inviteCode: "sAQtQyyS", role: "Founder", description: "The primary server for project inquiries, development updates, and direct contact.", url: "https://discord.gg/sAQtQyyS", cachedImage: assetPath("/assets/cached-media/discord-cynex.webp"), fallback: assetPath("/assets/fallbacks/discord-cynex.svg") },
];

export const reviews: Review[] = [
  { name: "eventpunks", location: "Austria", repeatClient: true, rating: 5, age: "1 year ago", price: "$600-$800", duration: "2 months", quote: "Everything as usual really great." },
  { name: "misterclubs", location: "United States", repeatClient: false, rating: 5, age: "1 year ago", price: "$50-$100", duration: "3 months", quote: "Awesome results, turned out great!" },
  { name: "eventpunks", location: "Austria", repeatClient: true, rating: 5, age: "1 year ago", price: "$200-$400", duration: "2 weeks", quote: "Everything fine." },
  { name: "lotteryshot", location: "United States", repeatClient: false, rating: 5, age: "1 year ago", price: "$100-$200", duration: "10 days", quote: "Went beyond and helped with extra work, excellent and fair." },
  { name: "hafizrenal", location: "Indonesia", repeatClient: false, rating: 5, age: "1 year ago", price: "Up to $50", duration: "1 day", quote: "Great working with Nath. They were professional, responsive, and delivered outstanding results. Highly recommend!" },
  { name: "skyebsu", location: "United Kingdom", repeatClient: true, rating: 5, age: "2 years ago", price: "$50-$100", duration: "3 weeks", quote: "Pays keen attention to detail, extremely good at scripting, very quick to respond!" },
  { name: "eventpunks", location: "Austria", repeatClient: true, rating: 5, age: "2 years ago", price: "Up to $50", duration: "2 days", quote: "Everything was done as discussed. I really appreciate his willingness to do quality work." },
  { name: "togodumnus", location: "United Kingdom", repeatClient: true, rating: 5, age: "2 years ago", price: "Up to $50", duration: "1 day", quote: "Nathaniel solved a problem I had for a while. I am very pleased with the service provided." },
  { name: "loaf_bread", location: "Philippines", repeatClient: false, rating: 5, age: "2 years ago", price: "Up to $50", duration: "6 days", quote: "He fulfilled all of my requests, provided valuable ideas, and promptly resolved minor issues. I highly recommend his services." },
];
