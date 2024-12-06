"use client";

import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { Hero } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../carousel";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  hero?: Hero;
};

export function HeroLayout({ hero }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
  }, [api]);

  if (!hero?.slides?.length) return null;

  return (
    <header
      className="full-width"
      style={{ backgroundColor: hero?.bgColor?.hex }}
    >
      <Carousel
        className="w-full main_container py-8 lg:py-12"
        setApi={setApi}
        plugins={[
          Autoplay({
            playOnInit: true,
            delay: 3000,
            active: hero.slides.length > 1,
            stopOnLastSnap: false,
            stopOnFocusIn: false,
            stopOnInteraction: false,
          }) as any,
        ]}
        opts={{
          active: hero.slides.length > 1,
        }}
      >
        <CarouselContent>
          {hero?.slides?.map((slide, index) => {
            const image = slide.image?.image;

            const imageURL = image && urlForImage(image)?.url();

            const isLeft = slide.position === "left";

            return (
              <CarouselItem
                key={index}
                className={cn(
                  "flex items-center flex-col-reverse lg:flex-row gap-12",
                  {
                    "lg:flex-row-reverse": !isLeft,
                    "lg:flex-row": isLeft,
                  },
                )}
              >
                <div className="flex flex-col w-full items-center text-center lg:text-left lg:items-start lg:w-1/2">
                  <CustomPortableText value={slide.content as any} />

                  {/* divider */}

                  {!!slide.stats?.length && (
                    <div className="w-full">
                      <hr className="w-full h-0.5 bg-primary mt-8 mb-12" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12">
                        {slide.stats?.map((stat) => (
                          <div key={stat._key}>
                            <h2 className="text-4xl font-bold mb-4">
                              {stat.title}
                            </h2>
                            <p className="text-lg text-gray-600">
                              {stat.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {slide.cta && <Cta className="mt-12 w-fit" {...slide.cta} />}
                </div>

                <div className="relative w-full lg:w-1/2 aspect-square max-h-80 h-full overflow-hidden rounded-lg lg:max-h-none">
                  <div className="relative h-full  aspect-[3/4] mx-auto">
                    {!!imageURL && (
                      <Image
                        src={imageURL}
                        alt="hero"
                        fill
                        className="object-cover rounded-lg"
                        priority
                        quality={100}
                        blurDataURL={image.asset.metadata.lqip}
                      />
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </header>
  );
}
