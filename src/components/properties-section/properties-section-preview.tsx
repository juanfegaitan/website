"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  InvestPagePayload,
  PropertiesSection,
  SectionsList,
  Singletons,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { PropertiesSectionLayout } from "./properties-section-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
  investPage: InvestPagePayload;
};

export default function PropertiesSectionPreview(props: Props) {
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

  const feature = getSection<PropertiesSection>(
    data?.sections ?? [],
    SectionsList.PROPERTIES_SECTION,
    props._key,
  );

  return (
    <PropertiesSectionLayout data={feature} investPage={props.investPage} />
  );
}
