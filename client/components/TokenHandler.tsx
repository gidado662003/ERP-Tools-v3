"use client";
import { useEffect } from "react";
import { useAuthStore } from "../lib/store";

export default function userAuth() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetch("http://localhost:5001/api/auth/me", {
          credentials: "include",
        }).then((res) => res.json());
        setUser(userData.user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, [setUser]);

  return null;
}
