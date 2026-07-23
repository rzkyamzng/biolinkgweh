"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ProfileCard({ userData }: { userData: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!userData) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-44 rounded-lg mb-2 md:mb-3 gap-2 md:gap-3 border border-purple-500/30 shadow-2xl relative overflow-hidden group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Banner */}
      <img
        src={
          userData.bannerUrl ||
          "https://images.unsplash.com/photo-1782215670710-8d2675bc0fbd"
        }
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-85 scale-105 transition-transform duration-700 group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-slate-950/60 hover:bg-slate-950/70 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-row items-center p-8 gap-5">
        {/* Avatar */}
        <motion.div className="w-24 h-24 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-400 overflow-hidden">
          <img
            src={
              userData.avatarUrl ||
              "https://images.unsplash.com/photo-1782215670710-8d2675bc0fbd"
            }
            alt={userData.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex flex-col text-left">
          {/* Nama dari Database */}
          <motion.h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
            {userData.name}
          </motion.h1>

          {/* Bio dari Database (Harusnya akan berubah jadi "Biolink Gweh") */}
          <div>
            <motion.p
              className={`text-[12px] sm:text-xs text-gray-300 mt-1 transition-all duration-300 ${
                isExpanded ? "line-clamp-none" : "line-clamp-2"
              }`}
            >
              {userData.bio}
            </motion.p>
          </div>

          {/* Social Links dari Database */}
          <div className="flex gap-4 mt-3 text-gray-200 text-lg relative z-10">
            {userData.socials && userData.socials.length > 0 ? (
              userData.socials.map((link: any) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  {/* Anggap kamu punya properti title di social link, misal: link.title */}
                  {link.title || <FaWhatsapp />}
                </a>
              ))
            ) : (
              // Fallback jika kosong
              <>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <FaWhatsapp />
                </a>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  <FaInstagram />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
