import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  MansorySection as MansorySectionType,
  SectionsList,
  Singletons,
} from "@/types";
import { MansorySectionLayout } from "./mansory-section-layout";

const MansorySectionPreview = dynamic(
  () => import("./mansory-section-preview"),
);

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function MansorySection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<MansorySectionType>(
    data.data.sections ?? [],
    SectionsList.MANSORY_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <MansorySectionPreview
        initial={data}
        _key={key}
        load={load}
        slug={slug}
      />
    );
  }

  return <MansorySectionLayout data={feature} />;
}
