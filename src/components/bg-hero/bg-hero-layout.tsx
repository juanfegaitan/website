"use client";

import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { BgHero } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading() {
    return <div className="aspect-video w-full animate-pulse bg-neutral-200" />;
  },
});

type Props = {
  hero?: BgHero;
} & React.HTMLAttributes<HTMLElement>;

export function BgHeroLayout({ hero, className, ...props }: Props) {
  const image = hero?.bg;

  const imageUrl = image && urlForImage(image)?.url();

  if (!hero) {
    return null;
  }

  return (
    <header
      className={cn(
        "relative full-width aspect-square md:aspect-video lg:aspect-[16/5] overflow-hidden",
        className,
      )}
      {...props}
    >
      {hero.cta && (
        <div className="flex items-center justify-end h-full relative z-20 main_container">
          <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-center">
            {hero?.title && (
              <h1 className="text-white text-5xl font-normal text-center">
                {hero?.title}
              </h1>
            )}

            {hero?.subtitle && (
              <div className="text-white text-lg lg:text-3xl">
                <CustomPortableText value={hero.subtitle as any} />
              </div>
            )}

            <Cta className="mt-10" {...hero.cta} />
          </div>
        </div>
      )}

      {!hero.cta && (
        <div className="h-full w-full mx-auto max-w-2xl text-center z-20 relative gid place-content-center">
          {hero?.title && (
            <h1 className="text-white text-5xl font-normal text-center">
              {hero?.title}
            </h1>
          )}

          {hero?.subtitle && (
            <div className="text-white text-lg lg:text-2xl mt-6">
              <CustomPortableText value={hero.subtitle as any} />
            </div>
          )}
        </div>
      )}

      {!!hero?.bgVideo && (
        <div className="absolute inset-0">
          <ReactPlayer
            url={hero.bgVideo}
            title={hero.title}
            width="100%"
            height="100%"
            playing
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  },
                },
              },
            }}
            fallback={
              <div className="h-full w-full animate-pulse bg-neutral-200" />
            }
          />
        </div>
      )}

      {imageUrl && !hero.bgVideo && (
        <Image
          src={imageUrl}
          alt="hero"
          fill
          className="object-cover"
          priority
          quality={100}
          blurDataURL={image.asset.metadata.lqip}
        />
      )}
    </header>
  );
}
