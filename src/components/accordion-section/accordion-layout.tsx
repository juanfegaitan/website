"use client";
import { AccordionSection } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: AccordionSection | null;
};

export function AccordionSectionLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="flex flex-col items-center justify-between gap-8 py-12">
      <div className="text-4xl text-center">{data.title}</div>

      {!!data.description && (
        <div className="text-center text-body">
          <CustomPortableText value={data.description as any} />
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        {data.items?.map((item) => (
          <AccordionItem key={item._key} value={item._key}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <CustomPortableText value={item.description as any} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
