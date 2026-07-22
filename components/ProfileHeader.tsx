// components/ProfileHeader.tsx
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

interface ProfileProps {
  profile: {
    name: string;
    bio?: string | null;
    avatarUrl?: string | null;
    bannerUrl?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
  };
}

export default function ProfileHeader({ profile }: ProfileProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
      {/* 1. Banner */}
      <div className="h-32 w-full relative">
        <img
          src={profile.bannerUrl || "/default-banner.png"}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Avatar & Info */}
      <div className="flex flex-col items-center -mt-12 pb-6 px-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-900 relative">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nama & Bio */}
        <h1 className="text-xl font-bold text-white mt-2">{profile.name}</h1>
        {profile.bio && (
          <p className="text-sm text-slate-400 mt-1">{profile.bio}</p>
        )}

        {/* 3. Social Media Buttons */}
        <div className="flex gap-3 mt-4">
          {profile.whatsapp && (
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          )}

          {profile.instagram && (
            <a
              href={`https://instagram.com/${profile.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
