import { PLANTS } from "@/data/plants";
import type { Plant } from "@/data/types";

// Data-layer seam. Reads from static content now; will fetch from Supabase
// later without changing these signatures, so the UI stays decoupled from the
// source.

export async function getAllPlants(): Promise<Plant[]> {
  return PLANTS;
}

export async function getPlant(slug: string): Promise<Plant | null> {
  return PLANTS.find((p) => p.slug === slug) ?? null;
}

export async function getPlantSlugs(): Promise<string[]> {
  return PLANTS.map((p) => p.slug);
}
