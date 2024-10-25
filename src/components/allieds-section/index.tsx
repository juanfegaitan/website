import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  AlliedsSection as AlliedsSectionType,
  SectionsList,
  Singletons,
} from "@/types";
import { AlliedsSectionLayout } from "./allieds-layout";

const AlliedsPreview = dynamic(() => import("./allieds-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function AlliedsSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<AlliedsSectionType>(
    data.data.sections ?? [],
    SectionsList.ALLIEDS_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <AlliedsPreview initial={data} _key={key} load={load} slug={slug} />;
  }

  return <AlliedsSectionLayout data={feature} />;
}
