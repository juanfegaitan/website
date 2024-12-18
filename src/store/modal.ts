import { ModalTypes } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
  useRef,
} from "react";
import { create } from "zustand";

// Debug utility
const debug = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.debug("[modal-state]", ...args);
  }
};

export type ModalState = {
  modal: ModalTypes | null;
  setModal: (modal: ModalTypes | null) => void;
  closeModal: () => void;
  onOpenChange: (open: boolean, modal: ModalTypes) => void;
};

export const useModal = create<ModalState>((set) => ({
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
}));

type UpdateOptions = {
  history?: "push" | "replace";
  scroll?: boolean;
  shallow?: boolean;
};

export function useModalURLSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticSearchParams, setOptimisticSearchParams] =
    useOptimistic<URLSearchParams>(searchParams);
  const { modal, setModal } = useModal();

  // Add refs to track the last known values
  const lastModalRef = useRef<ModalTypes | null>(null);
  const lastSearchParamsRef = useRef<string>("");

  const updateURL = useCallback(
    (newSearchParams: URLSearchParams, options: UpdateOptions = {}) => {
      const {
        history: localHistory = "replace",
        scroll = false,
        shallow = true,
      } = options;

      const newSearchParamsString = newSearchParams.toString();
      if (newSearchParamsString === lastSearchParamsRef.current) {
        return;
      }
      lastSearchParamsRef.current = newSearchParamsString;

      startTransition(() => {
        setOptimisticSearchParams(newSearchParams);
      });

      const url = `${location.pathname}?${newSearchParams.toString()}`;
      debug("Updating URL:", url);

      // Update URL locally first for immediate feedback
      const updateMethod =
        localHistory === "push" ? history.pushState : history.replaceState;

      updateMethod.call(
        history,
        null, // Required for Next.js 14.1.0+ reactive updates
        "",
        url,
      );

      if (scroll) {
        window.scrollTo(0, 0);
      }

      if (!shallow) {
        // Perform network request and server component re-render
        router.replace(url, {
          scroll: false,
        });
      }
    },
    [router, setOptimisticSearchParams],
  );

  // Sync from URL to state
  useEffect(() => {
    const modalParam = optimisticSearchParams.get("modal");
    const newModal = modalParam as ModalTypes | null;

    // Only update if the modal value has actually changed
    if (newModal !== lastModalRef.current) {
      lastModalRef.current = newModal;
      setModal(newModal);
    }
  }, [optimisticSearchParams, setModal]);

  // Sync from state to URL
  useEffect(() => {
    useModal.subscribe(({ modal: newModal }) => {
      // Only update if the modal value has actually changed
      if (newModal === lastModalRef.current) {
        return;
      }
      lastModalRef.current = newModal;

      const newSearchParams = new URLSearchParams(
        optimisticSearchParams.toString(),
      );

      if (newModal) {
        newSearchParams.set("modal", newModal);
      } else {
        newSearchParams.delete("modal");
      }

      updateURL(newSearchParams, {
        history: "replace",
        shallow: true,
        scroll: false,
      });
    });
  }, [optimisticSearchParams, updateURL]);

  return {
    searchParams: optimisticSearchParams,
    updateURL,
  };
}
