/**
 * NEXUS REALM - Master Gaming Platform Data Store
 */

const NEXUS_DATA = {
  brand: {
    name: "NEXUS",
    suffix: "REALM",
    tagline: "ENTER THE NEXT LEVEL",
    subtitle: "The ultimate competitive gaming sanctuary. Discover next-gen titles, compete in global esports tournaments, and forge your legacy among the world's elite.",
    stats: {
      activePlayers: "2,480,920",
      activeTournaments: "148",
      totalPrizePool: "$6,850,000",
      globalUptime: "99.98%"
    }
  },

  games: [
    {
      id: "cyber-odyssey-2099",
      title: "Cyber Odyssey: 2099",
      subtitle: "Neon Shadows Over Neo-Kyoto",
      genre: "Action RPG",
      category: "rpg",
      platforms: ["PC", "PS5", "Xbox Series X"],
      rating: 4.9,
      metacritic: 94,
      releaseDate: "2026-03-15",
      developer: "NeuroByte Studios",
      publisher: "Nexus Interactive",
      price: "$69.99",
      isFree: false,
      badge: "Trending",
      featured: true,
      trending: true,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Immerse yourself in Neo-Kyoto, a towering vertical megacity divided between corporate overlords and chrome-augmented street syndicates. As Kaelen Vance, a rogue neural hacker harboring a catastrophic artificial consciousness, navigate corporate intrigue, tactical cyberware warfare, and lethal augmented combat.",
      features: [
        "Unreal Engine 5.5 photorealistic hyper-density city rendering with full path tracing",
        "Over 85 unique neural cyberware implants with custom combat skill trees",
        "Non-linear branching narrative featuring 12 divergent faction endings",
        "High-octane vehicular combat and aerial hover-chases through skyline highways",
        "Seamless cooperative campaign with drop-in cyber-raid missions"
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 11 64-bit",
          processor: "Intel Core i5-12400F / AMD Ryzen 5 5600X",
          memory: "16 GB RAM",
          graphics: "NVIDIA GeForce RTX 3060 12GB / AMD Radeon RX 6700 XT",
          directX: "Version 12 Ultimate",
          storage: "110 GB NVMe SSD"
        },
        recommended: {
          os: "Windows 11 64-bit (Latest Build)",
          processor: "Intel Core i7-14700K / AMD Ryzen 7 7800X3D",
          memory: "32 GB DDR5 6000MHz",
          graphics: "NVIDIA GeForce RTX 4080 Super / AMD Radeon RX 7900 XTX",
          directX: "Version 12 Ultimate",
          storage: "110 GB Gen4 NVMe SSD"
        }
      },
      tags: ["Cyberpunk", "Open World", "Ray Tracing", "Deep RPG", "Story Rich"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "valkyrie-protocol",
      title: "Valkyrie Protocol",
      subtitle: "Tactical 5v5 Tactical Espionage",
      genre: "Tactical FPS",
      category: "fps",
      platforms: ["PC"],
      rating: 4.8,
      metacritic: 91,
      releaseDate: "2025-11-10",
      developer: "Vanguard Tactics",
      publisher: "Nexus Esports",
      price: "Free to Play",
      isFree: true,
      badge: "Popular",
      featured: true,
      trending: true,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1612287232918-368178663677?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Precision gunplay meets tactical quantum abilities in Valkyrie Protocol. Squads of five elite operatives compete in high-stakes defusal and extraction scenarios across destructible global battlegrounds with sub-tick 128Hz server infrastructure.",
      features: [
        "Sub-tick 128-tick tournament tier dedicated server netcode",
        "24 unique operatives with tactical gadgets, recon drones, and EMP tech",
        "Micro-destruction engine allowing dynamic sightlines and breaches",
        "Integrated anti-cheat kernel shield and ranked ladder system",
        "Official Esports circuit backed with millions in global prizes"
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 10/11 64-bit",
          processor: "Intel Core i3-10100 / AMD Ryzen 3 3300X",
          memory: "8 GB RAM",
          graphics: "GTX 1650 4GB / RX 5500 XT",
          directX: "Version 12",
          storage: "45 GB SSD"
        },
        recommended: {
          os: "Windows 11 64-bit",
          processor: "Intel Core i5-13600K / AMD Ryzen 7 5700X",
          memory: "16 GB DDR4/DDR5",
          graphics: "RTX 3070 8GB / RX 6800",
          directX: "Version 12",
          storage: "45 GB NVMe SSD"
        }
      },
      tags: ["Tactical FPS", "Esports", "Competitive", "Hero Shooter", "Fast-Paced"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "elden-abyss",
      title: "Elden Abyss: Void Reborn",
      subtitle: "Dark Fantasy Soulslike Masterpiece",
      genre: "Dark Fantasy Action",
      category: "action",
      platforms: ["PC", "PS5", "Xbox Series X"],
      rating: 4.95,
      metacritic: 97,
      releaseDate: "2026-01-20",
      developer: "Grimstone Forge",
      publisher: "Nexus Publishing",
      price: "$69.99",
      isFree: false,
      badge: "GOTY Nominee",
      featured: true,
      trending: true,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Tread the desiccated remains of the Shattered Heavens. Face colossal eldritch gods, master fluid parry combat, and wield primordial celestial sorcery in a punishing yet profoundly rewarding gothic action-RPG.",
      features: [
        "Brutal, deliberate stamina & poise combat with 14 distinct martial styles",
        "Breathtaking interconnected dark gothic open world with vertical citadels",
        "Over 65 terrifying bosses with multi-phase orchestrations",
        "Dynamic day-night eclipse cycle altering enemy mutations and hidden realms",
        "Asynchronous multiplayer bloodstains, phantoms, and arena dueling"
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 11 64-bit",
          processor: "Intel Core i5-10400 / AMD Ryzen 5 3600",
          memory: "16 GB RAM",
          graphics: "RTX 2060 6GB / RX 5700",
          directX: "Version 12",
          storage: "90 GB SSD"
        },
        recommended: {
          os: "Windows 11 64-bit",
          processor: "Intel Core i7-13700 / AMD Ryzen 7 7700X",
          memory: "32 GB RAM",
          graphics: "RTX 4070 Ti / RX 7800 XT",
          directX: "Version 12",
          storage: "90 GB NVMe SSD"
        }
      },
      tags: ["Dark Fantasy", "Soulslike", "Hardcore", "Atmospheric", "Boss Battles"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "stellar-apex",
      title: "Stellar Apex: Void Command",
      subtitle: "Galactic Space Fleet Simulation",
      genre: "Sci-Fi Space Sim",
      category: "scifi",
      platforms: ["PC", "PS5"],
      rating: 4.7,
      metacritic: 89,
      releaseDate: "2026-02-14",
      developer: "AstroDynamics",
      publisher: "Nexus Interactive",
      price: "$59.99",
      isFree: false,
      badge: "New",
      featured: true,
      trending: false,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Command massive dreadnought armadas, establish interstellar mining colonies, and engage in tactical dogfights across 4,000 uncharted planetary star systems.",
      features: [
        "Newtonian flight physics and 1:1 scale star system generation",
        "Full capital ship modular customization and interior exploration",
        "Dynamic galactic economy driven by player supply chains",
        "Massive fleet wars supporting up to 500 simultaneous pilots"
      ],
      systemRequirements: {
        minimum: { os: "Windows 11 64-bit", processor: "i5-11600K", memory: "16 GB", graphics: "RTX 3060", directX: "12", storage: "80 GB SSD" },
        recommended: { os: "Windows 11 64-bit", processor: "i7-14700K", memory: "32 GB", graphics: "RTX 4080", directX: "12", storage: "80 GB NVMe" }
      },
      tags: ["Space Sim", "Open Galaxy", "Sci-Fi", "Multiplayer", "Strategy"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "hyper-overdrive-gt",
      title: "Hyper Overdrive GT",
      subtitle: "Anti-Gravity Neon Street Racing",
      genre: "Hyper Racing",
      category: "racing",
      platforms: ["PC", "PS5", "Xbox Series X", "Switch"],
      rating: 4.85,
      metacritic: 92,
      releaseDate: "2025-09-30",
      developer: "Velocity Forge",
      publisher: "Nexus Publishing",
      price: "$49.99",
      isFree: false,
      badge: "Trending",
      featured: false,
      trending: true,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Reach speeds over 800 KM/H on gravity-defying tracks suspended over radioactive canyons and pulsing neon mega-cities. Customize mag-lev hypercars with energy boosts and slipstream drafting.",
      features: [
        "True 120 FPS high-refresh rate physics engine",
        "Dynamic electronica soundtrack synced to speed and boosting",
        "Over 40 customizable magnetic hypercars and weaponized chassis",
        "Cross-platform 16-player online ranked grand prix"
      ],
      systemRequirements: {
        minimum: { os: "Windows 10/11", processor: "Ryzen 5 3600", memory: "16 GB", graphics: "GTX 1660 Ti", directX: "12", storage: "50 GB" },
        recommended: { os: "Windows 11", processor: "Ryzen 7 5800X3D", memory: "32 GB", graphics: "RTX 4070", directX: "12", storage: "50 GB NVMe" }
      },
      tags: ["Racing", "Anti-Gravity", "Fast-Paced", "Synthwave", "Multiplayer"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "mecha-strike-prime",
      title: "Mecha Strike: Prime",
      subtitle: "Titan Warfare Simulator",
      genre: "Mech Action",
      category: "action",
      platforms: ["PC", "PS5", "Xbox Series X"],
      rating: 4.6,
      metacritic: 88,
      releaseDate: "2026-04-05",
      developer: "IronCore Labs",
      publisher: "Nexus Interactive",
      price: "$59.99",
      isFree: false,
      badge: "New",
      featured: false,
      trending: true,
      popular: false,
      coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Step into the cockpit of 50-ton bipedal war engines. Construct your chassis from hundreds of components, balance reactor heat, and dominate planetary skirmishes.",
      features: [
        "Deep mechanical customization: Armor alloys, jump jets, rail cannons",
        "Comprehensive cockpit VR and triple-monitor ultrawide support",
        "Destructible terrain and atmospheric weather conditions",
        "Co-op raid defense missions against rogue planetary defense networks"
      ],
      systemRequirements: {
        minimum: { os: "Windows 11", processor: "i5-11400", memory: "16 GB", graphics: "RTX 2070", directX: "12", storage: "70 GB" },
        recommended: { os: "Windows 11", processor: "i7-13700K", memory: "32 GB", graphics: "RTX 4080", directX: "12", storage: "70 GB NVMe" }
      },
      tags: ["Mechs", "Action", "Simulation", "Robots", "Co-op"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "wasteland-exile",
      title: "Wasteland Exile: Surviving 2084",
      subtitle: "Hardcore Post-Nuclear Survival",
      genre: "Survival Sandbox",
      category: "survival",
      platforms: ["PC"],
      rating: 4.75,
      metacritic: 90,
      releaseDate: "2025-08-18",
      developer: "Rust & Bone Games",
      publisher: "Nexus Publishing",
      price: "$39.99",
      isFree: false,
      badge: "Popular",
      featured: false,
      trending: false,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Scavenge irradiated ruins, construct fortified underground bunkers, and battle toxic weather phenomena in an unforgiving persistence multiplayer sandbox.",
      features: [
        "Realistic metabolism, radiation poisoning, and injury systems",
        "Modular fortress construction with electric circuitry and automated turrets",
        "Player-driven server economies, bandit clans, and trade outposts",
        "Dynamic seasons with brutal radioactive dust storms and freezing winters"
      ],
      systemRequirements: {
        minimum: { os: "Windows 10/11", processor: "Ryzen 5 2600", memory: "16 GB", graphics: "GTX 1070", directX: "12", storage: "60 GB" },
        recommended: { os: "Windows 11", processor: "Ryzen 7 5800X", memory: "32 GB", graphics: "RTX 3080", directX: "12", storage: "60 GB NVMe" }
      },
      tags: ["Survival", "Open World", "Crafting", "Multiplayer", "Post-apocalyptic"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "shadow-blade-ronin",
      title: "Shadow Blade: Ronin Zero",
      subtitle: "Cyber-Samurai Stealth Infiltration",
      genre: "Stealth Action",
      category: "action",
      platforms: ["PC", "PS5", "Xbox Series X"],
      rating: 4.9,
      metacritic: 95,
      releaseDate: "2025-12-05",
      developer: "Kitsune Arts",
      publisher: "Nexus Interactive",
      price: "$59.99",
      isFree: false,
      badge: "Editor's Choice",
      featured: true,
      trending: true,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Become the ultimate cybernetic blade in feudal-futuristic Neo-Edo. Move like liquid shadow, deflect supersonic kinetic fire with mono-molecular katanas, and dismantle the corrupt Shogunate Council.",
      features: [
        "Lightning-fast sword combat with millisecond deflection physics",
        "Acrobatic wall-running, grappling hook swings, and optic camouflage",
        "Stunning watercolor-cyberpunk hybrid visual aesthetic",
        "Deep stealth gameplay with light/shadow detection mechanics"
      ],
      systemRequirements: {
        minimum: { os: "Windows 11", processor: "i5-12400", memory: "16 GB", graphics: "RTX 3060", directX: "12", storage: "65 GB" },
        recommended: { os: "Windows 11", processor: "i7-14700", memory: "32 GB", graphics: "RTX 4070 Ti", directX: "12", storage: "65 GB NVMe" }
      },
      tags: ["Stealth", "Ninja", "Action", "Cyberpunk", "Singleplayer"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "aegis-legends",
      title: "Aegis Legends: Battlegrounds",
      subtitle: "High-Flying Cyber Battle Royale",
      genre: "Battle Royale",
      category: "fps",
      platforms: ["PC", "PS5", "Xbox Series X"],
      rating: 4.7,
      metacritic: 89,
      releaseDate: "2025-07-12",
      developer: "Stormfront Studios",
      publisher: "Nexus Esports",
      price: "Free to Play",
      isFree: true,
      badge: "Popular",
      featured: false,
      trending: true,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Drop into floating sky islands, harness kinetic thrusters, and compete in squads of three to claim the Aegis Core in an evolving 60-player arena.",
      features: [
        "Unrivaled 3D aerial mobility with vertical jump pads and ziplines",
        "Signature ultimate abilities and team synergistic combo ultimates",
        "Ranked seasonal leagues with exclusive tournament invitations",
        "Zero pay-to-win, 100% cosmetic battle pass ecosystem"
      ],
      systemRequirements: {
        minimum: { os: "Windows 10/11", processor: "i5-10400", memory: "16 GB", graphics: "GTX 1660", directX: "12", storage: "55 GB" },
        recommended: { os: "Windows 11", processor: "i7-13700", memory: "16 GB", graphics: "RTX 3070", directX: "12", storage: "55 GB NVMe" }
      },
      tags: ["Battle Royale", "Multiplayer", "Hero Shooter", "Fast Action"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    },
    {
      id: "chronos-protocol",
      title: "Chronos Protocol: Rewind",
      subtitle: "Time-Bending Co-op Puzzle Shooter",
      genre: "Sci-Fi Puzzle",
      category: "scifi",
      platforms: ["PC", "PS5"],
      rating: 4.88,
      metacritic: 93,
      releaseDate: "2026-02-28",
      developer: "Paradox Loop",
      publisher: "Nexus Interactive",
      price: "$34.99",
      isFree: false,
      badge: "New",
      featured: false,
      trending: false,
      popular: true,
      coverImage: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=80",
      heroBanner: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1920&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80"
      ],
      synopsis: "Manipulate temporal flow alongside a friend. Rewind bullet trajectories, clone past actions across parallel time loops, and solve mind-bending quantum dilemmas.",
      features: [
        "Groundbreaking physics engine capable of local temporal rewinds",
        "Mandatory 2-player cooperative campaign with synchronous mechanics",
        "Mind-stretching level designs and paradoxical puzzle solutions",
        "Original electronic synth score by legendary game composers"
      ],
      systemRequirements: {
        minimum: { os: "Windows 11", processor: "Ryzen 5 3600", memory: "16 GB", graphics: "RTX 2060", directX: "12", storage: "35 GB" },
        recommended: { os: "Windows 11", processor: "Ryzen 7 5700X", memory: "16 GB", graphics: "RTX 3070", directX: "12", storage: "35 GB SSD" }
      },
      tags: ["Co-op", "Time Manipulation", "Puzzle", "Sci-Fi", "Clever"],
      trailerYoutubeId: "dQw4w9WgXcQ"
    }
  ],

  tournaments: [
    {
      id: "cyber-masters-invitational-2026",
      name: "Cyber Masters Invitational 2026",
      gameId: "valkyrie-protocol",
      gameTitle: "Valkyrie Protocol",
      banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
      prizePool: "$250,000",
      entryFee: "Free (Qualifiers)",
      startDate: "2026-11-15",
      endDate: "2026-11-22",
      status: "Upcoming",
      badgeColor: "cyan",
      registeredTeams: 48,
      maxTeams: 64,
      region: "Global (Online / Finals in Seoul)",
      format: "5v5 Double Elimination",
      countdownTarget: "Nov 15, 2026 18:00:00 GMT+0000",
      description: "The pinnacle of tactical gunplay. 64 elite squads duel for global supremacy and a $250,000 championship purse.",
      prizes: [
        { rank: "1st Place", prize: "$120,000 + Nexus Aegis Trophy" },
        { rank: "2nd Place", prize: "$60,000" },
        { rank: "3rd Place", prize: "$35,000" },
        { rank: "4th Place", prize: "$15,000" },
        { rank: "5th-8th", prize: "$5,000 each" }
      ],
      rules: [
        "All players must be at least 16 years of age with verified Nexus accounts.",
        "Anti-Cheat Vanguard Client must be running with hardware TPM 2.0 active.",
        "Match format: Best of 3 for Group Stage, Best of 5 for Grand Finals.",
        "Default server tickrate: 128Hz with official tournament rule set."
      ],
      schedule: [
        { phase: "Open Qualifiers", date: "Nov 15 - 16", info: "Single elimination bracket, top 16 advance" },
        { phase: "Group Stage", date: "Nov 18 - 19", info: "GSL Format, best of 3 matches" },
        { phase: "Grand Finals", date: "Nov 22", info: "Live broadcast from Seoul Esports Arena" }
      ]
    },
    {
      id: "apex-warzone-clash",
      name: "Apex Warzone Clash: Season 5",
      gameId: "aegis-legends",
      gameTitle: "Aegis Legends",
      banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      prizePool: "$100,000",
      entryFee: "$25 / Squad",
      startDate: "2026-10-28",
      endDate: "2026-10-31",
      status: "Live",
      badgeColor: "red",
      registeredTeams: 96,
      maxTeams: 100,
      region: "North America & Europe",
      format: "Trios Battle Royale Points Race",
      countdownTarget: "Oct 28, 2026 20:00:00 GMT+0000",
      description: "High-octane sky battle royale. Points awarded for team placements and kill count multipliers across 6 gruelling rounds.",
      prizes: [
        { rank: "1st Place", prize: "$50,000 + Custom Gold Champion Skins" },
        { rank: "2nd Place", prize: "$25,000" },
        { rank: "3rd Place", prize: "$15,000" },
        { rank: "Kill Leader", prize: "$10,000 Bounty" }
      ],
      rules: [
        "Squad size: 3 players strictly registered before tournament lock.",
        "All players must stream their point of view with 30s delay or join discord observer.",
        "Tie-breaker criteria: Total kills, then highest placement in final match."
      ],
      schedule: [
        { phase: "Day 1: NA Lobby", date: "Oct 28", info: "6 matches, top 10 advance" },
        { phase: "Day 2: EU Lobby", date: "Oct 29", info: "6 matches, top 10 advance" },
        { phase: "Day 3: Super Finals", date: "Oct 31", info: "20 squad ultimate championship" }
      ]
    },
    {
      id: "neo-velocity-cup",
      name: "Neo Velocity Grand Prix 2026",
      gameId: "hyper-overdrive-gt",
      gameTitle: "Hyper Overdrive GT",
      banner: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
      prizePool: "$50,000",
      entryFee: "Free",
      startDate: "2026-11-05",
      endDate: "2026-11-08",
      status: "Upcoming",
      badgeColor: "purple",
      registeredTeams: 124,
      maxTeams: 128,
      region: "Global",
      format: "Solo Time Trials & 8-Car Heats",
      countdownTarget: "Nov 05, 2026 15:00:00 GMT+0000",
      description: "Gravity-defying high-speed competition. Navigate hairpin turns, lethal boost pads, and obstacle tracks at 800+ KM/H.",
      prizes: [
        { rank: "1st Place", prize: "$25,000 + Real Hypercar Experience Day" },
        { rank: "2nd Place", prize: "$12,500" },
        { rank: "3rd Place", prize: "$7,500" },
        { rank: "4th Place", prize: "$5,000" }
      ],
      rules: [
        "Standardized car engine tiers (Class-S Maglev chassis only).",
        "Collision penalty enabled: Intentional wall-riding exploits disqualify immediately."
      ],
      schedule: [
        { phase: "Solo Qualifiers", date: "Nov 05", info: "Top 32 fastest lap times qualify" },
        { phase: "Semi-Final Heats", date: "Nov 07", info: "4 heats of 8 pilots" },
        { phase: "Grand Finals", date: "Nov 08", info: "8 pilots, 5 grueling championship tracks" }
      ]
    },
    {
      id: "elden-pvp-colosseum",
      name: "Elden Abyss: Colosseum of Gods",
      gameId: "elden-abyss",
      gameTitle: "Elden Abyss: Void Reborn",
      banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      prizePool: "$75,000",
      entryFee: "$10",
      startDate: "2026-12-01",
      endDate: "2026-12-04",
      status: "Upcoming",
      badgeColor: "cyan",
      registeredTeams: 210,
      maxTeams: 256,
      region: "Global",
      format: "1v1 Dueling Tournament (Level 125 Meta)",
      countdownTarget: "Dec 01, 2026 17:00:00 GMT+0000",
      description: "No healing flasks. No cheap exploits. Pure skill, poise timing, parries, and devastating celestial combos in the ancient arena.",
      prizes: [
        { rank: "1st Place", prize: "$35,000 + 'God of the Abyss' Title" },
        { rank: "2nd Place", prize: "$20,000" },
        { rank: "3rd Place", prize: "$12,000" },
        { rank: "4th Place", prize: "$8,000" }
      ],
      rules: [
        "Character Level strictly capped at Level 125.",
        "Crimson tears flasks banned during duels.",
        "Round duration: 3 minutes. Highest HP percentage wins on timeout."
      ],
      schedule: [
        { phase: "Round of 256", date: "Dec 01", info: "Best of 3 duels" },
        { phase: "Round of 64", date: "Dec 02", info: "Best of 3 duels" },
        { phase: "Top 8 Finals", date: "Dec 04", info: "Best of 5 championship matches" }
      ]
    },
    {
      id: "nexus-brawl-masters-2025",
      name: "Nexus Brawl Masters Invitational",
      gameId: "mecha-strike-prime",
      gameTitle: "Mecha Strike: Prime",
      banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      prizePool: "$80,000",
      entryFee: "Free",
      startDate: "2026-09-10",
      endDate: "2026-09-14",
      status: "Completed",
      badgeColor: "purple",
      registeredTeams: 32,
      maxTeams: 32,
      region: "Global",
      format: "3v3 Titan Skirmish",
      countdownTarget: "Sep 10, 2026 12:00:00 GMT+0000",
      description: "Heavy ordnance, reactor overloads, and tactical coordination. Won by Team CyberPhantom in an epic 3-2 comeback.",
      prizes: [
        { rank: "Champion: Team CyberPhantom", prize: "$45,000" },
        { rank: "Runner-up: Kurogane Elite", prize: "$20,000" },
        { rank: "3rd: Aegis Vanguard", prize: "$10,000" }
      ],
      rules: [
        "Squad size: 3 Titans per team.",
        "Reactor heat penalties active."
      ],
      schedule: [
        { phase: "Completed", date: "Sep 14, 2026", info: "Tournament concluded successfully" }
      ]
    }
  ],

  news: [
    {
      id: "cyber-odyssey-patch-3-launch",
      title: "Cyber Odyssey: 2099 Patch 3.2 'Neon Uprising' Drops With Ray Tracing Overhaul",
      summary: "Explore the new underground district of Neo-Kyoto with 14 fresh story quests, full path tracing performance upgrades, and neural weapon modding.",
      category: "Patch Notes",
      categoryBadge: "cyan",
      author: "Marcus 'Vex' Chen",
      authorRole: "Lead Tech Journalist",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      publishedAt: "2026-10-18",
      readTime: "5 min read",
      heroImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      content: `
        <p class="lead">NeuroByte Studios has officially deployed update 3.2 for <em>Cyber Odyssey: 2099</em>, bringing one of the most substantial free content expansions since the game's record-breaking spring release.</p>

        <h3>Welcome to The Deep Sump</h3>
        <p>The centerpiece of update 3.2 is 'The Deep Sump'—a previously locked sub-level beneath Neo-Kyoto's neon skyscrapers. Inhabited by outcasts and rogue bio-engineers, this zone introduces 14 fully voiced story quests, three new neural implants, and the sinister 'Chroma Syndicate' faction.</p>

        <blockquote>
          "Our ambition with Patch 3.2 was not just to add more missions, but to push real-time lighting fidelity to what players will expect from next-generation hardware in the late 2020s," says Game Director Elena Rostova.
        </blockquote>

        <h3>Next-Generation Path Tracing Optimization</h3>
        <p>Owners of modern RTX and RDNA hardware will notice a dramatic improvement in framerate stability with Path Tracing enabled. Thanks to the integration of Neural Reconstruction 3.0, the game achieves up to 42% higher average frame rates in rainy neon city corridors.</p>

        <div class="article-callout">
          <h4>Key Highlights in Update 3.2:</h4>
          <ul>
            <li><strong>New District:</strong> 'The Deep Sump' featuring 14 branching narrative missions.</li>
            <li><strong>Weapon Crafting:</strong> 8 brand-new modular plasma weaponry archetypes.</li>
            <li><strong>Neural Cyberware:</strong> 'Phantom Dash' ability allowing short-range quantum phase blinking.</li>
            <li><strong>Audio Engineering:</strong> Dolby Atmos spatial audio re-mastering for pinpoint spatial footsteps.</li>
          </ul>
        </div>

        <h3>Competitive PvP Arena Preview</h3>
        <p>NeuroByte also confirmed that a dedicated 3v3 cyberware duel arena mode is currently in closed alpha testing and will debut ahead of the Nexus Winter Championship in December.</p>
      `,
      comments: [
        {
          id: "c1",
          author: "NeonDrifter_99",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
          date: "Yesterday at 14:22",
          text: "The path tracing improvements are insane! Gained 25 FPS on my 4080 at 4K. The Deep Sump atmosphere is pure Blade Runner vibes."
        },
        {
          id: "c2",
          author: "ValkyrieQueen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          date: "Yesterday at 18:05",
          text: "That Phantom Dash implant completely changes high-speed gunplay. Loving the mobility!"
        }
      ]
    },
    {
      id: "nexus-championship-2026-announced",
      title: "Nexus Global Esports Circuit Expands With $6.8M Total Season Prize Pool",
      summary: "New cities, dedicated 128-tick tournament networks, and expanded collegiate leagues highlight the colossal 2026-2027 competitive gaming calendar.",
      category: "Esports",
      categoryBadge: "purple",
      author: "Samantha Torres",
      authorRole: "Esports Director",
      authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
      publishedAt: "2026-10-15",
      readTime: "4 min read",
      heroImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      content: `
        <p class="lead">Nexus Gaming has unveiled the complete roadmap for its record-setting 2026 esports season, boasting over $6,850,000 in guaranteed tournament payouts across four flagship titles.</p>
        <p>The Grand Finals will travel across three continents, with major arena stops in Tokyo, Berlin, and Los Angeles. Competitors will battle across <em>Valkyrie Protocol</em>, <em>Aegis Legends</em>, <em>Hyper Overdrive GT</em>, and <em>Elden Abyss</em>.</p>
        <blockquote>"Esports is no longer a niche entertainment segment; it is the premier sports culture of our generation," stated Nexus CEO Alexander Vance.</blockquote>
      `,
      comments: [
        {
          id: "c3",
          author: "GhostReconX",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
          date: "3 days ago",
          text: "Can't wait for the Tokyo arena stop! Flying out with my squad."
        }
      ]
    },
    {
      id: "next-gen-gpu-benchmarks-revealed",
      title: "Next-Gen Gaming Hardware: RTX 50-Series Real-World Architecture Deep Dive",
      summary: "How quantum-accelerated neural tensor pipelines are transforming real-time path tracing, physics simulation, and 240Hz competitive response times.",
      category: "Hardware",
      categoryBadge: "red",
      author: "Dr. Aris Thorne",
      authorRole: "Hardware Architect",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      publishedAt: "2026-10-11",
      readTime: "7 min read",
      heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      content: `
        <p class="lead">We got hands-on with next-generation silicon architectures. Here is how modern silicon is pushing high-fidelity gaming into uncharted territory.</p>
        <p>With sub-millisecond frame generation and hardware-accelerated volumetric lighting, competitive esports titles can now achieve ultra-fluid 240Hz frame rates at true 4K resolution.</p>
      `,
      comments: []
    },
    {
      id: "indie-gaming-renaissance-2026",
      title: "The Indie Studio Revolution: How Boutique Devs Are Out-Innovating AAA Giants",
      summary: "From Chronos Protocol to Void Reborn, smaller passionate teams are capturing the hearts of millions through bold artistic vision and player-first design.",
      category: "Industry",
      categoryBadge: "cyan",
      author: "Maya Lin",
      authorRole: "Indie Spotlight Editor",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      publishedAt: "2026-10-04",
      readTime: "6 min read",
      heroImage: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      content: `
        <p class="lead">The gaming landscape is witnessing a profound shift. Tired of sterile live-service formulas, gamers are rallying behind auteur titles with soul and unmistakable identity.</p>
      `,
      comments: []
    }
  ],

  community: {
    discordMembers: "184,320",
    discordOnline: "42,890",
    topGuilds: [
      { name: "Phantom Vanguard", tag: "[PHTM]", members: 64, wins: 412, rank: 1, emblemColor: "#00f0ff" },
      { name: "Apex Syndicate", tag: "[APEX]", members: 58, wins: 388, rank: 2, emblemColor: "#9333ea" },
      { name: "Ronin Cyberpunk", tag: "[RONN]", members: 50, wins: 365, rank: 3, emblemColor: "#ff0055" },
      { name: "Void Stalkers", tag: "[VOID]", members: 45, wins: 310, rank: 4, emblemColor: "#3b82f6" }
    ],
    threads: [
      {
        id: "t1",
        title: "Best loadout builds for Valkyrie Protocol Season 4 meta?",
        author: "SniperWolf99",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        replies: 84,
        likes: 215,
        category: "Tactics",
        timeAgo: "2 hours ago"
      },
      {
        id: "t2",
        title: "Hidden lore secrets uncovered in Elden Abyss: The Void King's origins",
        author: "LoreMaster_Kael",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
        replies: 142,
        likes: 580,
        category: "Lore & Theory",
        timeAgo: "5 hours ago"
      },
      {
        id: "t3",
        title: "Looking for 2 players for Cyber Masters Qualifier squad (Diamond+ rank)",
        author: "GhostOperator",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        replies: 29,
        likes: 47,
        category: "Recruitment",
        timeAgo: "1 day ago"
      },
      {
        id: "t4",
        title: "Custom mechanical keyboard sound tests for high APM esports gameplay",
        author: "KeyClackHero",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        replies: 67,
        likes: 194,
        category: "Hardware",
        timeAgo: "2 days ago"
      }
    ]
  },

  leaderboard: [
    { rank: 1, gamertag: "Valkyrie_Ghost", tier: "Grandmaster", winRate: "78.4%", kd: "4.82", points: "14,890", mainGame: "Valkyrie Protocol", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80" },
    { rank: 2, gamertag: "ZeroCool_99", tier: "Grandmaster", winRate: "75.1%", kd: "4.45", points: "14,210", mainGame: "Cyber Odyssey", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
    { rank: 3, gamertag: "ShadowKunoichi", tier: "Apex Predator", winRate: "74.8%", kd: "4.30", points: "13,950", mainGame: "Shadow Blade", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
    { rank: 4, gamertag: "TitanSlayer_X", tier: "Apex Predator", winRate: "71.9%", kd: "3.95", points: "13,420", mainGame: "Mecha Strike", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80" },
    { rank: 5, gamertag: "NovaChronos", tier: "Challenger", winRate: "69.5%", kd: "3.75", points: "12,880", mainGame: "Chronos Protocol", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
    { rank: 6, gamertag: "AbyssWalker", tier: "Challenger", winRate: "68.2%", kd: "3.60", points: "12,450", mainGame: "Elden Abyss", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
    { rank: 7, gamertag: "HyperDrifter", tier: "Diamond", winRate: "66.4%", kd: "3.42", points: "11,920", mainGame: "Hyper Overdrive GT", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" }
  ],

  team: [
    {
      name: "Alexander Vance",
      role: "CEO & Co-Founder",
      bio: "Former competitive esports champion turned technology visionary with 18+ years leading gaming ecosystem revolutions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Dr. Elena Rostova",
      role: "Chief Technology Officer",
      bio: "Pioneer in distributed 128Hz sub-tick game engine architecture and neural ray-tracing pipelines.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Kaelen Mercer",
      role: "Head of Design & UX",
      bio: "Award-winning creative director shaping immersive cyberpunk aesthetics and intuitive esports user interfaces.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Marcus Aurelius Chen",
      role: "VP of Esports & Competitions",
      bio: "Organized over 500 major esports stadium tournaments worldwide with flawless zero-downtime execution.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      socials: { twitter: "#", linkedin: "#", github: "#" }
    }
  ],

  faqs: [
    {
      q: "What is Nexus Realm and how does the platform work?",
      a: "Nexus Realm is an integrated next-generation gaming hub uniting premier game discovery, cross-title esports tournament hosting, community forums, and player progress synchronization under a single ultra-responsive platform."
    },
    {
      q: "How do I register for cash-prize tournaments?",
      a: "Simply browse our Tournaments hub, select your game of choice, and click 'Register'. If you are entering a team tournament, you can invite your squad members via their Nexus GamerTag or share an instant squad invite code."
    },
    {
      q: "Are the tournaments free to enter?",
      a: "The majority of our tournaments, including all open qualifier stages for our flagship championships, are 100% free to enter. Specialized community cups and partner brackets may have minimal prize-pool contribution fees clearly shown on the event card."
    },
    {
      q: "How are tournament prize payouts handled?",
      a: "Payouts are automatically verified within 48 hours of match completion and disbursed through bank wire, PayPal, or instant crypto wallet directly to the team captain's verified payout account."
    },
    {
      q: "What anti-cheat systems protect Nexus tournaments?",
      a: "All official competitive brackets utilize our proprietary Nexus Sentinel anti-cheat running kernel-level integrity checks, TPM 2.0 verification, and automated server-side heuristic cheat detection."
    },
    {
      q: "Can I connect my Steam, PlayStation, Xbox, and Discord accounts?",
      a: "Yes! Navigate to your User Profile > Linked Accounts to seamlessly synchronize your game libraries, rank badges, and friends list across all major ecosystems."
    }
  ]
};
