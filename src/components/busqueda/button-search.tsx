"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../button";

export default function ButtonSearch() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="rounded-none w-1/5 h-[50px] lg:h-[75px] text-lg min-w-32 disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-100"
      type="submit"
    >
      {pending ? "Buscando..." : "Buscar"}
    </Button>
  );
}
