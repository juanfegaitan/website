"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  PortableTextSection,
  SectionsList,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { PortableTextLayout } from "./portable-text-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function PortableTextSectionPreview(props: Props) {
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

  const accordion = getSection<PortableTextSection>(
    data?.sections ?? [],
    SectionsList.PORTABLE_TEXT,
    props._key,
  );

  return <PortableTextLayout data={accordion} />;
}
