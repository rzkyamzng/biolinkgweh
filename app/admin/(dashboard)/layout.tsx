// app/admin/(dashboard)/layout.tsx
import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { NextAuthProvider } from "@/components/providers";

import { getSettings } from "@/app/actions/settings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.metaTitle || "Anomaly Game Supply - Jual Akun & TopUp",
    description:
      settings?.metaDescription ||
      "Penyedia layanan top up dan jual beli akun game/premium terpercaya.",
    keywords: settings?.metaKeywords || "pubg, mobile legends, topup",
  };
}
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <div className="flex min-h-screen bg-slate-50 font-sans antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </NextAuthProvider>
  );
}
