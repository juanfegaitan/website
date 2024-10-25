"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import { CtaSection, FullPagePayload, SectionsList, Singletons } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { CallToActionSectionLayout } from "./call-to-action-section-layout";

type Props = {
  initial?: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function CallToActionSectionPreview(props: Props) {
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

  const cta = getSection<CtaSection>(
    data?.sections ?? [],
    SectionsList.CTA_SECTION,
    props._key,
  );

  return <CallToActionSectionLayout data={cta} />;
}
