"use client";

import { urlForImage } from "@/sanity/lib/utils";
import { BgHero } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CustomPortableText } from "../shared/CustomPortableText";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading() {
    return <div className="aspect-video w-full animate-pulse bg-neutral-200" />;
  },
});

type Props = {
  hero?: BgHero;
};

export function BgHeroLayout({ hero }: Props) {
  const image = hero?.bg;

  const imageUrl = image && urlForImage(image)?.url();

  return (
    <header className="relative full-width aspect-square md:aspect-video lg:aspect-[16/5] overflow-hidden">
      {/* bg overlay */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-50" />

      <div className="h-full w-full mx-auto max-w-2xl text-center z-20 relative gid place-content-center">
        <h1 className="text-white text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center">
          {hero?.title}
        </h1>

        {hero?.subtitle && (
          <div className="text-white text-lg lg:text-2xl mt-6">
            <CustomPortableText value={hero.subtitle as any} />
          </div>
        )}
      </div>

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
          blurDataURL={image.asset.metadata.lqip}
        />
      )}
    </header>
  );
}
