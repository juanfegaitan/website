"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import { FullPagePayload, KnowMore, SectionsList, Singletons } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { KnowMoreSectionLayout } from "./know-more-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function KnowMorePreview(props: Props) {
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

  const accordion = getSection<KnowMore>(
    data?.sections ?? [],
    SectionsList.KNOW_MORE,
    props._key,
  );

  return <KnowMoreSectionLayout data={accordion} />;
}
