"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { queryAllServices } from "@/sanity/lib/queries";
import { Service, ServicesPagePayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { ServicesListLayout } from "./services-list-layout";

type Props = {
  initial: QueryResponseInitial<Service[]>;
  servicesPage: ServicesPagePayload | null;
};

export default function ResourcesPreview(props: Props) {
  const { data } = useQuery<Service[]>(
    queryAllServices,
    {},
    {
      initial: props.initial,
    },
  );

  return (
    <ServicesListLayout services={data} servicesPage={props.servicesPage} />
  );
}
