import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { InvestPagePayload, PropertyDocument } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

dayjs.locale("es");

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


function shortNumber(num?: number, currency?: string) {
  if (!num) {
    return "";
  }

  let value = ''

  if (num > 999 && num < 1000000) {
    value = formatPrice(num / 1_000, currency) + "K" + " " // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    value = formatPrice(num / 1_000_000, currency) + "M" + " " // convert to M for number from > 1 million
  } else if (num < 900) {
    value = num.toString(); // if value < 1000, nothing to do
  }

  // if the value has the cyurrency symbol, remove it
  return value.replace(currency ?? "MXN", "") + " " + (currency ?? "MXN")
}

function formatPrice(price: number | undefined | null, currency?: string) {
  if (!price) {
    return "";
  }


  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: currency ?? "MXN",
    minimumFractionDigits: 0,
  })
}

const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }

  const parsedDate = dayjs(date);


  return new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
  }).format(parsedDate.toDate());
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

      <div className="p-6 flex flex-col items-start justify-between text-left text-lg flex-1">
        <strong className="text-xl lg:text-2xl">{property.name}</strong>
        <div>
          {property.location?.city || property.location?.state},{" "}
          {property.location?.country}
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1 mt-8">
          <div>Plusvalía Proyectada:</div>
          <strong>{property.appreciation ?? 0}%</strong>
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1">
          <div>Ocupación zona:</div>
          <strong>{property.occupancy ?? 0}%</strong>
        </div>

        <div className="flex items-center justify-between gap-2 w-full">
          <div>Entrega:</div>
          <strong className="first-letter:capitalize">{formatDate(property.deliveryDate)}</strong>
        </div>

        <div className="w-full h-px bg-primary my-4" />

        <div className="flex items-center justify-between gap-1 w-full">
          <div className="flex-shrink-0">Precio desde:</div>
          <strong className="truncate">{shortNumber(property.price, property.currency)}</strong>
        </div>
      </div>
    </Link>
  );
}
