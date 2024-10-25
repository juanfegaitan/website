import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadInvestPage, loadSingleton } from "@/sanity/loader/loadQuery";
import {
  PropertiesSection as PropertiesSectionType,
  SectionsList,
  Singletons,
} from "@/types";
import { PropertiesSectionLayout } from "./properties-section-layout";

const PropertiesSectionPreview = dynamic(
  () => import("./properties-section-preview"),
);

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function PropertiesSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const { data: investPage } = await loadInvestPage();

  const feature = getSection<PropertiesSectionType>(
    data.data.sections ?? [],
    SectionsList.PROPERTIES_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <PropertiesSectionPreview
        initial={data}
        _key={key}
        load={load}
        slug={slug}
        investPage={investPage}
      />
    );
  }

  return <PropertiesSectionLayout data={feature} investPage={investPage} />;
}
