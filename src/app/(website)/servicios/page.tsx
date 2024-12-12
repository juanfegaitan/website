import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { ServicesListSection } from "@/components/services-list";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadServicesPage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadServicesPage();

  return _generateMetadata(data.seo);
}

export default async function Services() {
  const { data } = await loadServicesPage();

  return (
    <div className="flex flex-col gap-4 py-16">
      <h1 className="text-4xl  font-bold text-center">{data.title}</h1>

      <Suspense>
        <ServicesListSection />
      </Suspense>

      <Suspense fallback={<HeroSkeleton />}>
        <Hero load={Singletons.SERVICES} />
      </Suspense>

      <Suspense>
        <Sections load={Singletons.SERVICES} />
      </Suspense>
    </div>
  );
}
