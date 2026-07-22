"use client";

import { useState } from "react";

interface HomeClientProps {
  user: {
    name?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    bannerUrl?: string | null;
    socials?: { platform: string; url: string }[];
  } | null;
}

export default function HomeClient({ user }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      {/* Profil Header */}
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 mb-8">
        {/* Banner */}
        <div className="h-40 w-full bg-slate-800 relative">
          {user?.bannerUrl && (
            <img
              src={user.bannerUrl}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Avatar & Detail */}
        <div className="px-6 pb-6 relative flex flex-col items-center sm:items-start sm:flex-row gap-4 -mt-12">
          <div className="w-24 h-24 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 shrink-0">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user?.name || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                NO IMG
              </div>
            )}
          </div>

          <div className="mt-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold">
              {user?.name || "Nama Belum Diatur"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {user?.bio || "Belum ada bio"}
            </p>

            {/* Social Links */}
            {user?.socials && user.socials.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap justify-center sm:justify-start">
                {user.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-700 transition"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bagian Filter / Search kamu */}
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Cari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}
