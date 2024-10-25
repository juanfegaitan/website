"use client";

import { eventMitt } from "@/lib/event";
import { parseAsInteger, useQueryState } from "next-usequerystate";
import { useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select/select";

type Price = {
  min: number;
  max: number;
  label: string;
};

const PRICES: Price[] = [
  {
    min: 0,
    max: 150000,
    label: "$ 0 USD a $150.000 USD",
  },
  {
    min: 150001,
    max: 250000,
    label: "$ 150.000 a $ 250.000",
  },
  {
    min: 250001,
    max: Infinity,
    label: "más de $ 250.000",
  },
];

export function PriceFilter() {
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(0),
  );

  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(Infinity),
  );

  const updatePrice = useCallback(
    (min: number | null, max: number | null) => {
      setMinPrice(min);
      setMaxPrice(max);
    },
    [setMinPrice, setMaxPrice],
  );

  const onValueChange = (price: string) => {
    const { max, min } = PRICES.find((p) => p.label === price) || {};

    if (!max || !min) {
      return;
    }

    updatePrice(min, max);
  };

  useEffect(() => {
    eventMitt.on("clear-params", () => {
      updatePrice(null, null);
    });

    return () =>
      eventMitt.off("clear-params", () => {
        updatePrice(null, null);
      });
  }, [updatePrice]);

  const value =
    PRICES.find((price) => price.min === minPrice && price.max === maxPrice)
      ?.label || "";

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Precio" />
      </SelectTrigger>
      <SelectContent>
        {PRICES.map((price) => (
          <SelectItem key={price.label} value={price.label}>
            {price.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
