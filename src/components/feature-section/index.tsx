import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { FeatureSection, SectionsList, Singletons } from "@/types";
import { FeatureSectionLayout } from "./feature-layout";

const FeaturePreview = dynamic(() => import("./feature-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function Feature({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<FeatureSection>(
    data.data.sections ?? [],
    SectionsList.FEATURE_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <FeaturePreview initial={data} _key={key} load={load} slug={slug} />;
  }

  return <FeatureSectionLayout data={feature} />;
}
