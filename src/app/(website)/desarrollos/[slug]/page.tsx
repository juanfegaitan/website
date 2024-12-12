import { Button } from "@/components/button";
import { Property } from "@/components/property";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { _generateMetadata, urlForImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadInvestPage, loadProperty } from "@/sanity/loader/loadQuery";
import dayjs from "dayjs";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadProperty(params.slug);

  return _generateMetadata({
    title: page?.seo?.title || page?.name,
    description: page?.seo?.description || page?.description,
    image: page?.seo?.image || page?.gallery?.images?.[0],
  });
}

export function generateStaticParams() {
  return generateStaticSlugs("property");
}

function shortNumber(num?: number, currency?: string) {
  if (!num) {
    return "";
  }

  if (num > 999 && num < 1000000) {
    return formatPrice(num / 1_000, currency) + "K" + " " + (currency ?? "MXN"); // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (
      formatPrice(num / 1_000_000, currency) + "M" + " " + (currency ?? "MXN")
    ); // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

function formatPrice(price: number | undefined | null, currency?: string) {
  if (!price) {
    return "";
  }

  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: currency ?? "MXN",
    minimumFractionDigits: 0,
  });
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
};

export default async function ListingDetailPage(props: Props) {
  const { data } = await loadProperty(props.params.slug);

  const { data: investPage } = await loadInvestPage();

  const mainImage = data?.gallery?.images?.[0];

  const mainImageUrl = urlForImage(mainImage)?.width(1200).url();

  const mapUrl = urlForImage(data?.location?.map)?.width(1200).url();

  return (
    <div className="py-16">
      <section className="w-full flex items-stretch gap-2 lg:gap-4">
        <div className="w-full md:w-3/5">
          <Image
            src={mainImageUrl!}
            width={1200}
            height={627}
            alt="Real Estate"
            className="object-cover w-full aspect-video rounded-2xl"
          />
        </div>
        <div className="grid-cols-2 w-2/5 auto-rows-fr hidden gap-2 md:grid lg:gap-4">
          {data?.gallery?.images
            ?.slice(1)
            .slice(0, 4)
            .map((image, i) => {
              const imageUrl = urlForImage(image)?.width(500).fit("crop").url();

              return (
                <div key={i}>
                  <Image
                    src={imageUrl!}
                    width={500}
                    height={500}
                    alt={`Real Estate ${i}`}
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
              );
            })}
        </div>
      </section>

      <div className="text-base md:text-xl text-gray-500 mt-4">
        {data?.location?.city || data?.location?.state},{" "}
        {data?.location?.country}
      </div>
      <h1 className="text-2xl font-bold">{data?.name}</h1>

      <section className="flex flex-col lg:flex-row items-stretch gap-4 mt-8">
        <div className="bg-muted-foreground/10 rounded px-4 md:py-8 w-full lg:w-3/5 flex flex-col md:flex-row">
          <div className="flex flex-col gap-4 flex-1 border-b md:border-b-0 md:border-r border-black px-2 py-8 md:py-0 md:px-8">
            <div>
              <div className="">Precio</div>
              <div className="text-2xl font-bold">
                {shortNumber(data?.price, data?.currency)}
              </div>
            </div>

            <div>
              <div className="">Ocupación zona</div>
              <div className="text-2xl font-bold">%{data?.occupancy}</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 px-2 py-8 md:py-0 md:px-8  border-b md:border-b-0 md:border-r border-black">
            <div>
              <div className="">Renta promedio</div>
              <div className="text-2xl font-bold">{data?.averageRent}</div>
            </div>

            <div>
              <div className="">Plusvalía de la zona</div>
              <div className="text-2xl font-bold">
                {data?.appreciation ?? 0}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 px-2 py-8 md:py-0 md:px-8">
            <div>
              <div className="">Proyección anual</div>
              <div className="text-2xl font-bold">
                {shortNumber(data?.annualProjection, data?.currency)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted-foreground/10 rounded px-4 py-8 w-full lg:w-2/5 flex flex-col gap-4 items-center">
          <div className="text-2xl font-bold text-muted-foreground text-center">
            ¿Te interesa
            <div>invertir?</div>
          </div>

          <Button size={"lg"}>Quiero más información</Button>
        </div>
      </section>

      <section className="mt-8">
        <CustomPortableText
          value={data?.description as any}
          paragraphClasses="text-lg mt-8"
        />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Características</h2>

        <div className="mt-8 w-full lg:w-3/5 grid grid-cols-2  gap-4 ">
          {data?.characteristics?.map((feature, i) => {
            return (
              <div key={i} className="flex flex-col flex-1">
                <div className="">{feature.label}</div>
                <div className="text-2xl font-bold">{feature.value}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Tipo de departamentos</h2>

        <div className="mt-8 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {data?.kindOfDepartments?.map((kind, i) => {
            const imageUrl = urlForImage(kind.image)
              ?.width(500)
              .fit("crop")
              .url();

            return (
              <div
                key={i}
                className="aspect-video border rounded-md border-border overflow-hidden flex flex-col"
              >
                <div className="flex-1 overflow-hidden relative">
                  <Image
                    src={imageUrl!}
                    width={500}
                    height={500}
                    alt={`Apartamento ${kind.area} m2`}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="w-full bg-muted-foreground/10 text-foreground font-bold text-center p-4 flex-shrink-0">
                  ÁREA TOTAL: {kind.area} m2
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Ubicación</h2>

        <div className="mt-8 w-full aspect-video lg:aspect-[3/1]">
          <Image
            src={mapUrl!}
            width={1200}
            height={627}
            alt="Mapa"
            className="object-cover h-full w-full rounded-2xl"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Desarrollo similares</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {data?.similarProperties?.map((property, i) => {
            return (
              <Property key={i} property={property} investPage={investPage} />
            );
          })}
        </div>
      </section>
    </div>
  );
}
