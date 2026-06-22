import type { Branch, Plant } from "@/data/types";

// Strips Pro-only facts before they reach the browser. Locked leaves keep their
// field (so the UI can show the lock) but lose their value. Combined with the
// paywall on Pro species, locked content is never sent to non-Pro clients.
export function gatePlant(plant: Plant, isPro: boolean): Plant {
  if (isPro || !plant.structure) return plant;

  const redact = (b: Branch): Branch => ({
    ...b,
    leaves: b.leaves.map((l) => (l.tier === "pro" ? { ...l, value: "" } : l)),
    children: b.children.map(redact),
  });

  return { ...plant, structure: { trunk: redact(plant.structure.trunk) } };
}
