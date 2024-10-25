"use client";

import { eventMitt } from "@/lib/event";
import { Button, ButtonProps } from "./button";

type Props = ButtonProps;

export default function ButtonClearParams(props: Props) {
  const handleClean = () => {
    eventMitt.emit("clear-params");
  };

  return <Button {...props} onClick={handleClean} />;
}
