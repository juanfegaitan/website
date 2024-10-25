import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { SectionsList, Singletons, StatsSection } from "@/types";
import { StatsLAyout } from "./stats-layout";

const StatsPreview = dynamic(() => import("./stats-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function Stats({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const stats = getSection<StatsSection>(
    data.data.sections ?? [],
    SectionsList.STATS_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <StatsPreview initial={data} _key={key} load={load} slug={slug} />;
  }

  return <StatsLAyout data={stats} />;
}
