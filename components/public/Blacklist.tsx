"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ArrowUpRight } from "lucide-react";

export default function Blacklist() {
  return (
    <>
      {/* Partner / Blacklist Section */}
      <div className="w-full flex flex-col mb-2 md:mb-3 gap-2 md:gap-3">
        <motion.a
          href="#"
          whileHover={{ scale: 1.01, translateY: -2 }}
          whileTap={{ scale: 0.99 }}
          className="w-full h-28 flex items-center justify-between bg-[#2d121c]/90 hover:bg-[#3d1624] border border-red-500/20 hover:border-red-500/40 rounded-lg p-4 shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-16 h-16 flex items-center justify-center text-red-500 shadow-inner">
              <ShieldAlert className="w-12 h-12" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-extrabold tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 rounded-md uppercase w-max p-2">
                ⚠️ Blacklist
              </span>
              <p className="text-[12px] text-gray-400 font-medium tracking-wide">
                Daftar Penipu & Penjual yang tidak bertanggungjawab.
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-lg bg-red-500/5 group-hover:bg-red-500/10 flex items-center justify-center text-red-400/70 group-hover:text-red-400 transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </motion.a>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-[10px] text-gray-500 mt-4 border-t border-white/5 pt-4 pb-8">
        <p>Made with 💖</p>
      </footer>
    </>
  );
}
