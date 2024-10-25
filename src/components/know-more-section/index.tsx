import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  SectionsList,
  Singletons,
  KnowMore as TypeKnowMoreSection,
} from "@/types";
import { KnowMoreSectionLayout } from "./know-more-layout";

const KnowMorePreview = dynamic(() => import("./know-more-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function KnowMoreSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<TypeKnowMoreSection>(
    data.data.sections ?? [],
    SectionsList.KNOW_MORE,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <KnowMorePreview initial={data} _key={key} load={load} slug={slug} />
    );
  }

  return <KnowMoreSectionLayout data={feature} />;
}
