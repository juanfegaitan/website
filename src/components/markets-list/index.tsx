import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadMarkets } from "@/sanity/loader/loadQuery";
import { MarketsListLayout } from "./markets-list-layout";

const MarketsListPreview = dynamic(() => import("./markets-list-preview"));

export async function MarketsList() {
  const data = await loadMarkets();

  if (draftMode().isEnabled) {
    return <MarketsListPreview initial={data} />;
  }

  return <MarketsListLayout data={data.data?.markets} />;
}
