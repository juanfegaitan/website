"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { useGetQueryLoad } from "@/hooks/use-get-query-load";
import { FullPagePayload, Singletons } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { HeroLayout } from "./hero-layout";

type Props = {
  initial: QueryResponseInitial<any>;
  load?: Singletons;
};

export default function HeroPreview(props: Props) {
  const query = useGetQueryLoad(props.load);

  const { data } = useQuery<FullPagePayload>(
    query,
    {},
    {
      initial: props.initial,
    },
  );

  return <HeroLayout hero={data?.hero} />;
}
