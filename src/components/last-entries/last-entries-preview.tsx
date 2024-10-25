"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  BlogPagePayload,
  FullPagePayload,
  LastEntriesSection,
  Post,
  SectionsList,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { LastEntriesSectionLayout } from "./last-entries-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
  lastEntries?: Post[];
  blogPage?: BlogPagePayload | null;
};

export default function LastEntriesPreview(props: Props) {
  const query = useGetQueryLoad(props.load);

  const { data } = useQuery<FullPagePayload>(
    query,
    {
      slug: props.slug,
    },
    {
      initial: props.initial!,
    },
  );

  const section = getSection<LastEntriesSection>(
    data?.sections ?? [],
    SectionsList.LAST_ENTRIES_SECTION,
    props._key,
  );

  return (
    <LastEntriesSectionLayout
      data={section}
      lastEntries={props.lastEntries}
      blogPage={props.blogPage}
    />
  );
}
