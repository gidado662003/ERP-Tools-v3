"use client";
import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useSocketStore } from "../store/useSocketStore";
import { useAuthStore } from "../lib/store";

export default function SocketInitializer() {
  const setIsConnected = useSocketStore((state) => state.setIsConnected);
  const { user, isAuthenticated } = useAuthStore();
  console.log(
    "SocketInitializer - user:",
    user,
    "isAuthenticated:",
    isAuthenticated,
  );
  console.log(user);
  //  {
  //     "_id": "698ee293492c9e5f2de4108c",
  //     "username": "dev.user",
  //     "email": "dev@test.com",
  //     "role": "admin",
  //     "department": "Development"
  // }
  const userId = user?.id;
  console.log("SocketInitializer - userId:", userId);

  useEffect(() => {
    if (isAuthenticated && userId) {
      socket.auth = { userId: String(userId) };
      socket.connect();

      const onConnect = () => setIsConnected(true);
      const onDisconnect = () => setIsConnected(false);
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        // Don't disconnect in cleanup - avoids "WebSocket closed before connection established"
        // when effect re-runs (e.g. rehydration). Only disconnect when auth is false (else branch).
      };
    } else {
      socket.disconnect();
    }
  }, [setIsConnected, isAuthenticated, userId]);

  return null;
}
