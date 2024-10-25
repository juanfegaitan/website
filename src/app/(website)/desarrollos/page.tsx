import ButtonClearParams from "@/components/button-clear-params";
import { CountriesFilter } from "@/components/filters/coutry-filter";
import { DatePickerFilter } from "@/components/filters/date-picker-filter";
import { PriceFilter } from "@/components/filters/price-filter";
import { ListingProperties } from "@/components/listing-properties";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadInvestPage, loadProperties } from "@/sanity/loader/loadQuery";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadInvestPage();

  return _generateMetadata(data.seo);
}

export default async function Invest() {
  const { data } = await loadProperties();

  const { data: investPage } = await loadInvestPage();

  return (
    <div className="flex flex-col gap-4 py-16">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {investPage.title}
      </div>

      <section className="flex flex-col gap-8 py-12">
        <div className="flex flex-col items-center lg:flex-row gap-2 md:gap-4">
          <Suspense>
            <CountriesFilter />

            <PriceFilter />

            <DatePickerFilter />
          </Suspense>
          <ButtonClearParams className="w-36 flex-shrink-0 h-10 mt-4 md:mt-0">
            Limpiar
          </ButtonClearParams>
        </div>

        <div className="w-full h-0.5 bg-gray-200" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <Suspense fallback={<div>Loading...</div>}>
            <ListingProperties properties={data} investPage={investPage} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
