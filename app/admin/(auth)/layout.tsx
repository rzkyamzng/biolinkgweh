// app/admin/(auth)/layout.tsx
import { NextAuthProvider } from "@/components/providers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        {children}
      </main>
    </NextAuthProvider>
  );
}
