import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { ResourcesSection } from "@/components/resources";
import { Sections } from "@/components/sections";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadResourcePage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadResourcePage();

  return _generateMetadata(data.seo);
}

export default async function Resources() {
  const { data } = await loadResourcePage();

  return (
    <div className="flex flex-col gap-4 py-16">
      <h1 className="text-4xl  font-bold text-center">{data.title}</h1>

      <Suspense fallback={<HeroSkeleton />}>
        <Hero load={Singletons.RESOURCES} />
      </Suspense>

      <Suspense>
        <ResourcesSection />
      </Suspense>

      <Suspense>
        <Sections load={Singletons.RESOURCES} />
      </Suspense>
    </div>
  );
}
