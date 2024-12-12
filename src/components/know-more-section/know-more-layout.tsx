"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { KnowMore } from "@/types";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: KnowMore | null;
};

export function KnowMoreSectionLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="bg-gray-200 py-12 mt-24 w-full full-width">
      <div className="text-4xl text-center">{data.title} </div>
      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}
      <div className="main_container mt-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-12">
            {data.gallery?.images.map((image, index) => {
              const imageUrl =
                image?.asset &&
                urlForImage(image)?.width(420).height(420).fit("crop").url();

              if (!imageUrl) return null;

              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-12"
                >
                  <Image
                    src={imageUrl}
                    width={320}
                    height={320}
                    alt={image.alt ?? ""}
                    className="w-full object-cover aspect-video rounded-2.5xl "
                    placeholder="blur"
                    blurDataURL={image.asset.metadata.lqip}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
