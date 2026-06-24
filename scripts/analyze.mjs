import { readFile } from "node:fs/promises";
const c = JSON.parse(await readFile(new URL("../src/data/catalog.generated.json", import.meta.url)));
const empty = c.filter((x) => !x.image);
const hosts = {}, exts = {};
for (const x of c) {
  if (!x.image) continue;
  const u = new URL(x.image);
  hosts[u.host] = (hosts[u.host] || 0) + 1;
  const m = u.pathname.toLowerCase().match(/\.([a-z0-9]+)$/);
  const e = m ? m[1] : "none";
  exts[e] = (exts[e] || 0) + 1;
}
console.log("total:", c.length, "| empty:", empty.length);
console.log("hosts:", hosts);
console.log("exts:", exts);
console.log("empty slugs:", empty.map((x) => x.slug).join(", "));
