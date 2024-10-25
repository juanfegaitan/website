import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { PortableTextSection, SectionsList, Singletons } from "@/types";
import { PortableTextLayout } from "./portable-text-layout";

const FeaturePreview = dynamic(() => import("./portable-text-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function PortableTextSectionComponent({
  _key: key,
  load,
  slug,
}: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<PortableTextSection>(
    data.data.sections ?? [],
    SectionsList.PORTABLE_TEXT,
    key,
  );

  if (draftMode().isEnabled) {
    return <FeaturePreview initial={data} _key={key} load={load} slug={slug} />;
  }

  return <PortableTextLayout data={feature} />;
}
