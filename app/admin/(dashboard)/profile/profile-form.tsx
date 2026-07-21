"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { updateProfile } from "./actions";

interface ProfileFormProps {
  initialData?: {
    name?: string;
    avatarUrl?: string;
    bannerUrl?: string;
    bio?: string;
    socials?: { platform: string; url: string }[];
  };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatarUrl || "");
  const [bannerUrl, setBannerUrl] = useState(initialData?.bannerUrl || ""); // State Banner URL
  const [bio, setBio] = useState(initialData?.bio || "");
  const [socials, setSocials] = useState(initialData?.socials || []);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const res = await updateProfile({
      name,
      bio,
      avatar: avatarUrl,
      banner: bannerUrl, // Kirim data banner URL
      socials,
    });

    if (res.success) {
      setMessage("✅ Profile berhasil tersimpan!");
    } else {
      setMessage("❌ " + res.message);
    }
    setSaving(false);
  };

  const handleAddSocial = () => {
    setSocials([...socials, { platform: "", url: "" }]);
  };

  const handleRemoveSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const handleSocialChange = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updated = [...socials];
    updated[index][field] = value;
    setSocials(updated);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
      </div>

      {message && (
        <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {/* Nama Lengkap */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Avatar URL & Banner URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Avatar URL
            </label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Banner URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Social Links */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">
              Social Media Links
            </h3>
            <button
              type="button"
              onClick={handleAddSocial}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-2.5 py-1 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Social
            </button>
          </div>

          {socials.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Platform"
                value={item.platform}
                onChange={(e) =>
                  handleSocialChange(index, "platform", e.target.value)
                }
                className="w-1/3 border rounded-xl p-2.5 text-sm"
              />
              <input
                type="text"
                placeholder="URL"
                value={item.url}
                onChange={(e) =>
                  handleSocialChange(index, "url", e.target.value)
                }
                className="w-2/3 border rounded-xl p-2.5 text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveSocial(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Tombol Simpan */}
        <div className="pt-4 border-t">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Menyimpan..." : "Simpan Profil"}
          </button>
        </div>
      </div>
    </div>
  );
}
