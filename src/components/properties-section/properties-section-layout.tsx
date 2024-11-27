"use client";
import { cn } from "@/lib/cn";
import { InvestPagePayload, PropertiesSection } from "@/types";
import { Property } from "../property";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: PropertiesSection | null;
  investPage: InvestPagePayload;
};

export function PropertiesSectionLayout({ data, investPage }: Props) {
  if (!data) return null;

  return (
    <section className={cn("py-8 md:py-12")}>
      <h2 className="text-4xl text-center">
        {data?.title}
      </h2>

      {data?.description && (
        <div className="mt-4 text-center">
          <CustomPortableText value={data?.description as any} />
        </div>
      )}

      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {data.properties?.map((property) => (
          <Property
            key={property._id}
            property={property}
            investPage={investPage}
          />
        ))}
      </div>
    </section>
  );
}
