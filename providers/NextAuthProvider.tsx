"use client";

import { SessionProvider } from "next-auth/react";

// 🔴 Pastikan ada kata kunci 'export default'
export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
