"use client";

import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { GallerySection } from "@/types";
import Image from "next/image";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: GallerySection | null;
};

export function GallerySectionLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="flex flex-col justify-between gap-8 py-12">
      <div
        className={cn("text-xl font-bold w-fit text-white bg-black px-6 py-2", {
          "self-start": data.titlePosition === "left",
          "self-center": data.titlePosition === "center",
          "self-end": data.titlePosition === "right",
        })}
      >
        {data.title}
      </div>

      {!!data.description && (
        <div className="text-center text-body">
          <CustomPortableText value={data.description as any} />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.images?.map((item, index) => {
          const imageURL = item.image?.asset && urlForImage(item.image)?.url();

          if (!imageURL) return null;

          return (
            <div
              key={index}
              className="relative w-full aspect-square rounded-2xl overflow-hidden"
            >
              <Image
                src={imageURL}
                alt={item.alt ?? ""}
                fill
                className="object-cover"
                placeholder={
                  item.image?.asset?.metadata?.lqip ? "blur" : "empty"
                }
                blurDataURL={item.image?.asset?.metadata?.lqip}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
