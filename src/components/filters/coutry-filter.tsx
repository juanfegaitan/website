"use client";

import { eventMitt } from "@/lib/event";
import { parseAsStringEnum, useQueryState } from "next-usequerystate";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select/select";

type Country = {
  label: string;
  value: string;
};

const COUNTRIES: Country[] = [
  {
    label: "Estados Unidos",
    value: "estados-unidos",
  },
  {
    label: "República Dominicana",
    value: "republica-dominicana",
  },
  {
    label: "México",
    value: "mexico",
  },
];

export function CountriesFilter() {
  const [country, setCountry] = useQueryState(
    "country",
    parseAsStringEnum(COUNTRIES.map((c) => c.value)).withDefault(""),
  );

  const onValueChange = (country: string) => {
    const { value } = COUNTRIES.find((p) => p.value === country) || {};

    if (!value) {
      return;
    }

    setCountry(value);
  };

  useEffect(() => {
    eventMitt.on("clear-params", () => {
      setCountry("");
    });

    return () =>
      eventMitt.off("clear-params", () => {
        setCountry("");
      });
  }, [setCountry]);

  const value = COUNTRIES.find((c) => c.value === country)?.value || "";

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="País" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((price) => (
          <SelectItem key={price.label} value={price.value}>
            {price.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
