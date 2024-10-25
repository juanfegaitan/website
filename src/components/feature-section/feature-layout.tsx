"use client";
import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { FeatureSection } from "@/types";
import Image from "next/image";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: FeatureSection | null;
};

export function FeatureSectionLayout({ data }: Props) {
  const image = data?.image?.image;

  const imageUrl = image && urlForImage(image)?.url();

  const position = data?.position;

  if (!data) return null;

  return (
    <section
      className={cn("py-8 md:py-12 flex items-center gap-8", {
        "flex-col md:flex-row-reverse": position === "left",
        "flex-col-reverse md:flex-row": position === "right",
      })}
    >
      <div
        className={cn(
          "w-full md:w-1/2 flex flex-col items-center text-center",
          {
            "md:text-right md:items-end": position === "left",
            "md:text-left md:items-start": position === "right",
          },
        )}
      >
        <h2 className="text-h2 leading-h2 font-semibold">{data?.title}</h2>

        {!!data?.content && (
          <div className="text-body1 leading-body1 mt-8 w-full lg:w-3/4">
            <CustomPortableText value={data?.content as any} />
          </div>
        )}

        <Cta className="mt-8" {...data?.cta} />
      </div>

      {!!imageUrl && (
        <div className="relative flex-shrink-0 flex justify-end w-full md:w-1/2 aspect-video overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            fill
            alt={data?.image?.alt ?? ""}
            blurDataURL={image.asset.metadata.lqip}
            placeholder="blur"
            className="object-cover object-top"
            sizes="(min-width: 1024px) 444px, 100vw"
          />
        </div>
      )}
    </section>
  );
}
