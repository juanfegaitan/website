import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  SectionsList,
  ServicesSection as ServicesSectionType,
  Singletons,
} from "@/types";
import { ServicesSectionLayout } from "./services-layout";

const ServicesPreview = dynamic(() => import("./services-preview"));

type Props = {
  _key: string;
  load?: Singletons;
  slug?: string;
};

export async function ServicesSection({ _key: key, load, slug }: Props) {
  const data = await loadSingleton(load, slug);

  const feature = getSection<ServicesSectionType>(
    data.data.sections ?? [],
    SectionsList.SERVICES_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return (
      <ServicesPreview initial={data} _key={key} load={load} slug={slug} />
    );
  }

  return <ServicesSectionLayout data={feature} />;
}
