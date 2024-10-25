"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { getSection } from "@/sanity/lib/utils";
import {
  FullPagePayload,
  SectionsList,
  Singletons,
  TestimonialSection,
} from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { TestimonialsLayout } from "./testimonials-layout";

type Props = {
  initial: QueryResponseInitial<FullPagePayload>;
  _key: string;
  load?: Singletons;
  slug?: string;
};

export default function TestimonialsPreview(props: Props) {
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

  const testimonials = getSection<TestimonialSection>(
    data?.sections ?? [],
    SectionsList.TESTIMONIAL_SECTION,
    props._key,
  );

  return <TestimonialsLayout data={testimonials} />;
}
