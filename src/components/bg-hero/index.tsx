import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadSingleton } from "@/sanity/loader/loadQuery";
import { BgHero as BgHeroType, Singletons } from "@/types";
import { BgHeroLayout } from "./bg-hero-layout";

const BgHeroPreview = dynamic(() => import("./bg-hero-preview"));

type BgHeroProps = {
  load?: Singletons;
  slug?: string;
} & React.HTMLAttributes<HTMLElement>;

export async function BgHero({ load = Singletons.HOME, slug, ...props }: BgHeroProps) {
  const data = await loadSingleton(load, slug);

  if (draftMode().isEnabled) {
    return <BgHeroPreview initial={data} load={load} />;
  }

  return <BgHeroLayout hero={data?.data?.["bgHero"] as BgHeroType} {...props} />;
}
