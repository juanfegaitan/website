import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  GridSection as GridSectionType,
  SectionsList,
  Singletons,
} from "@/types";
import { GridSectionLayout } from "./grid-section-layout";

const GridSectionPreview = dynamic(() => import("./grid-section-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function GridSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<GridSectionType>(
    data.data.sections ?? [],
    SectionsList.GRID_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <GridSectionPreview initial={data} _key={key} load={load} slug={slug} />
    );
  }

  return <GridSectionLayout data={feature} />;
}
