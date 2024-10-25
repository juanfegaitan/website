import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadSettings } from "@/sanity/loader/loadQuery";

import NavbarLayout from "./NavbarLayout";
const NavbarPreview = dynamic(() => import("./NavbarPreview"));

export async function Navbar() {
  const settings = await loadSettings();

  if (draftMode().isEnabled) {
    return <NavbarPreview initial={settings} />;
  }

  return <NavbarLayout settings={settings.data} />;
}
