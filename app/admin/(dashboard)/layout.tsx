// app/admin/(dashboard)/layout.tsx
import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { NextAuthProvider } from "@/components/providers";

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
