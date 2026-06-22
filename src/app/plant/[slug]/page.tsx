import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlant, getPlantSlugs } from "@/lib/plants";
import PlantBook from "@/components/PlantBook";

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
    openGraph: { images: [plant.image] },
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
    <main className="mx-auto w-full max-w-5xl px-5 py-10">
      <Link href="/" className="text-sm text-white/40 transition hover:text-white/70">
        ← The garden
      </Link>
      <div className="mt-6">
        <PlantBook plant={plant} />
      </div>
    </main>
  );
}
