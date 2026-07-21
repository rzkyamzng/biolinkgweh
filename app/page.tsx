"use client";

import { useBiolink } from "@/context/BiolinkContext";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { FaTiktok, FaInstagram, FaYouTube, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "⚠️ WASPADA PENIPUAN! Hati-hati Penipuan mengatasnamakan Anomaly Game Supply • Rekening hanya atas nama Alex Joshua • ";

  return (
    <main className="w-full h-full bg-[linear-gradient(135deg, #0c0822 0%, #160d2b 50%, #090d22 100%)] bg-fixed text-white antialiased w-full font-sans p-4">
      <div className="w-full h-full relative flex flex-col items-center justify-start *:select-none max-w-xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full h-44 rounded-2xl mb-2 md:mb-3 gap-2 md:gap-3 border border-purple-500/30 shadow-2xl relative overflow-hidden group"
        >
          <img
            src={data.bannerUrl}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-85 scale-105 transition-transform duration-700 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-slate-950/60 hover:bg-slate-950/70 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-row items-center p-8 gap-5">
            {/* Avatar (dikecilkan sedikit agar proporsional) */}
            <motion.div
              variants={itemVariants}
              className="w-24 h-24 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-400 overflow-hidden"
            >
              <img
                src={data.avatarUrl}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex flex-col text-left">
              <motion.h1
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold tracking-wide text-white"
              >
                {data.name}
              </motion.h1>

              {/* BIO */}
              <div>
                <motion.p
                  variants={itemVariants}
                  className={`text-[12px] sm:text-xs text-gray-300 mt-1 line-clamp-2 transition-all duration-300 ${
                    isExpanded ? "line-clamp-none" : "line-clamp-2"
                  }`}
                >
                  {data.bio}
                </motion.p>
                {data.bio && data.bio.length > 120 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[12px] sm:text-xs text-purple-400 hover:text-purple-300 mt-1 font-medium block focus:outline-none"
                  >
                    {isExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                  </button>
                )}
              </div>
              {/* Ikon Sosial (dikecilkan sedikit, warna teks diganti) */}
              <div className="flex gap-4 mt-3 text-gray-200 text-lg">
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <FaWhatsapp />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BUTTON UTAMA */}
        <motion.div
          variants={itemVariants}
          className="w-full grid grid-cols-3 mb-2 md:mb-3 gap-2 md:gap-3"
        >
          <motion.a
            href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+ingin+menjual+akun+PUBG&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w full flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
          >
            Rekber
          </motion.a>

          {/* Secondary Button */}
          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <motion.a
              whileTap={{ scale: 0.99 }}
              href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+mau+TopUp+UC&type=phone_number&app_absent=0"
            >
              <span className="w-full flex justify-center items-center text-md">
                Titip Jual Akun
              </span>
            </motion.a>
          </motion.button>

          {/* Third Button */}
          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <motion.a
              whileTap={{ scale: 0.99 }}
              href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+mau+TopUp+UC&type=phone_number&app_absent=0"
            >
              <span className="w-full flex justify-center items-center text-md">
                TopUp
              </span>
            </motion.a>
          </motion.button>
        </motion.div>

        {/* Product Card */}
        <div className="w-full h-[240px] flex flex-col mb-2 md:mb-3 gap-2 md:gap-3 bg-[#1f1635]/80">
          <div className="grid grid-cols-2 gap-2 md:gap-3 rounded-sm items-center bg-white">
            <p>sad</p>
          </div>
        </div>
        {/* SEKSI: PARTNER & SERVICES */}
        <div className="w-full flex flex-col mb-2 md:mb-3 gap-2 md:gap-3">
          {/* PARTNER BLACKLIST (FULL WIDTH DENGAN GLOW MERAH TIPIS) */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.01, translateY: -2 }}
            whileTap={{ scale: 0.99 }}
            className="w-full h-28 flex items-center justify-between bg-[#2d121c]/90 hover:bg-[#3d1624] border border-red-500/20 hover:border-red-500/40 rounded-2xl p-4 shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              {/* Icon Bulat Merah Negatif */}
              <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-inner">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>

              <div className="flex flex-col gap-1">
                {/* Tag Badge Blacklist Kecil */}
                <span className="text-[9px] font-extrabold tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 rounded-md uppercase w-max">
                  ⚠️ Blacklist
                </span>
                <p className="text-[12px] text-gray-400 font-medium tracking-wide">
                  Daftar Penipu & Penjual yang tidak bertanggungjawab.
                </p>
              </div>
            </div>

            {/* Right Icon Arrow */}
            <div className="w-9 h-9 rounded-xl bg-red-500/5 group-hover:bg-red-500/10 flex items-center justify-center text-red-400/70 group-hover:text-red-400 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </motion.a>
        </div>
        <footer className="w-full text-center text-[10px] text-gray-500 mt-4 border-t border-white/5">
          <p>Made with 💖</p>
        </footer>
      </div>
    </main>
  );
}
