import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/app/actions/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.metaTitle || "Anomaly Game Supply",
    description:
      settings?.metaDescription ||
      "Penyedia layanan top up dan jual beli akun game terpercaya.",
    keywords: settings?.metaKeywords || "game, topup",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#0d0d11] text-white antialiased">{children}</body>
    </html>
  );
}
