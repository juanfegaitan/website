import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadInvestPage, loadMarkets } from "@/sanity/loader/loadQuery";
import { MarketsListLayout } from "./markets-list-layout";

const MarketsListPreview = dynamic(() => import("./markets-list-preview"));

export async function MarketsList() {
  const data = await loadMarkets();

  const investPage = await loadInvestPage();

  if (draftMode().isEnabled) {
    return <MarketsListPreview initial={data} />;
  }

  return (
    <MarketsListLayout investPage={investPage.data} data={data.data?.markets} />
  );
}
