"use client";

import { eventMitt } from "@/lib/event";
import { useQueryState } from "next-usequerystate";
import { useEffect } from "react";
import { Input, InputProps } from "./input";

type Props = Omit<InputProps, "name"> & {
  name: string;
};

export default function InputQueryParam({ name: nameProp, ...props }: Props) {
  const [value, setValue] = useQueryState(nameProp);

  useEffect(() => {
    eventMitt.on("clear-params", () => {
      setValue(null);
    });

    return () => eventMitt.off("clear-params", () => setValue(null));
  }, []);

  return (
    <Input
      {...props}
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
