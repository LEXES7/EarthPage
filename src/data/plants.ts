import type { Plant } from "./types";

// Sample species. These move to Supabase later behind the same getPlant() seam.

const englishOak: Plant = {
  slug: "english-oak",
  commonName: "English Oak",
  scientificName: "Quercus robur",
  tier: "free",
  accent: "#7CFFB2", // emerald glow
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
  tier: "free",
  accent: "#8FE3FF", // cool cyan glow
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

export const PLANTS: Plant[] = [englishOak, ladyFern];
