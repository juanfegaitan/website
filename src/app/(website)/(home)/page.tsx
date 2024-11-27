import { BgHero } from "@/components/bg-hero";
import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data: homePage } = await loadHomePage();

  return _generateMetadata(homePage.seo);
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<HeroSkeleton />}>
        <BgHero load={Singletons.HOME} />
      </Suspense>

      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <Suspense>
        <Sections />
      </Suspense>
    </div>
  );
}
