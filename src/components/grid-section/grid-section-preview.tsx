"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  GridSection,
  SectionsList,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { GridSectionLayout } from "./grid-section-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function GridSectionPreview(props: Props) {
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

  const feature = getSection<GridSection>(
    data?.sections ?? [],
    SectionsList.GRID_SECTION,
    props._key,
  );

  return <GridSectionLayout data={feature} />;
}
