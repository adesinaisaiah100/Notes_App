"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children, session }) {
  return (
    <div>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
}
