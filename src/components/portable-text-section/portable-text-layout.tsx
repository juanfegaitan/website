"use client";
import { PortableTextSection } from "@/types";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: PortableTextSection | null;
};

export function PortableTextLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="flex flex-col gap-8 pt-12">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {data.title}
      </div>

      <div>
        <CustomPortableText value={data.body as any} />
      </div>
    </section>
  );
}
