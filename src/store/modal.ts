import { ModalTypes } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? "";
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();
  },
};

export type ModalState = {
  modal: ModalTypes | null;
  setModal: (modal: ModalTypes) => void;
  closeModal: () => void;
  onOpenChange: (open: boolean, modal: ModalTypes) => void;
};

export const useModal = create(
  persist<ModalState>(
    (set) => ({
      modal: null,
      setModal: (modal) => set({ modal }),
      closeModal: () => set({ modal: null }),
      onOpenChange: (open: boolean, modal: ModalTypes) => {
        if (!open) {
          set({ modal: null });
        }

        if (open) {
          set({ modal });
        }
      },
    }),
    {
      name: "modal",
      storage: createJSONStorage(() => hashStorage),
    },
  ),
);
