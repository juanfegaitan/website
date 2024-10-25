import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { CtaSection, SectionsList, Singletons } from "@/types";
import { CallToActionSectionLayout } from "./call-to-action-section-layout";

const CallToActionSectionPreview = dynamic(
  () => import("./call-to-action-section-preview"),
);

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function CallToActionSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const cta = getSection<CtaSection>(
    data?.data?.sections ?? [],
    SectionsList.CTA_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <CallToActionSectionPreview initial={data} _key={key} load={load} />;
  }

  return <CallToActionSectionLayout data={cta} />;
}
