import type { Branch, Plant } from "@/data/types";

// Flattens the recursive Branch model into drawable segments and positioned
// leaves. Framework-agnostic so an alternative renderer could reuse it.

export const VIEW = { w: 1000, h: 1000 };
const BASE = { x: 500, y: 985 };
const SCALE = 900; // maps relative branch.length (0–1) to canvas units

export interface Segment {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  depth: number;
}

export interface LeafNode {
  id: string;
  field: string;
  value: string;
  tier: "free" | "pro";
  x: number;
  y: number;
  /** stable index used to stagger the glow animation */
  order: number;
}

export interface TreeLayout {
  segments: Segment[];
  leaves: LeafNode[];
}

const deg2rad = (d: number) => (d * Math.PI) / 180;

export function layoutPlant(plant: Plant): TreeLayout {
  const segments: Segment[] = [];
  const leaves: LeafNode[] = [];
  let leafOrder = 0;

  function walk(branch: Branch, start: { x: number; y: number }, absAngle: number, depth: number) {
    const angle = absAngle + branch.angle;
    const len = branch.length * SCALE;
    const rad = deg2rad(angle);
    const end = {
      x: start.x + len * Math.sin(rad),
      y: start.y - len * Math.cos(rad), // up is negative y
    };

    segments.push({ id: branch.id, x1: start.x, y1: start.y, x2: end.x, y2: end.y, depth });

    // Fan leaves out around the branch tip so they don't overlap.
    branch.leaves.forEach((leaf, i) => {
      const spread = (i - (branch.leaves.length - 1) / 2) * 26;
      const lr = deg2rad(angle + spread);
      const off = 34;
      leaves.push({
        id: leaf.id,
        field: leaf.field,
        value: leaf.value,
        tier: leaf.tier,
        x: end.x + off * Math.sin(lr),
        y: end.y - off * Math.cos(lr),
        order: leafOrder++,
      });
    });

    branch.children.forEach((child) => walk(child, end, angle, depth + 1));
  }

  walk(plant.structure.trunk, BASE, 0, 0);
  return { segments, leaves };
}

/** Stroke width tapers as branches get further from the trunk. */
export function strokeFor(depth: number): number {
  return Math.max(2, 16 - depth * 4);
}
