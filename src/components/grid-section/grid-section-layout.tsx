"use client";
import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { GridSection } from "@/types";
import Image from "next/image";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: GridSection | null;
};

export function GridSectionLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className={cn("py-8 md:py-12")}>
      <h2 className="text-2xl  font-bold">
        {data?.title}
      </h2>

      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 lg:mt-24">
        {data.grids?.map((item) => {
          const imageURL =
            item?.image?.image && urlForImage(item.image.image)?.url();

          return (
            <div key={item._key} className="flex gap-4 items-start">
              <div className="relative size-10 rounded-lg flex-shrink-0 overflow-hidden">
                {imageURL && (
                  <Image
                    src={imageURL}
                    fill
                    alt={item.image?.alt ?? ""}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <CustomPortableText value={item.description as any} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
