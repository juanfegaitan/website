"use client";

import { urlForImage } from "@/sanity/lib/utils";
import { TestimonialSection } from "@/types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading() {
    return (
      <div className="aspect-[9/16] w-full animate-pulse bg-neutral-200" />
    );
  },
});

type Props = {
  data?: TestimonialSection | null;
};

export function TestimonialsLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="py-12 w-full full-width">
      <div className="text-4xl text-center">{data?.title}</div>

      <div className="main_container mt-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.testimonials?.map((testimonial, index) => {
            const image = testimonial.image?.image;

            const imageURL =
              image &&
              urlForImage(image)?.height(560).width(420).fit("crop").url();

            return (
              <div
                key={index}
                className="flex-1"
              >
                <div className="flex flex-col gap-4 items-start text-left">
                  {testimonial.videoUrl && (
                    <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden">
                      <ReactPlayer
                        url={testimonial.videoUrl}
                        title={testimonial.name}
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                        controls
                        fallback={
                          <div className="aspect-[9/16] w-full animate-pulse bg-neutral-200" />
                        }
                      />
                    </div>
                  )}

                  <div className="flex  gap-6">
                    <div className="flex flex-col items-start justify-center text-left">
                      <div className="font-semibold">{testimonial.name}</div>

                      <div className="text-base">{testimonial.subtitle}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
