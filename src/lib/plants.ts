import catalog from "@/data/catalog.generated.json";
import { FLAGSHIP_DETAILS } from "@/data/plants";
import type { Edibility, Plant, PlantKind, Rarity } from "@/data/types";

// Full library: the generated catalog with flagship records merged over it by slug.
const details = new Map(FLAGSHIP_DETAILS.map((d) => [d.slug, d]));
const ALL: Plant[] = (catalog as unknown as Plant[]).map((base) => {
  const d = details.get(base.slug);
  return d ? { ...base, ...d } : base;
});

export async function getAllPlants(): Promise<Plant[]> {
  return ALL;
}

export async function getPlant(slug: string): Promise<Plant | null> {
  return ALL.find((p) => p.slug === slug) ?? null;
}

export async function getPlantSlugs(): Promise<string[]> {
  return ALL.map((p) => p.slug);
}

// Only flagship species are prerendered at build; the rest render on demand.
export function getFlagshipSlugs(): string[] {
  return FLAGSHIP_DETAILS.map((d) => d.slug);
}

// Slim shape for the garden grid, so we don't ship full records to the client.
export interface PlantCard {
  slug: string;
  commonName: string;
  scientificName: string;
  kind: PlantKind;
  image: string;
  rarity: Rarity;
  edible?: Edibility;
  hasBook: boolean;
}

function toCard(p: Plant): PlantCard {
  return {
    slug: p.slug,
    commonName: p.commonName,
    scientificName: p.scientificName,
    kind: p.kind,
    image: p.image,
    rarity: p.rarity ?? "common",
    edible: p.edibility?.status,
    hasBook: details.has(p.slug),
  };
}

export async function getCatalogCards(): Promise<PlantCard[]> {
  return ALL.map(toCard).sort((a, b) => a.commonName.localeCompare(b.commonName));
}

// Other species of the same kind, for cross-linking between books.
export async function getRelatedCards(slug: string, limit = 6): Promise<PlantCard[]> {
  const current = ALL.find((p) => p.slug === slug);
  if (!current) return [];
  return ALL.filter((p) => p.slug !== slug && p.kind === current.kind && p.image)
    .slice(0, limit)
    .map(toCard);
}
