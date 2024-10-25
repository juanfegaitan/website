import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadResourcePage, loadResources } from "@/sanity/loader/loadQuery";
import { ResourcesLayout } from "./resources-layout";

const ResourcesPreview = dynamic(() => import("./resources-preview"));

export async function ResourcesSection() {
  const data = await loadResources();

  const { data: resourcePage } = await loadResourcePage();

  if (draftMode().isEnabled) {
    return <ResourcesPreview initial={data} resourcePage={resourcePage} />;
  }

  return <ResourcesLayout resources={data.data} resourcePage={resourcePage} />;
}
