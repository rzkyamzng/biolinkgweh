"use client";

import { useBiolink } from "@/context/BiolinkContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";

// Konfigurasi varian animasi Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function BiolinkPage() {
  const { data } = useBiolink();
  const whatsappUrl = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(data.whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 select-none max-w-xl mx-auto">
      {/* <Link
        href="/admin"
        className="absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-full text-xs text-slate-400 hover:text-white backdrop-blur-md transition-all duration-300"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        Admin Panel
      </Link> */}
      {/* HEADER & SOSMED */}

      {/* Profile or Brand Logo */}
      <header className="relative flex flex-col items-center text-center">
        <div className="px-4 relative flex flex-col items-center text-center">
          {/* Avatar (Negatif Margin agar memotong Banner) */}
          <motion.div
            variants={itemVariants}
            className="w-28 h-28 border-4 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg border-2 border-purple-400 overflow-hidden"
          >
            <img
              src={data.avatarUrl}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <motion.h1
          variants={itemVariants}
          className="mt-3 text-2xl font-bold tracking-wide"
        >
          {data.name}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xs text-purple-300 px-4 mt-1"
        >
          {data.bio}
        </motion.p>

        {/* Ikon Sosial Media */}
        <div className="flex gap-4 mt-3 text-gray-300 text-lg">
          <a href="#" className="hover:text-pink-500 transition-colors">
            <FaTiktok />
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors">
            <FaYoutube />
          </a>
        </div>
      </header>

      {/* BANNER UTAMA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full h-44 rounded-2xl my-5 text-center border border-purple-500/30 shadow-2xl relative overflow-hidden group"
      >
        {/* eslint-disable-next-html-element-warning */}
        <img
          src={data.bannerUrl}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-85 scale-105 transition-transform duration-700 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/60" />
      </motion.div>

      {/* TEXT RUNNING / MARQUEE WARNING */}
      <div className="w-full rounded-xl bg-yellow-500/10 border-y border-yellow-500/30 overflow-hidden py-2 text-yellow-500 font-semibold text-xs tracking-wide">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="mx-4">
              ⚠️ WASPADA PENIPUAN! Pastikan transaksi hanya melalui link resmi
              di website ini • Jangan transfer ke rekening pribadi • Hubungi
              admin jika ragu •
            </span>
          ))}
        </div>
      </div>

      {/* BUTTON UTAMA */}
      <div className="w-full grid grid-cols-2 gap-3 my-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
        >
          Beli/Rental Akun
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
        >
          Top Up All Game
        </motion.button>
      </div>

      <div className="w-full flex flex-col gap-3 mb-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-white py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
        >
          🤝 Daftar Partner/Paid Promote Disini
        </motion.button>
      </div>
      {/* SEKSI: PARTNER & SERVICES */}
      <div className="w-full flex flex-col gap-4">
        {/* GRID UNTUK PARTNER RESMI & PAID PROMOTE */}
        <div className="grid grid-cols-2 gap-3">
          {/* PARTNER RESMI ALWIKOBRA */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col justify-between bg-[#1f1635]/80 hover:bg-[#281d45] border border-white/10 rounded-2xl p-4 h-36 transition-colors shadow-lg cursor-pointer relative overflow-hidden group"
          >
            {/* Top Row: Icon Arrow */}
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            {/* Bottom Row: Text Content */}
            <div className="flex flex-col gap-0.5">
              <h4 className="font-bold text-sm tracking-wide text-white">
                Partner Resmi Alwikobra
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                Daftar partner terverifikasi kami
              </p>
            </div>
          </motion.a>

          {/* PAID PROMOTE RESMI */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col justify-between bg-[#1f1635]/80 hover:bg-[#281d45] border border-white/10 rounded-2xl p-4 h-36 transition-colors shadow-lg cursor-pointer relative overflow-hidden group"
          >
            {/* Top Row: Icon Arrow */}
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            {/* Bottom Row: Text Content */}
            <div className="flex flex-col gap-0.5">
              <h4 className="font-bold text-sm tracking-wide text-white">
                Paid Promote Resmi
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                Layanan promosi official Alwikobra
              </p>
            </div>
          </motion.a>
        </div>

        {/* PARTNER BLACKLIST (FULL WIDTH DENGAN GLOW MERAH TIPIS) */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.01, translateY: -2 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-between bg-[#2d121c]/90 hover:bg-[#3d1624] border border-red-500/20 hover:border-red-500/40 rounded-2xl p-5 shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            {/* Icon Bulat Merah Negatif */}
            <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-inner">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>

            <div className="flex flex-col gap-0.5">
              {/* Tag Badge Blacklist Kecil */}
              <span className="text-[9px] font-extrabold tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md uppercase w-max mb-1">
                ⚠️ Blacklist
              </span>
              <h4 className="font-bold text-[15px] text-red-200 tracking-wide">
                Partner Blacklist
              </h4>
              <p className="text-xs text-red-300/60 font-medium">
                Daftar partner yang tidak terpercaya
              </p>
            </div>
          </div>

          {/* Right Icon Arrow */}
          <div className="w-9 h-9 rounded-xl bg-red-500/5 group-hover:bg-red-500/10 flex items-center justify-center text-red-400/70 group-hover:text-red-400 transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </motion.a>
      </div>
      <footer className="w-full text-center text-[10px] text-gray-500 mt-12 mb-4 border-t border-white/5 pt-4">
        <p>© 2026 Alwikobra Store. All rights reserved.</p>
        <p className="mt-1">Made with 💖 in Indonesia</p>
      </footer>
    </div>
  );
}
