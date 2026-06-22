// Branches map to topics, leaves to facts. The same structure drives both the
// rendered layout and the information hierarchy.

export type Tier = "free" | "pro";

export type Rarity = "common" | "uncommon" | "rare" | "endangered";

// Drives the shape of generated foliage so each species reads as itself.
export type LeafStyle = "broadleaf" | "lobed" | "frond" | "needle";

export interface Leaf {
  id: string;
  field: string; // e.g. "Habitat", "Lifespan"
  value: string; // the fact revealed on hover/focus
  tier: Tier; // a single leaf can be Pro-only
}

export interface Branch {
  id: string;
  /** Degrees relative to the parent branch. 0 = straight up. */
  angle: number;
  /** Length relative to the canvas (0–1). */
  length: number;
  children: Branch[];
  leaves: Leaf[];
}

export interface TreeStructure {
  trunk: Branch;
}

export interface ImageCredit {
  author: string;
  license: string;
  sourceUrl: string;
}

export type Edibility = "edible" | "caution" | "toxic" | "inedible";

export interface EdiblePart {
  part: string; // e.g. "Acorns", "Leaves", "Fruit"
  safe: "yes" | "no" | "caution";
  note: string;
}

export interface EdibilityInfo {
  status: Edibility;
  summary: string;
  parts: EdiblePart[];
}

export interface Plant {
  slug: string;
  commonName: string;
  scientificName: string;
  rarity: Rarity;
  accent: string; // species glow hue, used across the cinematic treatment
  foliage: string; // base leaf colour for the anatomy diagram
  bark: string;
  leafStyle: LeafStyle;
  /** Portrait under /public/plants/<slug>.jpg */
  image: string;
  credit: ImageCredit;
  edibility: EdibilityInfo;
  taxonomy: { family: string; genus: string; species: string };
  summary: string;
  structure: TreeStructure;
}

// Rare and endangered species are Pro-only.
export function plantTier(p: Pick<Plant, "rarity">): Tier {
  return p.rarity === "rare" || p.rarity === "endangered" ? "pro" : "free";
}

// The facts shown as leaf cards, flattened from the branch structure.
export function allLeaves(plant: Plant): Leaf[] {
  const out: Leaf[] = [];
  const walk = (b: Branch) => {
    out.push(...b.leaves);
    b.children.forEach(walk);
  };
  walk(plant.structure.trunk);
  return out;
}
