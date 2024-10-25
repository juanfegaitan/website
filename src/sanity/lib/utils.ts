import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { ButtonProps } from "@/components/button";
import { dataset, projectId } from "@/sanity/lib/api";
import { Sections, SectionsList, Seo } from "@/types";
import capitalize from "just-capitalize";
import flush from "just-flush";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case "marketPage":
      return slug ? `/${slug}` : "/mercados";
    case "services":
      return slug ? `/${slug}` : "/services";
    case "invest":
      return slug ? `/${slug}` : "/invest";
    case "blog":
      return slug ? `/${slug}` : "/blog";
    case "post":
      return slug ? `/blog/${slug}` : undefined;
    case "resource":
      return slug ? `/resources/${slug}` : undefined;
    case "resources":
      return slug ? `/${slug}` : "/resources";
    case "course":
      return slug ? `/${slug}` : "/course";
    case "about":
      return slug ? `/${slug}` : "/about";
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "service":
      return slug ? `/servicios/${slug}` : undefined;
    case "property":
      return `/listing/${slug}`;
    case "project":
      return slug ? `/projects/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}

export function getVariantButton(
  variant: string | null | undefined
): ButtonProps["variant"] {
  if (variant === "primary") {
    return "default";
  }

  return variant as ButtonProps["variant"];
}

export function getSection<T>(
  sections: Sections[],
  type: SectionsList,
  key: string
): T | null {
  return sections.find(
    (section) => section._type === type && section._key === key
  ) as T | null;
}

export function _generateMetadata(seo?: Seo): Metadata {
  const ogImage = urlForOpenGraphImage(seo?.image);

  return flush({
    title: seo?.title ? capitalize(seo?.title) : undefined,
    description: seo?.description ? toPlainText(seo?.description) : undefined,
    openGraph: {
      type: "website",
      site_name: seo?.title,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: seo?.title,
            },
          ]
        : undefined,
    },
  });
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const extractYoutubeId = (url: string) => {
  const match = url.match(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  return match ? match[1] : undefined;
};
