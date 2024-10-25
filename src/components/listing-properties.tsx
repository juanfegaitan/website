"use client";

import { InvestPagePayload, PropertyDocument } from "@/types";
import { useSearchParams } from "next/navigation";
import { Property } from "./property";

type Props = {
  properties: PropertyDocument[];
  investPage: InvestPagePayload;
};

function transformStringToNumber(value: string | null | undefined | number) {
  if (!value) return 0;

  if (typeof value === "number") return value;

  if (value === "" || value === null || value === undefined) return 0;

  if (typeof value !== "string") return 0;

  if (value.toLowerCase() === "infinity") return Infinity;

  return parseInt(value.replace(/\D/g, ""), 10);
}

function filterProperties(
  properties: PropertyDocument[],
  params: URLSearchParams,
) {
  const country = params.get("country") || "";

  const minPrice = params.get("minPrice") || "";

  const maxPrice = params.get("maxPrice") || "";

  const fromDateString = params.get("from") || "";

  const toDateString = params.get("to") || "";

  return properties
    .filter((property) => {
      const JSONString = JSON.stringify(property.location)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return JSONString.includes(country);
    })
    .filter((property) => {
      const price = property.price || 0;

      if (!minPrice || !maxPrice) {
        return true;
      }

      return (
        price >= transformStringToNumber(minPrice) &&
        price <= transformStringToNumber(maxPrice)
      );
    })
    .filter((property) => {
      if (!fromDateString || !toDateString) {
        return true;
      }

      if (!property.deliveryDate) {
        return false;
      }

      const date = new Date(property.deliveryDate);

      const from = fromDateString ? new Date(fromDateString) : new Date(0);

      const to = toDateString ? new Date(toDateString) : new Date();

      return date >= from && date <= to;
    });
}

export function ListingProperties({ properties, investPage }: Props) {
  const params = useSearchParams();

  const filteredProperties = filterProperties(properties, params);

  if (!filteredProperties.length) {
    return (
      <div className="text-center text-2xl font-bold">
        No encontramos propiedades
      </div>
    );
  }

  return filteredProperties.map((property, i) => {
    return <Property key={i} property={property} investPage={investPage} />;
  });
}
