"use client";

import { useModalURLSync } from "@/store/modal";

export function ModalProvider() {
  useModalURLSync();

  // TODO: create an instance of zustand connected to the modal store
  // TODO: support multiple modals
  return null;
}
