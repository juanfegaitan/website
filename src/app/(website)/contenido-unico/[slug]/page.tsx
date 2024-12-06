import { Button } from "@/components/button";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { _generateMetadata, resolveHref, urlForImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadBlog, loadBlogPage, loadBlogPostsByPage, loadTotalPosts } from "@/sanity/loader/loadQuery";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Share = dynamic(
  () => import("@/components/post/share").then((mod) => mod.Share),
  { ssr: false },
);

type Props = {
  params: { slug: string };
  searchParams: { page: string | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadBlog(params.slug);

  return _generateMetadata({
    description: page?.seo?.description ?? page?.content,
    image: page?.seo?.image ?? page?.image?.image,
    title: page?.seo?.title ?? page?.title,
  });
}

export function generateStaticParams() {
  return generateStaticSlugs("post");
}

function BlogListingSkeleton() {
  return (
    <div className="py-8">
      <div className="space-y-8">
        {Array(3).fill(null).map((_, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
            <Skeleton className="w-full md:w-1/2 aspect-[16/9] rounded-lg" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {Array(7).fill(null).map((_, index) => (
            <Skeleton key={index} className="w-10 h-10 rounded-md" />
          ))}
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

type BlogListingProps = {
  slug: string;
  currentPage?: string;
};

function generatePageNumbers(total: number, perPage: number) {
  const pageCount = Math.ceil(total / perPage);
  return Array.from({ length: pageCount }, (_, i) => i + 1);
}


function getPageNumber(page: string | undefined, totalItems: number = 0, itemsPerPage: number = 10) {
  // Calculate the maximum page number
  const maxPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Convert page to a number if it's a string
  let pageNumber = Number(page);

  // If it's not a valid number or not an integer, default to page 1
  if (isNaN(pageNumber) || !Number.isInteger(pageNumber)) {
    pageNumber = 1;
  }

  // If it's less than 1, set to 1
  if (pageNumber < 1) {
    pageNumber = 1;
  }

  // If it's more than the max page, set to max page
  if (pageNumber > maxPage) {
    pageNumber = maxPage;
  }

  return pageNumber;
}

const PER_PAGE = 3;

async function BlogListing({ slug, currentPage: currentPageProp }: BlogListingProps) {

  const total = await loadTotalPosts(slug)

  const { data: blogPage } = await loadBlogPage();

  const currentPage = getPageNumber(currentPageProp, total.data, PER_PAGE);

  const data = await loadBlogPostsByPage(currentPage, PER_PAGE, slug)

  const articles = data.data

  const pageNumbers = generatePageNumbers(total.data, PER_PAGE);

  return (
    <div className="py-8">
      <div className="space-y-8">
        {articles?.map((article, index) => {
          const image = article?.image?.image;

          const imageUrl =
            image && urlForImage(image)?.url();

          const href = resolveHref(article._type, article.slug)?.replace(
            "/blog",
            `/${blogPage?.slug ?? "blog"}`,
          );

          if (!imageUrl || !href) return null;

          return (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-full md:w-2/5 aspect-video">
                <Image
                  src={imageUrl}
                  alt="Beach scene with coconut drink"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover rounded-lg"
                  blurDataURL={image.asset?.metadata?.lqip}
                  placeholder="blur"
                  quality={100}
                />
              </div>
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">{article.title}</h2>

                <p className="text-muted-foreground">{toPlainText(article.content).slice(0, 250)}...</p>

                <Button variant="default" className="group" asChild>
                  <Link href={href}>
                    Seguir leyendo
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {pageNumbers.map((page) => (
            <Button
              key={page}
              size="sm"
              className={cn("w-10 h-10 aria-[disabled=true]:pointer-events-none", {
                "bg-secondary text-secondary-foreground": page === currentPage,
                'bg-white text-primary hover:bg-primary hover:text-white': page !== currentPage
              })}
              asChild
              aria-disabled={page === currentPage}
            >
              <Link href={`/${blogPage?.slug ?? "blog"}/${slug}?page=${page}`} scroll={false}>
                {page}
              </Link>
            </Button>
          ))}
        </div>
        <Button variant="secondary" size="lg" asChild className="mt-6">
          <Link href={`/${blogPage?.slug ?? "blog"}`}>
            Ver todas las publicaciones
          </Link>
        </Button>
      </div>
    </div>
  )
}


export default async function BlogDetail({ params, searchParams }: Props) {
  const { data: blog } = await loadBlog(params.slug);

  const image =
    blog?.image?.image &&
    urlForImage(blog.image.image)?.width(1200).height(450).fit("crop").url();

  return (
    <div className="flex flex-col gap-4 py-16">
      {image && (
        <Image
          src={image}
          width={1200}
          height={450}
          alt={blog?.image?.alt ?? "blog"}
          placeholder="blur"
          blurDataURL={blog?.image?.image?.asset.metadata.lqip}
          className="object-cover w-full aspect-square lg:aspect-[16/6] rounded-2xl"
          quality={100}
          priority
        />
      )}

      <div className="mx-auto max-w-6xl">
        <div className="text-4xl font-bold text-left mt-8">
          {blog?.title}
        </div>

        <Share post={blog} />

        <div className="mt-12">
          <CustomPortableText value={blog?.content as any} />
        </div>

        <div className="mt-12">
          <Suspense fallback={<BlogListingSkeleton />}>
            <BlogListing slug={params.slug} currentPage={searchParams.page} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
