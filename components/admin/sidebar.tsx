"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, FolderTree, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Profile Admin", href: "/admin/profile", icon: User },
  { name: "Daftar Produk", href: "/admin/products/list", icon: Package },
  {
    name: "Kategori Produk",
    href: "/admin/products/categories",
    icon: FolderTree,
  },
  { name: "SEO & Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-4">
      <div className="text-xl font-bold p-4 border-b border-slate-800">
        <Link href="/admin">Admin Panel</Link>
      </div>
      <nav className="flex-1 mt-6 space-y-1">
        {navigation.map((item) => {
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
