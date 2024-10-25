import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadSingleton } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { HeroLayout } from "./hero-layout";

const HeroPreview = dynamic(() => import("./hero-preview"));

type HeroProps = {
  load?: Singletons;
  slug?: string;
};

export async function Hero({ load = Singletons.HOME, slug }: HeroProps) {
  const data = await loadSingleton(load, slug);

  if (draftMode().isEnabled) {
    return <HeroPreview initial={data} load={load} />;
  }

  return <HeroLayout hero={data?.data?.hero} />;
}
