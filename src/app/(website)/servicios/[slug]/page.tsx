import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Cta } from "@/components/cta";
import { Sections } from "@/components/sections";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { _generateMetadata, urlForImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadService } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import Image from "next/image";
import { Suspense } from "react";
// const PagePreview = dynamic(
//   () => import("@/components/pages/page/PagePreview"),
// );

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadService(params.slug);

  return _generateMetadata(page?.seo);
}

export function generateStaticParams() {
  return generateStaticSlugs("service");
}

export default async function ServicePage({ params }: Props) {
  const initial = await loadService(params.slug);

  // if (draftMode().isEnabled) {
  //   return <PagePreview params={params} initial={initial} />;
  // }

  if (!initial.data) {
    notFound();
  }

  const image =
    initial.data.image && urlForImage(initial.data.image.image)?.url();

  return (
    <div className="py-16">
      <h1 className="text-title font-bold text-center mb-12">
        {initial.data.title}
      </h1>

      <section className="flex flex-col gap-12 lg:flex-row lg:gap-12 items-center">
        <div className="w-full lg:w-1/2 relative aspect-video overflow-hidden rounded-lg">
          {image && (
            <Image
              className="object-cover w-full h-full"
              src={image}
              blurDataURL={initial.data.image?.image?.asset.metadata.lqip}
              placeholder={
                initial.data.image?.image?.asset.metadata.lqip
                  ? "blur"
                  : "empty"
              }
              fill
              alt={initial.data.title || ""}
            />
          )}
        </div>
        <div className="w-full lg:w-1/2">
          {/* Body */}
          {initial.data.description && (
            <div className="mx-auto w-full max-w-4xl">
              <CustomPortableText
                paragraphClasses="font-serif text-gray-600 text-xl xm"
                value={initial.data.description as any}
              />
            </div>
          )}

          {!!initial.data.cta && <Cta className="mt-4" {...initial.data.cta} />}
        </div>
      </section>

      {initial.data.sections && (
        <div className="absolute left-0 w-screen border-t my-14" />
      )}

      {initial.data.sections && (
        <div className="mt-14">
          <Suspense>
            <Sections load={Singletons.SERVICE} slug={params.slug} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
