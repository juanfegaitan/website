import { BgHero } from "@/components/bg-hero";
import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadCoursePage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadCoursePage();

  return _generateMetadata(data.seo);
}

export default function Course() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<HeroSkeleton />}>
        <BgHero load={Singletons.COURSE} className="lg:aspect-[16/4]" />
      </Suspense>

      <Suspense fallback={<HeroSkeleton />}>
        <Hero load={Singletons.COURSE} />
      </Suspense>

      <Suspense>
        <Sections load={Singletons.COURSE} />
      </Suspense>
    </div>
  );
}
