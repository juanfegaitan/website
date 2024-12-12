"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { MansorySection } from "@/types";
import Image from "next/image";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: MansorySection | null;
};

const items = [
  { id: 1, height: 200, color: "bg-red-500" },
  { id: 2, height: 300, color: "bg-blue-500" },
  { id: 3, height: 250, color: "bg-green-500" },
  { id: 4, height: 180, color: "bg-yellow-500" },
  { id: 5, height: 220, color: "bg-purple-500" },
  { id: 6, height: 280, color: "bg-pink-500" },
  { id: 7, height: 200, color: "bg-indigo-500" },
  { id: 8, height: 320, color: "bg-teal-500" },
  { id: 9, height: 240, color: "bg-orange-500" },
  { id: 10, height: 260, color: "bg-cyan-500" },
];

// function to get the height of the item randomly 200 to 550
function getRandomHeight() {
  return Math.floor(Math.random() * 150) + 100;
}

export function MansorySectionLayout({ data }: Props) {
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          style={{
            gridAutoRows: "10px",
          }}
        >
          {data.gallery?.map((item, index) => {
            const imageURL =
              item.image?.asset && urlForImage(item.image)?.url();

            if (!imageURL) return null;

            return (
              <div
                key={index}
                className={`rounded-lg shadow-md overflow-hidden relative`}
                style={{
                  gridRowEnd: `span ${Math.ceil(getRandomHeight() / (data.gallery?.length ?? 1))}`,
                }}
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
      </div>
    </section>
  );
}
