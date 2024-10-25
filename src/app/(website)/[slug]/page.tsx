import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { _generateMetadata } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadPage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Suspense } from "react";
// const PagePreview = dynamic(
//   () => import("@/components/pages/page/PagePreview"),
// );

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadPage(params.slug);

  return _generateMetadata(page?.seo);
}

export function generateStaticParams() {
  return generateStaticSlugs("page");
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadPage(params.slug);

  // if (draftMode().isEnabled) {
  //   return <PagePreview params={params} initial={initial} />;
  // }

  if (!initial.data) {
    notFound();
  }

  return (
    <div className="py-16">
      <h1 className="text-title font-bold text-center mb-12">
        {initial.data.title}
      </h1>
      {/* Header */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero slug={params.slug} load={Singletons.PAGE} />
      </Suspense>

      {/* Body */}
      {initial.data.body && (
        <div className="mx-auto w-full max-w-4xl">
          <CustomPortableText
            paragraphClasses="text-xl xm"
            value={initial.data.body as any}
          />
        </div>
      )}

      {initial.data.sections && (
        <div className="absolute left-0 w-screen border-t" />
      )}

      {initial.data.sections && (
        <div className="mt-14">
          <Suspense>
            <Sections load={Singletons.PAGE} slug={params.slug} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
