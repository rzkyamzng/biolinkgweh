"use client";

import { useState } from "react";
import { Save, Palette, Link2, Image as ImageIcon, Search } from "lucide-react";

export default function BrandingSettingsPage() {
  const [siteUrl, setSiteUrl] = useState("https://anomalygame.com");
  const [faviconUrl, setFaviconUrl] = useState(
    "https://link.com/icon-32x32.png",
  );
  const [themeColor, setThemeColor] = useState("#4f46e5");
  const [allowIndexing, setAllowIndexing] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Berhasil! Data Branding & Indexing siap disimpan.");
  };

  return (
    <div className="max-w-4xl p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Branding & Indexing
            </h1>
            <p className="text-sm text-gray-500">
              Atur identitas visual web dan visibilitas di mesin pencari.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Link2 className="w-4 h-4 text-indigo-500" /> Canonical / Site
                URL
              </label>
              <input
                type="url"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4 text-indigo-500" /> Favicon URL
              </label>
              <input
                type="text"
                value={faviconUrl}
                onChange={(e) => setFaviconUrl(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Palette className="w-4 h-4 text-indigo-500" /> Theme Color
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-12 h-10 p-1 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg uppercase outline-none text-gray-800"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Search className="w-4 h-4 text-indigo-500" /> Search Engine
                Visibility
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 h-[46px]">
                <input
                  type="checkbox"
                  checked={allowIndexing}
                  onChange={(e) => setAllowIndexing(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded"
                />
                <span className="text-sm text-gray-600 font-medium">
                  {allowIndexing ? "Diizinkan (Index)" : "Dilarang (NoIndex)"}
                </span>
              </label>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              <Save className="w-5 h-5" /> Simpan Branding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
