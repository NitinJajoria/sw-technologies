"use client";
import { create } from "zustand";

export const useContactStore = create((set) => ({
  status: "idle", // 'idle' | 'loading' | 'success' | 'error'
  message: "",

  setStatus: (status) => set({ status }),
  setMessage: (message) => set({ message }),

  reset: () => set({ status: "idle", message: "" }),
}));
