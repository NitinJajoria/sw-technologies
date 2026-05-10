import { create } from "zustand";

export const useQuoteStore = create((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}));
