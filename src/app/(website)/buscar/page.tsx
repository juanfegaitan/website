import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import {
  loadBlogPage,
  loadDocumentByQParam,
  loadInvestPage,
  loadResourcePage,
  loadServicesPage,
} from "@/sanity/loader/loadQuery";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

function getNameByType(type: string) {
  switch (type) {
    case "post":
      return "Artículo";
    case "property":
      return "Propiedad";
    case "service":
      return "Servicio";
    case "resource":
      return "Recurso";
    default:
      return "Documento";
  }
}

export default async function SearchPage(props: SearchPageProps) {
  if (!props.searchParams.q) {
    return notFound();
  }

  const [
    { data },
    { data: investPage },
    { data: blogPage },
    { data: resourcePage },
    { data: servicePage },
  ] = await Promise.all([
    loadDocumentByQParam(props.searchParams.q),
    loadInvestPage(),
    loadBlogPage(),
    loadResourcePage(),
    loadServicesPage(),
  ]);

  return (
    <div className="py-16">
      <h1 className="text-title font-bold text-center mb-12">
        Resultados de la búsqueda
      </h1>

      <p className="text-left text-xl mb-12">
        Resultados para la búsqueda: {props.searchParams.q}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((doc) => {
          const imageURL =
            doc.image?.image && urlForImage(doc.image.image)?.url();

          const link = resolveHref(doc._type, doc.slug)
            ?.replace("/listing", `/${investPage?.slug ?? "listing"}`)
            ?.replace("/blog", `/${blogPage?.slug ?? "blog"}`)
            ?.replace("/resources", `/${resourcePage?.slug ?? "resource"}`)
            ?.replace("/service", `/${servicePage?.slug ?? "service"}`);

          if (!link) {
            return null;
          }

          return (
            <Link
              href={link}
              key={doc._id}
              className="border border-gray-50 shadow-md rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                {imageURL && (
                  <Image
                    src={imageURL}
                    fill
                    className="object-cover"
                    alt={doc.image.alt || doc.title}
                    placeholder="blur"
                    blurDataURL={doc.image.image?.asset.metadata.lqip}
                  />
                )}
              </div>

              <div className="flex flex-col p-4">
                <div className="p-2 bg-primary text-white text-sm font-bold w-fit rounded">
                  <p>{getNameByType(doc._type)}</p>
                </div>

                <h2 className="text-xl font-bold mt-4">{doc.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
