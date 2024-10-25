import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { PostsSection } from "@/components/posts";
import { Sections } from "@/components/sections";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadBlogPage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadBlogPage();

  return _generateMetadata(data.seo);
}

export default function Blog() {
  return (
    <div className="flex flex-col gap-4 py-16">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero load={Singletons.BLOG} />
      </Suspense>

      <Suspense>
        <PostsSection />
      </Suspense>

      <Suspense>
        <Sections load={Singletons.BLOG} />
      </Suspense>
    </div>
  );
}
