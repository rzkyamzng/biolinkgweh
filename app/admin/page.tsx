"use client";

import { useBiolink } from "@/context/BiolinkContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save, Eye, LogOut } from "lucide-react";
import { SocialLink } from "@/types/biolink";

export default function AdminPage() {
  const { data, isAuthenticated, logout, updateData, updateLinks } =
    useBiolink();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Local state form inputs
  const [profileForm, setProfileForm] = useState({
    name: data.name,
    bio: data.bio,
    avatarUrl: data.avatarUrl,
    bannerUrl: data.bannerUrl,
    whatsappNumber: data.whatsappNumber,
    whatsappMessage: data.whatsappMessage,
  });

  const [linksForm, setLinksForm] = useState<SocialLink[]>([...data.links]);
  const [isSaved, setIsSaved] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-500">
        Memeriksa hak akses...
      </div>
    );
  }

  // Handle input perubahan profil dasar
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle perubahan pada item array tautan
  const handleLinkItemChange = (
    id: string,
    field: "title" | "url",
    value: string,
  ) => {
    setLinksForm((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const addNewLinkField = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      title: "",
      url: "",
    };
    setLinksForm((prev) => [...prev, newLink]);
  };

  const removeLinkField = (id: string) => {
    setLinksForm((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(profileForm);
    updateLinks(linksForm);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        {/* Top Navbar Admin */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Biolink Admin Dashboard
              </h1>
              <p className="text-xs text-slate-400">
                Sesuaikan profil biolink Anda secara real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm transition"
            >
              <Eye className="w-4 h-4" /> Pratinjau
            </Link>
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 font-medium rounded-xl text-sm shadow-lg shadow-purple-600/10 transition"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="p-2 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 rounded-xl text-red-400 transition"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSaved && (
          <div className="mb-6 p-4 bg-green-950/40 border border-green-800/50 rounded-xl text-sm text-green-400 flex items-center">
            ✓ Perubahan berhasil disimpan dan diterapkan pada halaman utama.
          </div>
        )}

        {/* Core Layout Panels */}
        <form
          onSubmit={handleSaveChanges}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Kiri: Ringkasan Pengaturan Profil */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-white">
                Informasi Utama & Media
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Nama Profil
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Nomor WhatsApp (Kode Negara)
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={profileForm.whatsappNumber}
                    onChange={handleProfileChange}
                    placeholder="Contoh: 628123456789"
                    className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Bio Singkat
                </label>
                <textarea
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  rows={3}
                  className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  URL Gambar Banner
                </label>
                <input
                  type="url"
                  name="bannerUrl"
                  value={profileForm.bannerUrl}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  URL Foto Profil Avatar
                </label>
                <input
                  type="url"
                  name="avatarUrl"
                  value={profileForm.avatarUrl}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Template Pesan WhatsApp Otomatis
                </label>
                <input
                  type="text"
                  name="whatsappMessage"
                  value={profileForm.whatsappMessage}
                  onChange={handleProfileChange}
                  className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Kanan: Manajemen Tautan (Daftar Link) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">
                  Daftar Tautan
                </h2>
                <button
                  type="button"
                  onClick={addNewLinkField}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-purple-400 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Link
                </button>
              </div>

              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {linksForm.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-6">
                    Belum ada tautan tambahan.
                  </p>
                ) : (
                  linksForm.map((link, index) => (
                    <div
                      key={link.id}
                      className="p-4 bg-slate-950 rounded-xl border border-white/5 relative group space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">
                          LINK #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeLinkField(link.id)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Judul Tautan (e.g., Website Utama)"
                        value={link.title}
                        onChange={(e) =>
                          handleLinkItemChange(link.id, "title", e.target.value)
                        }
                        className="w-full bg-slate-900 border border-white/5 focus:border-purple-500 rounded-lg px-3 py-1.5 text-xs outline-none transition text-white"
                        required
                      />
                      <input
                        type="url"
                        placeholder="URL Tujuan (https://...)"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkItemChange(link.id, "url", e.target.value)
                        }
                        className="w-full bg-slate-900 border border-white/5 focus:border-purple-500 rounded-lg px-3 py-1.5 text-xs outline-none transition text-slate-300"
                        required
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
