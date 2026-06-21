import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlant, getPlantSlugs } from "@/lib/plants";
import PlantTree from "@/components/tree/PlantTree";

export async function generateStaticParams() {
  const slugs = await getPlantSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = await getPlant(slug);
  if (!plant) return {};
  return {
    title: `${plant.commonName} (${plant.scientificName}) — EarthPages`,
    description: plant.summary,
  };
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = await getPlant(slug);
  if (!plant) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <Link href="/" className="text-sm text-white/40 transition hover:text-white/70">
        ← The grove
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <section>
          <PlantTree plant={plant} />
          <p className="mt-6 text-center text-xs text-white/40">
            Hover or tap a leaf to read its fact.
          </p>
        </section>

        <aside className="lg:pt-8">
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
            {plant.tier}
          </span>
          <h1 className="mt-4 text-3xl font-semibold">{plant.commonName}</h1>
          <p className="italic text-white/40">{plant.scientificName}</p>
          <p className="mt-6 text-sm leading-relaxed text-white/70">{plant.summary}</p>

          <dl className="mt-8 space-y-3 text-sm">
            <Row label="Family" value={plant.taxonomy.family} />
            <Row label="Genus" value={plant.taxonomy.genus} />
            <Row label="Species" value={plant.taxonomy.species} />
          </dl>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm font-medium">Pro database</p>
            <p className="mt-1 text-xs text-white/50">
              Some leaves are locked. Pro unlocks the full set of fields and thousands more
              species.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <dt className="text-white/40">{label}</dt>
      <dd className="text-white/80">{value}</dd>
    </div>
  );
}
