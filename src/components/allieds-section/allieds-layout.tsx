"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { AlliedsSection } from "@/types";
import Image from "next/image";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: AlliedsSection | null;
};

export function AlliedsSectionLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="bg-white py-12 w-full full-width">
      <div className="text-4xl text-center">
        {data.title}{" "}
      </div>
      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}
      <div className="main_container mt-12">
        <div className="grid grid-cols-5 gap-8">
          {data.allieds?.map((allied) => {
            const imageUrl =
              allied?.image?.image?.asset &&
              urlForImage(allied?.image?.image)?.width(420).url();

            if (!imageUrl) return null;

            return (
              <div key={allied._key} className="aspect-video relative">
                <Image
                  src={imageUrl}
                  alt={allied.image?.alt ?? ""}
                  fill
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
