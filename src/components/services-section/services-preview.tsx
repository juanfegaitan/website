"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  SectionsList,
  ServicesSection,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { ServicesSectionLayout } from "./services-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function ServicesPreview(props: Props) {
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

  const accordion = getSection<ServicesSection>(
    data?.sections ?? [],
    SectionsList.SERVICES_SECTION,
    props._key,
  );

  return <ServicesSectionLayout data={accordion} />;
}
