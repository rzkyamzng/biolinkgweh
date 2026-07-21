"use client";

import Link from "next/link";
import { Package, FolderTree, User, ArrowRight, Sparkles } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Banner Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Panel Administrasi</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Selamat Datang di Anomaly Game Supply!
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base">
            Kelola katalog produk, kategori, dan profil admin kamu dengan cepat
            dan mudah dari satu tempat.
          </p>
        </div>

        {/* Hiasan background */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Quick Menu Cards */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Daftar Produk */}
          <Link
            href="/admin/products/list"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
              Daftar Produk
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Lihat, tambah, ubah, dan hapus katalog produk toko.
            </p>
          </Link>

          {/* Card 2: Kategori Produk */}
          <Link
            href="/admin/products/categories"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <FolderTree className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-violet-600 transition-colors">
              Kategori Produk
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Kelola kategori dan pengelompokan produk.
            </p>
          </Link>

          {/* Card 3: Profil Admin */}
          <Link
            href="/admin/profile"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">
              Profil Admin
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Atur informasi akun, email, dan password admin.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
