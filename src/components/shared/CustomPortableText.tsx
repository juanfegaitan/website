import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import type { Image } from "sanity";

import ImageBox from "@/components/shared/ImageBox";
import { TimelineSection } from "@/components/shared/TimelineSection";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    listItem: {
      // ol
      number: ({ children, index }) => {
        return (
          <li className={`ml-4`}>
            <span className="font-bold mr-1">{index + 1}.</span>
            {children}
          </li>
        );
      },
      bullet: ({ children }) => {
        return (
          <li className={`flex items-start space-x-2 ml-4 ${paragraphClasses}`}>
            <div className="size-1.5 bg-foreground rounded-full mt-2" />
            <span>{children}</span>
          </li>
        );
      },
    },
    block: {
      normal: ({ children, ...props }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      left: ({ children }: any) => <div className="text-left">{children}</div>,
      center: ({ children }: any) => <div className="text-center w-full">{children}</div>,
      right: ({ children }: any) => <div className="text-right">{children}</div>,
      justify: ({ children }: any) => <div className="text-justify">{children}</div>,
      inlineicon: (data) => {
        return (
          <span className="inline-block align-middle">
            <ImageBox
              image={data.value}
              alt={data.value?.alt || "Icon"}
              classesWrapper="relative w-12 aspect-[1/1]"
            />
          </span>
        );
      },
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
