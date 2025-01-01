"use client";

import { TestimonialPayload, TestimonialSection } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayerNative from "react-player";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading() {
    return (
      <div className="aspect-[9/16] w-full animate-pulse bg-neutral-200" />
    );
  },
  suspense: true, // Add Suspense support
});

type Props = {
  data?: TestimonialSection | null;
};

function Testimonial({ testimonial }: { testimonial: TestimonialPayload }) {
  const [showVideo, setShowVideo] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayerNative>(null);

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);

      // Pause video when tab is hidden
      if (document.hidden && playerRef.current) {
        setShowVideo(false);
        playerRef.current.seekTo(0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Set initial visibility state
    setIsTabVisible(!document.hidden);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        // Pause video when out of view
        if (!entry.isIntersecting && playerRef.current) {
          playerRef.current.seekTo(0);
          setShowVideo(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: "-50px", // Add some margin to trigger earlier
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle window blur/focus events
  useEffect(() => {
    const handleFocusChange = () => {
      if (!document.hasFocus() && playerRef.current) {
        setShowVideo(false);
        playerRef.current.seekTo(0);
      }
    };

    window.addEventListener("blur", handleFocusChange);

    return () => {
      window.removeEventListener("blur", handleFocusChange);
    };
  }, []);

  const isVideoPlayable = useMemo(() => {
    if (testimonial.previewGift) {
      return showVideo && isTabVisible && isInView;
    }

    return isInView && isTabVisible;
  }, [isInView, isTabVisible, showVideo, testimonial.previewGift]);

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4 items-start text-left">
        {testimonial.videoUrl && (
          <div
            className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden"
            ref={videoRef}
          >
            {testimonial.previewGift && (
              <Image
                src={testimonial.previewGift}
                alt={testimonial.name + " preview"}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setShowVideo(true)}
                loading="lazy" // Add lazy loading
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" // Add responsive sizes
              />
            )}

            {(showVideo || !testimonial.previewGift) && (
              <ReactPlayer
                url={testimonial.videoUrl}
                title={testimonial.name}
                width="100%"
                height="100%"
                className="absolute inset-0"
                controls
                playing={isVideoPlayable}
                onEnded={() => setShowVideo(false)}
                onError={() => setShowVideo(false)}
                fallback={
                  <div className="aspect-[9/16] w-full animate-pulse bg-neutral-200" />
                }
              />
            )}
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
}

export function TestimonialsLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="py-12 w-full full-width">
      <div className="text-4xl text-center">{data?.title}</div>

      <div className="main_container mt-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.testimonials?.map((testimonial, index) => {
            return <Testimonial key={index} testimonial={testimonial} />;
          })}
        </div>
      </div>
    </section>
  );
}
