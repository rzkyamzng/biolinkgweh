"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Loader2 } from "lucide-react";
// Import fungsi database yang baru kita buat
import { getSettings, updateMetaSettings } from "@/app/actions/settings";

export default function MetaSettingsPage() {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Ambil data dari database saat halaman pertama kali dimuat
  useEffect(() => {
    async function fetchData() {
      const data = await getSettings();
      if (data) {
        setMetaTitle(data.metaTitle || "");
        setMetaKeywords(data.metaKeywords || "");
        setMetaDescription(data.metaDescription || "");
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Fungsi saat tombol simpan diklik
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateMetaSettings({
        metaTitle,
        metaKeywords,
        metaDescription,
      });

      if (result.success) {
        alert("Berhasil! Meta Settings telah disimpan ke database.");
      } else {
        alert("Oops! Terjadi kesalahan di server: " + result.error);
      }
    } catch (error) {
      console.error("Error dari frontend:", error);
      alert("Terjadi kesalahan sistem. Coba periksa terminal VS Code.");
    } finally {
      // finally memastikan isSaving selalu dikembalikan ke false,
      // entah prosesnya berhasil atau gagal. Jadi tombol gak akan nyangkut!
      setIsSaving(false);
    }
  };

  // Tampilkan loading spinner jika data sedang diambil
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Meta Settings</h1>
            <p className="text-sm text-gray-500">
              Atur judul dan deskripsi teks untuk mesin pencari.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              placeholder="Contoh: Anomaly Game Supply"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              placeholder="game, topup, murah..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-gray-800"
              placeholder="Deskripsi websitemu..."
            />
          </div>
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? "Menyimpan..." : "Simpan Meta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
