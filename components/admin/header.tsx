"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, Bell } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-end sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Tombol Notifikasi Placeholder */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        {/* User Info & Quick Action */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
            {session?.user?.name ? (
              session.user.name.charAt(0).toUpperCase()
            ) : (
              <UserIcon className="w-5 h-5" />
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-tight">
              {session?.user?.name || "Admin User"}
            </p>
            <p className="text-xs text-slate-400">
              {session?.user?.email || "admin@example.com"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
