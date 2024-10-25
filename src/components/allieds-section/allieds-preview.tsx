"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  AlliedsSection,
  FullPagePayload,
  SectionsList,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { AlliedsSectionLayout } from "./allieds-layout";

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

  const accordion = getSection<AlliedsSection>(
    data?.sections ?? [],
    SectionsList.ALLIEDS_SECTION,
    props._key,
  );

  return <AlliedsSectionLayout data={accordion} />;
}
