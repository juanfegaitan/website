import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { InvestPagePayload, PropertyDocument } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: PropertyDocument;
  investPage: InvestPagePayload;
};

function calcMonths(date: string) {
  if (!date) {
    return 0;
  }

  const now = new Date();
  const then = new Date(date);

  return (
    (then.getFullYear() - now.getFullYear()) * 12 +
    then.getMonth() -
    now.getMonth()
  );
}

function formatPrice(price: number | undefined | null) {
  if (!price) {
    return "";
  }

  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
}

export function Property({ property, investPage }: Props) {
  const link = resolveHref("property", property.slug)?.replace(
    "/listing",
    `/${investPage?.slug ?? "listing"}`,
  );

  const image = urlForImage(property.gallery?.images?.[0])?.url();

  if (!link) {
    return null;
  }

  return (
    <Link
      href={link}
      className="flex flex-col bg-gray-200 rounded-2xl overflow-hidden"
    >
      <div className="relative w-full overflow-hidden aspect-video min-h-56">
        {property.highlight && (
          <div className="absolute z-10 bg-white bg-opacity-70 text-sm font-medium px-4 py-1 rounded-full top-3 left-4 border border-white">
            {property.highlightText}
          </div>
        )}
        {!!image && (
          <Image
            fill
            src={image}
            alt="Real Estate"
            className="object-cover w-full aspect-video rounded-t-2xl"
          />
        )}
      </div>

      <div className="p-6 flex flex-col items-start justify-center text-left text-lg lg:text-xl">
        <strong className="text-xl lg:text-2xl">{property.name}</strong>
        <div>
          {property.location?.city || property.location?.state},{" "}
          {property.location?.country}
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1 mt-8">
          <div>Valorización:</div>
          <strong>{property.capitalGain ?? 0}%*</strong>
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1">
          <div>Ocupación zona:</div>
          <strong>{property.occupancy ?? 0}%</strong>
        </div>

        <div className="flex items-center justify-between gap-2 w-full">
          <div>Entrega:</div>
          <strong>{calcMonths(property.deliveryDate ?? "")} meses</strong>
        </div>

        <div className="w-full h-px bg-primary my-4" />

        <div className="flex items-center justify-between gap-1 w-full">
          <div className="flex-shrink-0">Precio desde:</div>
          <strong className="truncate">{formatPrice(property.price)}</strong>
        </div>
      </div>
    </Link>
  );
}
