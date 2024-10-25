import Image from "next/image";

import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";

interface ImageBoxProps {
  image?: { asset?: any };
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classesWrapper?: string;
  "data-sanity"?: string;
}

export default function ImageBox({
  image,
  alt = "Cover image",
  width = 3500,
  height = 2000,
  size = "100vw",
  classesWrapper,
  ...props
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.url();

  return (
    <div
      className={cn(
        `w-full overflow-hidden relative rounded-[3px] bg-gray-50 `,
        classesWrapper,
      )}
      data-sanity={props["data-sanity"]}
    >
      {imageUrl && (
        <Image
          alt={alt}
          fill
          sizes={size}
          src={imageUrl}
          className="object-cover"
          placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={image?.asset?.metadata?.lqip}
        />
      )}
    </div>
  );
}
