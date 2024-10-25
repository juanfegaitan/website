import { getVariantButton, resolveHref } from "@/sanity/lib/utils";
import { Cta as CtaType } from "@/types";
import Link from "next/link";
import { Button, ButtonProps } from "./button";

type Props = CtaType & Omit<ButtonProps, "variant">;

export function Cta({ externalLink, link, title, variant, ...props }: Props) {
  const href = resolveHref(link?._type, link?.slug) || externalLink || "#";

  if (!title) return null;

  if (!href) return null;

  return (
    <Button variant={getVariantButton(variant)} asChild {...props}>
      <Link href={href}>{title}</Link>
    </Button>
  );
}
