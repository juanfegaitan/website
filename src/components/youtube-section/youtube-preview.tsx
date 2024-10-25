"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  SectionsList,
  Singletons,
  YoutubeSection,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { YoutubeSectionLayout } from "./youtube-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function YoutubeSectionPreview(props: Props) {
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

  const feature = getSection<YoutubeSection>(
    data?.sections ?? [],
    SectionsList.YOUTUBE_SECTION,
    props._key,
  );

  return <YoutubeSectionLayout data={feature} />;
}
