import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlant, getPlantSlugs } from "@/lib/plants";
import { plantTier } from "@/data/types";
import { getViewer } from "@/lib/auth";
import { gatePlant } from "@/lib/gate";
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

  const viewer = await getViewer();
  const isProSpecies = plantTier(plant) === "pro";

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10">
      <Link href="/" className="text-sm text-white/40 transition hover:text-white/70">
        ← The garden
      </Link>
      <div className="mt-6">
        {isProSpecies && !viewer.isPro ? (
          <Paywall
            image={plant.image}
            name={plant.commonName}
            scientific={plant.scientificName}
            rarity={plant.rarity}
            summary={plant.summary}
            signedIn={Boolean(viewer.userId)}
          />
        ) : (
          <PlantBook plant={gatePlant(plant, viewer.isPro)} isPro={viewer.isPro} />
        )}
      </div>
    </main>
  );
}

function Paywall({
  image,
  name,
  scientific,
  rarity,
  summary,
  signedIn,
}: {
  image: string;
  name: string;
  scientific: string;
  rarity: string;
  summary: string;
  signedIn: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-white/10">
      <Image
        src={image}
        alt={name}
        width={1200}
        height={800}
        className="h-[420px] w-full object-cover brightness-[0.5] blur-sm"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <span className="rounded-full border border-[#9bffc4]/40 px-3 py-1 text-[10px] uppercase tracking-widest text-[#9bffc4]">
          {rarity} · Pro
        </span>
        <h1 className="mt-4 font-serif text-4xl text-white">{name}</h1>
        <p className="font-serif italic text-white/60">{scientific}</p>
        <p className="mt-4 max-w-md text-sm text-white/70">{summary}</p>
        <p className="mt-6 max-w-sm text-sm text-white/50">
          This is a rare species. Unlock its full book — portrait, field notes, edibility and leaf
          anatomy — with EarthPages Pro.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href={signedIn ? "/account" : "/login"}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            {signedIn ? "Upgrade to Pro" : "Sign in to unlock"}
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition hover:text-white"
          >
            Back to garden
          </Link>
        </div>
      </div>
    </div>
  );
}
