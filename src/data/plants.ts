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
  taxonomy: { family: "Fagaceae", genus: "Quercus", species: "Q. robur" },
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
  taxonomy: { family: "Athyriaceae", genus: "Athyrium", species: "A. filix-femina" },
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
  taxonomy: { family: "Asparagaceae", genus: "Dracaena", species: "D. cinnabari" },
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
  taxonomy: { family: "Araucariaceae", genus: "Wollemia", species: "W. nobilis" },
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
