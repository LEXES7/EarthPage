// Branches map to topics, leaves to facts. The same structure drives both the
// rendered layout and the information hierarchy.

export type Tier = "free" | "pro";

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

export interface Plant {
  slug: string;
  commonName: string;
  scientificName: string;
  tier: Tier;
  accent: string; // glow hue (CSS color)
  taxonomy: { family: string; genus: string; species: string };
  summary: string;
  structure: TreeStructure;
}
