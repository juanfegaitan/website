import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadServices, loadServicesPage } from "@/sanity/loader/loadQuery";
import { ServicesListLayout } from "./services-list-layout";

const ServicesListPreview = dynamic(() => import("./services-list-preview"));

export async function ServicesListSection() {
  const data = await loadServices();

  const { data: servicesPage } = await loadServicesPage();

  if (draftMode().isEnabled) {
    return <ServicesListPreview initial={data} servicesPage={servicesPage} />;
  }

  return (
    <ServicesListLayout services={data.data} servicesPage={servicesPage} />
  );
}
