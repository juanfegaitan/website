import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import type { PagePayload } from "@/types";
import { Suspense } from "react";

export interface PageProps {
  data: PagePayload | null;
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, seo, title } = data ?? {};

  return (
    <div>
      <div className="mb-14">
        {/* Header */}
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={body as any}
          />
        )}
      </div>
      <div className="absolute left-0 w-screen border-t" />

      <Suspense>
        <Sections />
      </Suspense>
    </div>
  );
}

export default Page;
