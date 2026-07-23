"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  Package,
  FolderTree,
  Settings,
  LogOut,
  FileText,
  ChevronDown,
  ChevronRight,
  Globe,
  BarChart,
  Palette,
  Smartphone,
  Box,
} from "lucide-react";
import { signOut } from "next-auth/react";

// Menu utama tanpa produk dan settings
const mainNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile Admin", href: "/admin/profile", icon: User },
  { name: "Blog & Artikel", href: "/admin/blog", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  // State untuk dropdown Products (otomatis terbuka jika URL berada di /admin/products)
  const [isProductsOpen, setIsProductsOpen] = useState(
    pathname.startsWith("/admin/products"),
  );

  // State untuk dropdown Settings (otomatis terbuka jika URL berada di /admin/settings)
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    pathname.startsWith("/admin/settings"),
  );

  useEffect(() => {
    if (pathname.startsWith("/admin/products")) {
      setIsProductsOpen(true);
    }
    if (pathname.startsWith("/admin/settings")) {
      setIsSettingsOpen(true);
    }
  }, [pathname]);

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-4">
      <div className="text-xl font-bold p-4 border-b border-slate-800">
        <Link href="/admin">Admin Panel</Link>
      </div>

      <nav className="flex-1 mt-6 space-y-1">
        {/* RENDER MENU UTAMA LAINNYA */}
        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}

        {/* ============================== */}
        {/* DROPDOWN PRODUCTS              */}
        {/* ============================== */}
        <div className="pt-1">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith("/admin/products")
                ? "text-white bg-slate-800/50"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" />
              Products
            </div>
            {isProductsOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isProductsOpen && (
            <div className="mt-1 space-y-1 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {/* Submenu 1: Manage Products */}
              <Link
                href="/admin/products/list"
                className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/admin/products/list"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <Box className="w-4 h-4" />
                Manage Products
              </Link>

              {/* Submenu 2: Products Categories */}
              <Link
                href="/admin/products/categories"
                className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/admin/products/categories"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <FolderTree className="w-4 h-4" />
                Products Categories
              </Link>
            </div>
          )}
        </div>

        {/* ============================== */}
        {/* DROPDOWN SETTINGS              */}
        {/* ============================== */}
        <div className="pt-2 mt-2 border-t border-slate-800">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith("/admin/settings")
                ? "text-white bg-slate-800/50"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              Settings
            </div>
            {isSettingsOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isSettingsOpen && (
            <div className="mt-1 space-y-1 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <Link
                href="/admin/settings/meta"
                className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/admin/settings/meta"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <Globe className="w-4 h-4" />
                Meta Settings
              </Link>

              <Link
                href="/admin/settings/branding"
                className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/admin/settings/branding"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <Palette className="w-4 h-4" />
                Branding & Indexing
              </Link>

              <Link
                href="/admin/settings/pwa"
                className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/admin/settings/pwa"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                PWA Manifest
              </Link>

              <Link
                href="/admin/settings/analytics"
                className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/admin/settings/analytics"
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <BarChart className="w-4 h-4" />
                Analytics & Pixel
              </Link>
            </div>
          )}
        </div>
      </nav>

      <button
        onClick={() => signOut()}
        className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-slate-800 rounded-lg w-full transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
