"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { InvestPagePayload, MarketDocument } from "@/types";
import Image from "next/image";
import { Cta } from "../cta";
import { GridSectionLayout } from "../grid-section/grid-section-layout";
import { PropertiesSectionLayout } from "../properties-section/properties-section-layout";
import { CustomPortableText } from "../shared/CustomPortableText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs/tabs";

type Props = {
  data?: MarketDocument[] | null;
  investPage: InvestPagePayload;
};

export function MarketsListLayout({ data, investPage }: Props) {
  if (!data) return null;

  return (
    <section className="bg-white py-12 w-full">
      <Tabs
        defaultValue={data.length > 0 ? data[0]._key : undefined}
        className="w-full"
      >
        <TabsList className="bg-transparent h-auto text-gray-400 [&>*]:px-4 lg:[&>*]:px-12 [&>*:first-child]:pl-0 [&>*:last-child]:pr-0 [&>*:last-child]:border-r-transparent">
          {data.map((market) => {
            return (
              <TabsTrigger
                key={market._key}
                value={market._key}
                className="bg-transparent text-lg lg:text-xl data-[state=active]:font-bold data-[state=active]:bg-transparent data-[state=active]:shadow-none border-r-2 border-primary rounded-none"
              >
                {market.displayTitle}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {data.map((market) => {
          const imageURL =
            market.image?.image && urlForImage(market.image.image)?.url();

          return (
            <TabsContent key={market._key} value={market._key}>
              <div className="flex flex-col-reverse items-center gap-12 pt-20 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <div>
                    <CustomPortableText value={market.description as any} />

                    {market.cta && <Cta {...market.cta} className="mt-12" />}
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="w-full relative aspect-video lg:aspect-[3.5/4] rounded-lg overflow-hidden">
                    {imageURL && (
                      <Image
                        src={imageURL}
                        fill
                        alt={market.image?.alt ?? ""}
                        placeholder="blur"
                        blurDataURL={market.image?.image?.asset.metadata.lqip}
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              <GridSectionLayout data={market.grid} />

              <PropertiesSectionLayout
                data={market.properties}
                investPage={investPage}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
