import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { Resource, ResourcesPagePayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";

type Props = {
  resources: Resource[] | null;
  resourcePage: ResourcesPagePayload | null;
};

export function ResourcesLayout({ resources, resourcePage }: Props) {
  if (!resources) {
    return null;
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 mt-6">
      {resources.map((resource) => {
        const image = resource?.image?.image;

        const imageUrl =
          image && urlForImage(image)?.height(220).width(420).fit("crop").url();

        const href = resolveHref(resource._type, resource.slug)?.replace(
          "/resources",
          `/${resourcePage?.slug ?? "resources"}`,
        );

        if (!imageUrl || !resource.resource || !href) return null;

        return (
          <Link
            href={href}
            key={resource._id}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="relative w-full aspect-video">
              <Image
                src={imageUrl}
                fill
                alt={resource.title}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                blurDataURL={image.asset?.metadata?.lqip}
                placeholder="blur"
                className="object-cover object-top aspect-video w-full"
              />
            </div>
            <div className="font-bold text-xl md:text-2xl">
              {resource.title}
            </div>
            <Button>Descargar</Button>
          </Link>
        );
      })}
    </section>
  );
}
