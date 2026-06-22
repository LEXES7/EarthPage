// Branches map to topics, leaves to facts. The same structure drives both the
// rendered layout and the information hierarchy.

export type Tier = "free" | "pro";

export type Rarity = "common" | "uncommon" | "rare" | "endangered";

export type PlantKind =
  | "tree"
  | "conifer"
  | "shrub"
  | "fruit"
  | "vegetable"
  | "herb"
  | "flower"
  | "fern"
  | "palm"
  | "succulent"
  | "grass"
  | "climber"
  | "aquatic"
  | "houseplant";

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

export interface Morphology {
  height: string;
  spread?: string;
  bark?: string;
  leaves: string;
  flowers?: string;
  fruit?: string;
}

export interface Phenology {
  habit: string; // e.g. "Deciduous broadleaf tree"
  flowering?: string;
  fruiting?: string;
}

export interface Distribution {
  nativeRange: string;
  habitat: string;
  soil?: string;
  climate?: string;
}

export interface Conservation {
  status: string; // e.g. "Least Concern", "Critically Endangered"
  source?: string; // e.g. "IUCN Red List"
  trend?: string;
  threats: string[];
}

export interface Use {
  category: string; // "Timber", "Culinary", "Medicinal", "Cultural", "Ornamental"
  note: string;
}

export interface LookAlike {
  name: string;
  distinguish: string;
}

export interface Reference {
  label: string;
  url: string;
}

// Core fields exist for every species (catalog); the rest are filled in for
// curated "flagship" species that have a full, sourced record.
export interface Plant {
  slug: string;
  commonName: string;
  scientificName: string;
  kind: PlantKind;
  image: string; // local path or remote URL
  source?: string; // page the image/summary came from (attribution)
  rarity?: Rarity;
  summary?: string; // one-line, for cards and meta
  description?: string; // fuller overview
  accent?: string;
  foliage?: string;
  bark?: string;
  leafStyle?: LeafStyle;
  credit?: ImageCredit;
  taxonomy?: { order?: string; family?: string; genus?: string; species?: string };
  otherNames?: string[];
  etymology?: string;
  morphology?: Morphology;
  phenology?: Phenology;
  distribution?: Distribution;
  lifespan?: string;
  growthRate?: string;
  ecology?: string;
  conservation?: Conservation;
  edibility?: EdibilityInfo;
  uses?: Use[];
  cultivation?: { propagation: string; care: string };
  identification?: string[];
  lookAlikes?: LookAlike[];
  facts?: string[];
  references?: Reference[];
  structure?: TreeStructure;
}

// Rare and endangered species are Pro-only.
export function plantTier(p: Pick<Plant, "rarity">): Tier {
  return p.rarity === "rare" || p.rarity === "endangered" ? "pro" : "free";
}

// The facts shown as leaf cards, flattened from the branch structure.
export function allLeaves(plant: Plant): Leaf[] {
  if (!plant.structure) return [];
  const out: Leaf[] = [];
  const walk = (b: Branch) => {
    out.push(...b.leaves);
    b.children.forEach(walk);
  };
  walk(plant.structure.trunk);
  return out;
}
