"use client";

import { getVariantButton, resolveHref } from "@/sanity/lib/utils";
import { useModal } from "@/store/modal";
import { Cta as CtaType } from "@/types";
import Link from "next/link";
import { Button, ButtonProps } from "./button";

type Props = CtaType & Omit<ButtonProps, "variant">;

export function Cta({
  externalLink,
  link,
  title,
  variant,
  modal,
  ...props
}: Props) {
  const href = resolveHref(link?._type, link?.slug) || externalLink || "#";

  const setModal = useModal((state) => state.setModal);

  if (modal) {
    return (
      <Button
        variant={getVariantButton(variant)}
        {...props}
        onClick={() => setModal(modal)}
      >
        {title}
      </Button>
    );
  }

  if (!title) return null;

  if (!href) return null;

  return (
    <Button variant={getVariantButton(variant)} {...props} asChild>
      <Link href={href}>{title}</Link>
    </Button>
  );
}
