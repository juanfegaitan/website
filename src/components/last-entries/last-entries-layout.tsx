"use client";
import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { BlogPagePayload, LastEntriesSection, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: LastEntriesSection | null;
  lastEntries?: Post[];
  blogPage?: BlogPagePayload | null;
};

export function LastEntriesSectionLayout({
  data,
  lastEntries,
  blogPage,
}: Props) {
  if (!data) return null;

  return (
    <section className="bg-white py-12 w-full full-width">
      <div className="text-4xl text-center">{data.title} </div>
      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}
      <div className="main_container mt-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4 md:-ml-8">
            {lastEntries?.map((post) => {
              const image = post?.image?.image;

              const imageUrl =
                image &&
                urlForImage(image)?.height(220).width(420).fit("crop").url();

              const href = resolveHref(post._type, post.slug)?.replace(
                "/blog",
                `/${blogPage?.slug ?? "blog"}`,
              );

              if (!imageUrl || !href) return null;

              return (
                <CarouselItem
                  key={post._id}
                  className="basis-3/4 lg:basis-1/3 pl-4 md:pl-8 flex flex-col items-center gap-4 text-center"
                >
                  <Link href={href}>
                    <div className="relative w-full rounded-2xl overflow-hidden aspect-video">
                      <Image
                        src={imageUrl}
                        fill
                        alt={post.title}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        blurDataURL={image.asset?.metadata?.lqip}
                        placeholder="blur"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="font-medium text-xl mt-6">
                        {post.title}
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
