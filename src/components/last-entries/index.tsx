import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import {
  loadBlogPage,
  loadLastEntries,
  loadSingleton,
} from "@/sanity/loader/loadQuery";
import {
  LastEntriesSection as LastEntriesSectionType,
  SectionsList,
  Singletons,
} from "@/types";
import { LastEntriesSectionLayout } from "./last-entries-layout";

const LastEntriesPreview = dynamic(() => import("./last-entries-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function LastEntriesSection({ _key: key, load, slug }: Props) {
  const [data, lastEntries, blogPage] = await Promise.all([
    loadSingleton(load, slug),
    loadLastEntries(),
    loadBlogPage(),
  ]);

  const feature = getSection<LastEntriesSectionType>(
    data.data.sections ?? [],
    SectionsList.LAST_ENTRIES_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <LastEntriesPreview
        initial={data}
        lastEntries={lastEntries.data}
        _key={key}
        load={load}
        slug={slug}
        blogPage={blogPage.data}
      />
    );
  }

  return (
    <LastEntriesSectionLayout
      data={feature}
      lastEntries={lastEntries.data}
      blogPage={blogPage.data}
    />
  );
}
