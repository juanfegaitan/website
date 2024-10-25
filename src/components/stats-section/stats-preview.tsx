"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  SectionsList,
  Singletons,
  StatsSection,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { StatsLAyout } from "./stats-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function StatsPreview(props: Props) {
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

  const stats = getSection<StatsSection>(
    data?.sections ?? [],
    SectionsList.STATS_SECTION,
    props._key,
  );

  return <StatsLAyout data={stats} />;
}
