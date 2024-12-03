import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { Service, ServicesPagePayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  services: Service[] | null;
  servicesPage: ServicesPagePayload | null;
};

export function ServicesListLayout({ services, servicesPage }: Props) {
  if (!services) {
    return null;
  }

  return (
    <section className="w-full flex flex-col gap-y-12 lg:gap-y-24 mt-6">
      {services.map((service) => {
        const image = service?.image?.image;

        const imageUrl =
          image && urlForImage(image)?.height(220).width(420).fit("crop").url();

        const href = resolveHref(service._type, service.slug)?.replace(
          "/servicios",
          `/${servicesPage?.slug ?? "servicios"}`,
        );

        if (!imageUrl || !href) return null;

        return (
          <article
            key={service._id}
            className="flex items-center gap-12 text-center flex-col lg:odd:flex-row lg:even:flex-row-reverse"
          >
            <div className="relative w-full lg:w-1/2 aspect-video rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                fill
                alt={service.title ?? ""}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                blurDataURL={image.asset?.metadata?.lqip}
                placeholder="blur"
                className="object-cover object-top aspect-video w-full"
              />
            </div>
            <div className="flex flex-col gap-4 text-left w-full lg:w-1/2">
              <div className="font-normal text-xl md:text-2xl">
                {service.title}
              </div>

              {!!service.description && (
                <CustomPortableText value={service.description as any} />
              )}

              <Button asChild className="w-fit mt-2 lg:mt-8" size="lg">
                <Link href={href}>Empezar</Link>
              </Button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
