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

export async function getCatalogCards(): Promise<PlantCard[]> {
  return ALL.map((p) => ({
    slug: p.slug,
    commonName: p.commonName,
    scientificName: p.scientificName,
    kind: p.kind,
    image: p.image,
    rarity: p.rarity ?? "common",
    edible: p.edibility?.status,
    hasBook: details.has(p.slug),
  })).sort((a, b) => a.commonName.localeCompare(b.commonName));
}
