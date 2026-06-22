import type { Plant } from "./types";

// Sample species. These move to Supabase later behind the same getPlant() seam.

const englishOak: Plant = {
  slug: "english-oak",
  commonName: "English Oak",
  scientificName: "Quercus robur",
  rarity: "common",
  accent: "#9bffc4",
  foliage: "#3f9d63",
  bark: "#5a4632",
  leafStyle: "lobed",
  image: "/plants/english-oak.jpg",
  credit: { author: "Llez", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Quercus_robur_002.JPG" },
  edibility: {
    status: "caution",
    summary:
      "Acorns are mildly toxic raw due to tannins, but are edible once shelled and leached in " +
      "water. Foliage and raw acorns are toxic to horses and cattle in quantity.",
    parts: [
      { part: "Acorns (leached)", safe: "yes", note: "Repeated rinsing removes bitter tannins; then ground into flour." },
      { part: "Acorns (raw)", safe: "caution", note: "Bitter and astringent; tannins upset the stomach." },
      { part: "Leaves & bark", safe: "no", note: "Not eaten; high tannin content, toxic to livestock in bulk." },
    ],
  },
  taxonomy: { order: "Fagales", family: "Fagaceae", genus: "Quercus", species: "Q. robur" },
  otherNames: ["Pedunculate oak", "Common oak", "European oak"],
  etymology:
    'From Latin quercus ("oak") and robur ("strength, hard timber"). The English name reflects ' +
    "the tree's long association with Britain.",
  description:
    "The English oak is a massive, long-lived deciduous tree and a keystone of European woodland. " +
    "Its spreading crown, rugged bark and acorn crops have shaped landscapes, folklore and " +
    "shipbuilding for millennia, and it supports more wildlife than almost any other native tree.",
  morphology: {
    height: "Typically 20–30 m, occasionally to 40 m",
    spread: "Broad, rounded crown to ~25 m",
    bark: "Grey-brown, deeply grooved into vertical plates, often burred",
    leaves: "Broadly oblong, 10–12 cm, with 3–6 rounded lobes and small ear-like auricles; nearly stalkless",
    flowers: "Wind-pollinated yellow-green catkins in spring",
    fruit: "Acorns in clusters of 2–3 on long stalks (peduncles), set in shallow cups",
  },
  phenology: { habit: "Deciduous broadleaf tree", flowering: "April–May", fruiting: "Acorns ripen Sep–Oct" },
  distribution: {
    nativeRange: "Most of Europe, extending into western Asia",
    habitat: "High-canopy woodland, wood pasture and hedgerows; tolerates seasonal flooding",
    soil: "Deep, fertile, near-neutral; tolerant of heavy clay",
    climate: "Temperate; full sun, moisture-loving",
  },
  lifespan: "Commonly 500+ years; some exceed 1,000",
  growthRate: "Slow to moderate",
  ecology:
    "Supports more life than almost any other British tree — over 2,300 associated species, " +
    "several hundred of which depend on it alone. Acorns feed jays, squirrels, deer and wild boar.",
  conservation: {
    status: "Least Concern",
    source: "IUCN Red List",
    trend: "Stable",
    threats: ["Acute oak decline", "Oak processionary moth", "Powdery mildew", "Sudden oak death (Phytophthora)"],
  },
  uses: [
    { category: "Timber", note: "Strong, durable heartwood for ships, beams, furniture and barrels." },
    { category: "Culinary", note: "Leached acorns ground into flour or roasted as a coffee substitute." },
    { category: "Medicinal", note: "Tannin-rich bark used historically as an astringent." },
    { category: "Cultural", note: "A national symbol of strength; 'heart of oak' built navies." },
  ],
  cultivation: {
    propagation: "Sow fresh acorns in autumn; large trees transplant poorly.",
    care: "Give deep, moist soil and room for a wide crown in full sun.",
  },
  identification: [
    "Leaf base has small lobes (auricles)",
    "Acorns on long stalks (peduncles)",
    "Shallow acorn cups",
    "Leaf undersides lack star-shaped hairs",
  ],
  lookAlikes: [
    { name: "Sessile oak (Quercus petraea)", distinguish: "Acorns stalkless; leaves on longer stalks without auricles." },
  ],
  facts: [
    "Its genome (~26,000 genes) was sequenced in 2016.",
    "England has more ancient oaks than the rest of Europe combined.",
    "Some European oaks may be over 1,000 years old.",
  ],
  references: [
    { label: "Wikipedia — Quercus robur", url: "https://en.wikipedia.org/wiki/Quercus_robur" },
    { label: "Woodland Trust — English oak", url: "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/english-oak/" },
  ],
  summary:
    "A long-lived deciduous tree native to Europe, the English oak supports more " +
    "biodiversity than almost any other native tree.",
  structure: {
    trunk: {
      id: "trunk",
      angle: 0,
      length: 0.26,
      leaves: [],
      children: [
        {
          id: "b-left",
          angle: -34,
          length: 0.2,
          leaves: [
            { id: "l-habitat", field: "Habitat", value: "Lowland woodland & hedgerows across Europe.", tier: "free" },
          ],
          children: [
            {
              id: "b-left-1",
              angle: -28,
              length: 0.15,
              leaves: [
                { id: "l-leaf", field: "Foliage", value: "Lobed leaves, almost stalkless, in clusters.", tier: "free" },
                { id: "l-soil", field: "Soil", value: "Prefers deep, fertile, well-drained clay.", tier: "pro" },
              ],
              children: [],
            },
            {
              id: "b-left-2",
              angle: 22,
              length: 0.14,
              leaves: [
                { id: "l-lifespan", field: "Lifespan", value: "Commonly 500+ years; some exceed 1,000.", tier: "free" },
              ],
              children: [],
            },
          ],
        },
        {
          id: "b-mid",
          angle: 4,
          length: 0.22,
          leaves: [
            { id: "l-fruit", field: "Fruit", value: "Acorns on long stalks (hence 'pedunculate oak').", tier: "free" },
          ],
          children: [
            {
              id: "b-mid-1",
              angle: -18,
              length: 0.14,
              leaves: [
                { id: "l-eco", field: "Ecology", value: "Hosts 2,300+ species; 326 depend on it alone.", tier: "pro" },
              ],
              children: [],
            },
          ],
        },
        {
          id: "b-right",
          angle: 32,
          length: 0.2,
          leaves: [
            { id: "l-uses", field: "Uses", value: "Timber for ships, barrels, and beams for centuries.", tier: "free" },
          ],
          children: [
            {
              id: "b-right-1",
              angle: 26,
              length: 0.15,
              leaves: [
                { id: "l-bark", field: "Bark", value: "Rugged, deeply fissured grey-brown bark.", tier: "free" },
                { id: "l-tannin", field: "Chemistry", value: "Bark rich in tannins, historically used to cure leather.", tier: "pro" },
              ],
              children: [],
            },
          ],
        },
      ],
    },
  },
};

const ladyFern: Plant = {
  slug: "lady-fern",
  commonName: "Lady Fern",
  scientificName: "Athyrium filix-femina",
  rarity: "uncommon",
  accent: "#aef3ff",
  foliage: "#49b38f",
  bark: "#3f6d52",
  leafStyle: "frond",
  image: "/plants/lady-fern.jpg",
  credit: { author: "MPF", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Athyrium_filix-femina0.jpg" },
  edibility: {
    status: "toxic",
    summary:
      "Best treated as not edible. Like many ferns it contains thiaminase and trace carcinogenic " +
      "compounds; young fiddleheads have been eaten historically but are not recommended.",
    parts: [
      { part: "Fronds", safe: "no", note: "Mature fronds contain thiaminase, which destroys vitamin B1." },
      { part: "Fiddleheads", safe: "caution", note: "Occasionally eaten cooked, but safety is not established." },
    ],
  },
  taxonomy: { order: "Polypodiales", family: "Athyriaceae", genus: "Athyrium", species: "A. filix-femina" },
  otherNames: ["Common lady-fern", "Female fern"],
  etymology:
    'The epithet filix-femina means "female fern", historically contrasted with the sturdier ' +
    '"male fern" (Dryopteris filix-mas). Athyrium alludes to the variable spore-case covers.',
  description:
    "A graceful, deciduous fern of damp woodland, the lady fern forms an elegant shuttlecock of " +
    "finely divided fronds. Like all ferns it bears no flowers or seeds, reproducing instead by " +
    "spores carried on the undersides of its leaves.",
  morphology: {
    height: "Fronds 20–90 cm, in a clump",
    spread: "Clump-forming, ~60–90 cm across",
    leaves: "Lacy, light yellow-green fronds, two to three times divided (bipinnate–tripinnate)",
    flowers: "None — a non-flowering fern",
    fruit: "None; spores held in kidney-covered sori beneath the fronds",
  },
  phenology: { habit: "Deciduous fern (herbaceous perennial)", fruiting: "Spores ripen Jul–Sep" },
  distribution: {
    nativeRange: "Temperate Europe, Asia, North America and North Africa",
    habitat: "Damp, shady woodland, stream banks and ditches",
    soil: "Moist, humus-rich, slightly acidic",
    climate: "Cool temperate; very cold-hardy (below −20 °C)",
  },
  lifespan: "Perennial; clumps persist for many years",
  growthRate: "Moderate; dies back each winter",
  ecology:
    "Forms lush understorey cover in wet woods, sheltering invertebrates and amphibians and " +
    "helping hold streamside soils. Spreads by wind-blown spores.",
  conservation: {
    status: "Secure (not threatened)",
    source: "NatureServe (G5)",
    threats: ["Loss and drainage of wet woodland"],
  },
  uses: [
    { category: "Ornamental", note: "Widely grown in shade gardens; several cultivars hold the RHS Award of Garden Merit." },
    { category: "Culinary", note: "Young fiddleheads have been eaten cooked, though this is not recommended." },
    { category: "Medicinal", note: "Used in folk medicine; not in modern clinical use." },
  ],
  cultivation: {
    propagation: "By spores, or by dividing established clumps in spring.",
    care: "Keep soil reliably moist in shade; mulch and remove old fronds.",
  },
  identification: [
    "Fronds divided three times into a lacy outline",
    "Clump / shuttlecock habit, not creeping",
    "Kidney-shaped covers over the sori beneath",
    "Often a reddish frond stalk (stipe)",
  ],
  lookAlikes: [
    { name: "Male fern (Dryopteris filix-mas)", distinguish: "Coarser, less divided fronds; round sori; more upright." },
  ],
  facts: [
    "Now often split into three separate species.",
    "Among the commonest woodland ferns of the north temperate zone.",
    "Reproduces by dust-like spores rather than seeds.",
  ],
  references: [
    { label: "Wikipedia — Athyrium filix-femina", url: "https://en.wikipedia.org/wiki/Athyrium_filix-femina" },
    { label: "USDA Forest Service — Lady fern", url: "https://www.fs.usda.gov/wildflowers/plant-of-the-week/athyrium_filix-femina.shtml" },
  ],
  summary:
    "A delicate, feathery fern of damp woodlands, reproducing by spores rather than seeds.",
  structure: {
    trunk: {
      id: "trunk",
      angle: 0,
      length: 0.3,
      leaves: [{ id: "l-form", field: "Form", value: "Lacy, twice-divided fronds in a shuttlecock.", tier: "free" }],
      children: [
        {
          id: "f-l",
          angle: -40,
          length: 0.22,
          leaves: [{ id: "l-habitat", field: "Habitat", value: "Shaded, moist woodland and streamsides.", tier: "free" }],
          children: [],
        },
        {
          id: "f-r",
          angle: 40,
          length: 0.22,
          leaves: [{ id: "l-repro", field: "Reproduction", value: "Spores in sori on the frond undersides.", tier: "pro" }],
          children: [],
        },
        {
          id: "f-m",
          angle: 0,
          length: 0.26,
          leaves: [{ id: "l-range", field: "Range", value: "Across the temperate Northern Hemisphere.", tier: "free" }],
          children: [],
        },
      ],
    },
  },
};

const dragonBlood: Plant = {
  slug: "dragons-blood-tree",
  commonName: "Dragon's Blood Tree",
  scientificName: "Dracaena cinnabari",
  rarity: "endangered",
  accent: "#ff9d7a",
  foliage: "#5fa86a",
  bark: "#6b4a3a",
  leafStyle: "needle",
  image: "/plants/dragons-blood-tree.jpg",
  credit: { author: "Boris Khvostichenko", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Socotra_dragon_tree.JPG" },
  edibility: {
    status: "inedible",
    summary:
      "Not a food plant. Its famous red resin is used as a dye, varnish and traditional medicine, " +
      "not as an ingredient.",
    parts: [
      { part: "Resin", safe: "no", note: "Used topically and as dye/medicine; not eaten." },
      { part: "Leaves", safe: "no", note: "Tough, fibrous; no culinary use." },
    ],
  },
  taxonomy: { order: "Asparagales", family: "Asparagaceae", genus: "Dracaena", species: "D. cinnabari" },
  otherNames: ["Socotra dragon tree"],
  etymology:
    'The epithet cinnabari refers to cinnabar, the vermilion mineral — for the blood-red resin. ' +
    '"Dragon\'s blood" comes from the ancient belief that the resin was the blood of dragons.',
  description:
    "Found only on the island of Socotra, this otherworldly tree raises a dense, upturned " +
    "umbrella of branches on a stout trunk. Cut or wounded, it bleeds a deep red resin — " +
    "'dragon's blood' — prized since antiquity as dye, varnish and medicine.",
  morphology: {
    height: "Up to ~9 m",
    spread: "Umbrella crown to ~12 m",
    bark: "Smooth and grey over a thick, water-storing trunk",
    leaves: "Stiff, sword-like, to 60 cm, in dense rosettes at the branch tips; shed every 3–4 years",
    flowers: "Small, fragrant white-green clusters, around March",
    fruit: "Fleshy berries ripening orange-red, with 1–4 bird-dispersed seeds",
  },
  phenology: { habit: "Evergreen monocot tree", flowering: "Around March (variable)", fruiting: "Berries mature over following months" },
  distribution: {
    nativeRange: "Endemic to the Socotra archipelago, Yemen",
    habitat: "Arid limestone plateaus and mountains",
    soil: "Poor, shallow, well-drained",
    climate: "Hot and arid; depends on mist and monsoon moisture",
  },
  lifespan: "Slow-growing and long-lived; age is hard to gauge (no true rings)",
  growthRate: "Very slow",
  ecology:
    "An 'umbrella species': its dense crown shades seedlings and combs moisture from passing mist " +
    "to water the ground beneath — a linchpin of Socotra's unique ecosystem.",
  conservation: {
    status: "Vulnerable",
    source: "IUCN Red List",
    trend: "Declining",
    threats: ["Aridification (up to ~45% habitat loss projected by 2080)", "Overgrazing", "Poor regeneration", "Logging and development"],
  },
  uses: [
    { category: "Resin", note: "'Dragon's blood' used as dye, varnish (including for violins) and folk medicine." },
    { category: "Cultural", note: "Historically traded around the Mediterranean; used in ritual and cosmetics." },
    { category: "Material", note: "Leaves worked into rope by Socotrans." },
  ],
  cultivation: {
    propagation: "From seed; extremely slow to establish.",
    care: "Needs heat, sharp drainage and very little water; frost-tender.",
  },
  identification: [
    "Upturned umbrella crown of densely forking branches",
    "Blood-red resin from cuts and ripe berries",
    "Leaves only at the branch tips",
    "A tree-form monocot with unusual secondary thickening",
  ],
  lookAlikes: [
    { name: "Canary Islands dragon tree (Dracaena draco)", distinguish: "D. cinnabari is endemic to Socotra with a flatter, denser umbrella crown." },
  ],
  facts: [
    "One of only a handful of Dracaena that grow as trees.",
    "A relict of ancient subtropical forests that once spanned the region.",
    "Its red resin was a valued trade good in the ancient world.",
  ],
  references: [
    { label: "Wikipedia — Dracaena cinnabari", url: "https://en.wikipedia.org/wiki/Dracaena_cinnabari" },
    { label: "IUCN Red List — Dracaena cinnabari", url: "https://www.iucnredlist.org/species/30428/9548491" },
  ],
  summary:
    "Endemic to Socotra, this umbrella-crowned tree bleeds a deep red resin once prized as " +
    "dragon's blood. Slow growth and a drying climate now threaten it.",
  structure: {
    trunk: {
      id: "trunk",
      angle: 0,
      length: 0.24,
      leaves: [],
      children: [
        {
          id: "d-l",
          angle: -42,
          length: 0.18,
          leaves: [{ id: "l-resin", field: "Resin", value: "Red sap, 'dragon's blood', used in dye and medicine.", tier: "pro" }],
          children: [
            { id: "d-l1", angle: -30, length: 0.13, leaves: [{ id: "l-endemic", field: "Range", value: "Found only on Socotra, Yemen.", tier: "pro" }], children: [] },
            { id: "d-l2", angle: 20, length: 0.12, leaves: [], children: [] },
          ],
        },
        {
          id: "d-m",
          angle: 2,
          length: 0.2,
          leaves: [{ id: "l-crown", field: "Crown", value: "Dense upturned umbrella that funnels mist to the roots.", tier: "pro" }],
          children: [
            { id: "d-m1", angle: -16, length: 0.13, leaves: [{ id: "l-status", field: "Status", value: "Vulnerable; regeneration is failing as Socotra dries.", tier: "pro" }], children: [] },
          ],
        },
        {
          id: "d-r",
          angle: 40,
          length: 0.18,
          leaves: [{ id: "l-growth", field: "Growth", value: "Extremely slow; ages by branching events, not rings.", tier: "pro" }],
          children: [
            { id: "d-r1", angle: 28, length: 0.13, leaves: [], children: [] },
          ],
        },
      ],
    },
  },
};

const wollemiPine: Plant = {
  slug: "wollemi-pine",
  commonName: "Wollemi Pine",
  scientificName: "Wollemia nobilis",
  rarity: "rare",
  accent: "#9bf0c0",
  foliage: "#2f7d57",
  bark: "#4a3f33",
  leafStyle: "needle",
  image: "/plants/wollemi-pine.jpg",
  credit: { author: "Amanda Slater", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Wollemi_Pine.jpg" },
  edibility: {
    status: "inedible",
    summary:
      "An ornamental and conservation conifer with no food use. As a protected, critically " +
      "endangered species it must not be foraged.",
    parts: [
      { part: "Foliage", safe: "no", note: "Not edible; grown ornamentally and for conservation." },
      { part: "Cones / seeds", safe: "no", note: "Not used as food; the wild population is legally protected." },
    ],
  },
  taxonomy: { order: "Araucariales", family: "Araucariaceae", genus: "Wollemia", species: "W. nobilis" },
  otherNames: ["Wollemi pine (not a true pine)"],
  etymology:
    "The genus Wollemia is named for Wollemi National Park, where it was found; the epithet " +
    "nobilis honours David Noble, its discoverer, and nods to the tree's noble stature.",
  description:
    "A 'living fossil' conifer known from fossils long before a living stand was found in 1994. " +
    "Fewer than 100 mature trees survive in a secret Australian gorge, making it one of the " +
    "rarest trees on Earth — yet it is now grown worldwide to secure its future.",
  morphology: {
    height: "25–40 m",
    spread: "Often multi-stemmed, with up to ~100 stems",
    bark: "Dark brown and bubbly, likened to chocolate breakfast cereal",
    leaves: "Flat, linear, 3–8 cm, lime-green maturing darker, held in twisted ranks",
    flowers: "None — a conifer; reproduces by cones",
    fruit: "Green female cones 6–12 cm; slender reddish-brown male cones",
  },
  phenology: { habit: "Evergreen coniferous tree", fruiting: "Female cones mature over 18–20 months" },
  distribution: {
    nativeRange: "Endemic to a few gorges in Wollemi National Park, New South Wales, Australia",
    habitat: "Sheltered, moist sandstone gorges within temperate rainforest",
    soil: "Moist, sheltered, sandstone-derived",
    climate: "Temperate; hardy from roughly −5 to 45 °C",
  },
  lifespan: "Long-lived; individuals possibly 500–1,000 years",
  growthRate: "Fairly fast in good conditions (to ~8 m in 14 years)",
  ecology:
    "One of just three living genera of the ancient Araucariaceae. A genetic bottleneck left the " +
    "entire wild population almost identical, so it is studied as a window into deep plant history.",
  conservation: {
    status: "Critically Endangered",
    source: "IUCN Red List",
    trend: "Fewer than 100 mature wild trees",
    threats: ["Phytophthora root rot", "Bushfire", "Genetic bottleneck", "Illegal collection"],
  },
  uses: [
    { category: "Horticulture", note: "Sold worldwide since 2015 — a deliberate strategy to ease pressure on the wild trees." },
    { category: "Conservation", note: "Grown in botanic gardens globally as an insurance population." },
    { category: "Cultural", note: "Promoted in Australia as a living Christmas tree." },
  ],
  cultivation: {
    propagation: "From cuttings and seed; commercially available since 2015.",
    care: "Grow in containers or sheltered gardens; tolerates a wide temperature range.",
  },
  identification: [
    "Bubbly, dark-brown 'Coco Pops' bark",
    "Flat linear leaves in twisted ranks",
    "Multi-stemmed, coppicing habit",
    "Waxy white cap protecting winter buds",
  ],
  lookAlikes: [
    { name: "Other Araucariaceae (Araucaria, Agathis)", distinguish: "Wollemi has soft flat leaf ranks and uniquely bubbly bark." },
  ],
  facts: [
    "Discovered in 1994 by David Noble — previously known only from fossils.",
    "Its exact wild location is kept secret to protect it.",
    "Survived the 2019–20 bushfires thanks to a covert firefighting operation.",
  ],
  references: [
    { label: "Wikipedia — Wollemia", url: "https://en.wikipedia.org/wiki/Wollemia" },
    { label: "Royal Botanic Gardens, Kew — Wollemi pine", url: "https://www.kew.org/plants/wollemi-pine" },
  ],
  summary:
    "A 'living fossil' conifer thought extinct until 1994, when fewer than 100 were found in a " +
    "single Australian gorge. Its location is kept secret.",
  structure: {
    trunk: {
      id: "trunk",
      angle: 0,
      length: 0.34,
      leaves: [{ id: "l-fossil", field: "Lineage", value: "A relict lineage dating back ~90 million years.", tier: "pro" }],
      children: [
        {
          id: "w-l",
          angle: -30,
          length: 0.2,
          leaves: [{ id: "l-discover", field: "Discovery", value: "Found in 1994 in Wollemi National Park, Australia.", tier: "pro" }],
          children: [
            { id: "w-l1", angle: -22, length: 0.14, leaves: [{ id: "l-count", field: "Population", value: "Fewer than 100 mature trees in the wild.", tier: "pro" }], children: [] },
          ],
        },
        {
          id: "w-r",
          angle: 30,
          length: 0.2,
          leaves: [{ id: "l-bark2", field: "Bark", value: "Distinctive bubbly bark, likened to chocolate.", tier: "pro" }],
          children: [
            { id: "w-r1", angle: 24, length: 0.14, leaves: [{ id: "l-secret", field: "Protection", value: "Exact wild location is a guarded secret.", tier: "pro" }], children: [] },
          ],
        },
      ],
    },
  },
};

export const PLANTS: Plant[] = [englishOak, ladyFern, dragonBlood, wollemiPine];
