import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  SectionsList,
  Singletons,
  GallerySection as TypeGallerySection,
} from "@/types";
import { GallerySectionLayout } from "./gallery-layout";

const FeaturePreview = dynamic(() => import("./gallery-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function GallerySection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<TypeGallerySection>(
    data.data.sections ?? [],
    SectionsList.GALERY_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <FeaturePreview initial={data} _key={key} load={load} slug={slug} />;
  }

  return <GallerySectionLayout data={feature} />;
}
