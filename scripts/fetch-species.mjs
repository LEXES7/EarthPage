// Enriches the seed list with a summary and image from Wikipedia, writing
// src/data/catalog.generated.json. Uses the batched MediaWiki API (20 titles
// per request) to stay well within rate limits. Re-runnable.
import { writeFile } from "node:fs/promises";
import { SEED } from "./species-seed.mjs";

const UA = "EarthPagesBot/1.0 (educational plant reference; contact: dev)";
const API = "https://en.wikipedia.org/w/api.php";

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const chunk = (arr, n) => {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
};

async function queryTitles(titles) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "extracts|pageimages",
    exintro: "1",
    explaintext: "1",
    exlimit: "20",
    piprop: "original|thumbnail",
    pithumbsize: "900",
    pilimit: "20",
    redirects: "1",
    titles: titles.join("|"),
  });
  const res = await fetch(`${API}?${params}`, { headers: { "Api-User-Agent": UA, "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const q = json.query ?? {};
  const resolve = (t) => {
    const n = (q.normalized ?? []).find((x) => x.from === t);
    let cur = n ? n.to : t;
    const r = (q.redirects ?? []).find((x) => x.from === cur);
    return r ? r.to : cur;
  };
  const byTitle = new Map(Object.values(q.pages ?? {}).map((p) => [p.title, p]));
  return { resolve, byTitle };
}

// First pass keyed by scientific name; second pass fills misses by common name.
async function passByIndex(records, getTitle, fill) {
  const idxs = records.map((_, i) => i).filter((i) => !records[i].image || !records[i].description);
  for (const batch of chunk(idxs, 20)) {
    const titles = batch.map((i) => getTitle(records[i]));
    try {
      const { resolve, byTitle } = await queryTitles(titles);
      batch.forEach((i, k) => {
        const page = byTitle.get(resolve(titles[k]));
        if (page) fill(records[i], page);
      });
      process.stdout.write("#");
    } catch {
      process.stdout.write("!");
    }
    await new Promise((r) => setTimeout(r, 250));
  }
}

const records = [];
const seen = new Set();
for (const [common, scientific, kind] of SEED) {
  const slug = slugify(common);
  if (seen.has(slug)) continue;
  seen.add(slug);
  records.push({ slug, commonName: common, scientificName: scientific, kind, image: "", source: "", description: "" });
}

const fill = (rec, page) => {
  if (!rec.image) rec.image = page.original?.source || page.thumbnail?.source || "";
  if (!rec.description && page.extract) rec.description = page.extract.split("\n")[0].slice(0, 600);
  if (!rec.source && page.title) rec.source = `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`;
};

await passByIndex(records, (r) => r.scientificName, fill);
await passByIndex(records, (r) => r.commonName, fill);

await writeFile(
  new URL("../src/data/catalog.generated.json", import.meta.url),
  JSON.stringify(records, null, 2) + "\n",
);
console.log(
  `\nwrote ${records.length} species (${records.filter((r) => r.image).length} images, ${records.filter((r) => r.description).length} summaries)`,
);
