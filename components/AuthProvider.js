"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthProvider({ children }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    fetch("/api/auth/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setUser(d.user) : clearUser()))
      .catch(clearUser);
  }, []);

  return <>{children}</>;
}
