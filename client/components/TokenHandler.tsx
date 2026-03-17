"use client";
import { useEffect } from "react";
import { useAuthStore } from "../lib/store";

export default function userAuth() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetch(
          "https://erp-tools-v3-1.onrender.com/api/auth/me",
          {
            credentials: "include",
          },
        ).then((res) => res.json());
        setUser(userData.user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, [setUser]);

  return null;
}
