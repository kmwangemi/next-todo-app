'use client';

import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>; // ✅ No need to pass session manually
}
