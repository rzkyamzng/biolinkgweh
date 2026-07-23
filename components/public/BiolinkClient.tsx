"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaDiscord,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

export default function BiolinkClient({ userData }: { userData: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!userData) return null;

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-start *:select-none max-w-xl mx-auto">
      {/* Profile / Banner Card Aslimu */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full h-44 rounded-lg mb-2 md:mb-3 gap-2 md:gap-3 border border-purple-500/30 shadow-2xl relative overflow-hidden group"
      >
        {/* Ganti src hardcode dengan userData.bannerUrl */}
        <img
          src={userData.bannerUrl || "URL_GAMBAR_DEFAULT_KAMU"}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-85 scale-105 transition-transform duration-700 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-slate-950/60 hover:bg-slate-950/70 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-row items-center p-8 gap-5">
          {/* Avatar - Ganti src dengan userData.avatarUrl */}
          <motion.div className="w-24 h-24 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-400 overflow-hidden">
            <img
              src={userData.avatarUrl || "URL_GAMBAR_DEFAULT_KAMU"}
              alt={userData.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex flex-col text-left">
            {/* Nama - Ganti teks hardcode dengan userData.name */}
            <motion.h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
              {userData.name}
            </motion.h1>

            {/* Bio - Ganti teks hardcode dengan userData.bio */}
            <div>
              <motion.p
                className={`text-[12px] sm:text-xs text-gray-300 mt-1 transition-all duration-300 ${
                  isExpanded ? "line-clamp-none" : "line-clamp-2"
                }`}
              >
                {userData.bio}
              </motion.p>
            </div>

            {/* Social Icons (Bisa kamu biarkan statis atau di-map dari userData.socials) */}
            <div className="flex gap-4 mt-3 text-gray-200 text-lg relative z-10">
              {userData.socials && userData.socials.length > 0 ? (
                userData.socials.map((link: any) => {
                  let Icon = null;
                  const platformLower = (link.platform || "").toLowerCase();

                  // Logika icon berdasarkan nama platform
                  if (
                    platformLower.includes("whatsapp") ||
                    platformLower.includes("wa")
                  ) {
                    Icon = <FaWhatsapp />;
                  } else if (
                    platformLower.includes("instagram") ||
                    platformLower.includes("ig")
                  ) {
                    Icon = <FaInstagram />;
                  } else if (platformLower.includes("telegram")) {
                    Icon = <FaTelegram />;
                  } else if (
                    platformLower.includes("tiktok") ||
                    platformLower.includes("tt")
                  ) {
                    Icon = <FaTiktok />;
                  } else if (platformLower.includes("discord")) {
                    Icon = <FaDiscord />;
                  } else if (
                    platformLower.includes("twitter") ||
                    platformLower.includes("x")
                  ) {
                    Icon = <FaTwitter />;
                  } else if (
                    platformLower.includes("facebook") ||
                    platformLower.includes("fb")
                  ) {
                    Icon = <FaFacebook />;
                  }

                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-400 transition-colors"
                      title={link.platform}
                    >
                      {Icon ? (
                        Icon
                      ) : (
                        <span className="text-sm font-medium">
                          {link.platform}
                        </span>
                      )}
                    </a>
                  );
                })
              ) : (
                <p className="text-xs text-gray-400">Belum ada link sosial</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Button */}
      <motion.div className="w-full grid grid-cols-2 mb-2 md:mb-3 gap-2 md:gap-3">
        <motion.a
          href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+ingin+menjual+akun+PUBG&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 py-3 rounded-lg font-bold text-sm shadow-md transition-all"
        >
          Jual Akun
        </motion.a>

        <motion.a
          href="https://api.whatsapp.com/send/?phone=6285173412902&text=Halo+min%2C+saya+mau+TopUp+UC&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 py-3 rounded-lg font-bold text-sm shadow-md transition-all"
        >
          TopUp
        </motion.a>
      </motion.div>
    </div>
  );
}
