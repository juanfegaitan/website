"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { marketsQuery } from "@/sanity/lib/queries";
import { MarketDocument } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { MarketsListLayout } from "./markets-list-layout";

type Props = {
  initial: QueryResponseInitial<{
    markets?: MarketDocument[];
  }>;
};

export default function MarketsListPreview(props: Props) {
  const { data } = useQuery<{
    markets?: MarketDocument[];
  }>(
    marketsQuery,
    {},
    {
      initial: props.initial,
    },
  );

  return <MarketsListLayout data={data.markets} />;
}
