"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  AccordionSection,
  FullPagePayload,
  SectionsList,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { AccordionSectionLayout } from "./accordion-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function AccordionPreview(props: Props) {
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

  const accordion = getSection<AccordionSection>(
    data?.sections ?? [],
    SectionsList.ACCORDION_SECTION,
    props._key,
  );

  return <AccordionSectionLayout data={accordion} />;
}
