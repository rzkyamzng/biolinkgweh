"use client";

import { useState } from "react";
import { Save, Smartphone, Code, Bot } from "lucide-react";

export default function PwaSettingsPage() {
  const [pwaShortName, setPwaShortName] = useState("Anomaly GS");
  const [pwaDescription, setPwaDescription] = useState(
    "Toko Top Up Terpercaya",
  );
  const [schemaMarkup, setSchemaMarkup] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Berhasil! Data PWA Manifest siap disimpan.");
  };

  return (
    <div className="max-w-4xl p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              PWA Manifest & Advanced
            </h1>
            <p className="text-sm text-gray-500">
              Konfigurasi App Install (PWA), Schema, dan Robots Crawler.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Smartphone className="w-4 h-4 text-indigo-500" /> PWA App Short
                Name
              </label>
              <input
                type="text"
                value={pwaShortName}
                onChange={(e) => setPwaShortName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Smartphone className="w-4 h-4 text-indigo-500" /> PWA App
                Description
              </label>
              <input
                type="text"
                value={pwaDescription}
                onChange={(e) => setPwaDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Code className="w-4 h-4 text-indigo-500" /> Schema Markup
                (JSON-LD)
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 h-[46px]">
                <input
                  type="checkbox"
                  checked={schemaMarkup}
                  onChange={(e) => setSchemaMarkup(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded"
                />
                <span className="text-sm text-gray-600 font-medium">
                  {schemaMarkup
                    ? "Aktif (Tampilkan Rich Snippets)"
                    : "Nonaktif"}
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Bot className="w-4 h-4 text-indigo-500" /> Robots Crawl Rule
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 h-[46px]">
                <input
                  type="checkbox"
                  checked={robotsFollow}
                  onChange={(e) => setRobotsFollow(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded"
                />
                <span className="text-sm text-gray-600 font-medium">
                  {robotsFollow ? "Follow (Telusuri semua link)" : "NoFollow"}
                </span>
              </label>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors"
            >
              <Save className="w-5 h-5" /> Simpan PWA & Advanced
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
