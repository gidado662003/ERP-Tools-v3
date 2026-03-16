"use client";


import UserAuth from "../components/TokenHandler";
import DevAuthInitializer from "../components/DevAuthInitializer";

export default function LayoutClient({
  children,
  authMode,
}: {
  children: React.ReactNode;
  authMode?: string;
}) {
  return (
    <>
      <UserAuth />
      {children}
    </>
  );
}
