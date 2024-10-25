"use client";
import { extractYoutubeId } from "@/sanity/lib/utils";
import { YoutubeSection } from "@/types";
import dynamic from "next/dynamic";
import { CustomPortableText } from "../shared/CustomPortableText";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading() {
    return <div className="aspect-video w-full animate-pulse bg-neutral-200" />;
  },
});

type Props = {
  data?: YoutubeSection | null;
};

export function YoutubeSectionLayout({ data }: Props) {
  if (!data) return null;

  const id = extractYoutubeId(data.url);

  if (!id) return null;

  return (
    <section className="py-16 w-full max-w-4xl mx-auto">
      {!!data.title && (
        <h2 className="text-sub-title leading-sub-title font-bold text-center mb-12">
          {data.title}
        </h2>
      )}
      {!!data.description && (
        <p className="text-center mb-12">
          <CustomPortableText value={data.description as any} />
        </p>
      )}
      <div className="relative aspect-video w-full">
        <ReactPlayer
          url={data.url}
          title={data?.videoTitle}
          width="100%"
          height="100%"
          className="absolute inset-0"
          controls
          fallback={
            <div className="aspect-video w-full animate-pulse bg-neutral-200" />
          }
        />
      </div>
    </section>
  );
}
