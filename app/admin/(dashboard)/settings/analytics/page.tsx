"use client";

import { useState } from "react";
import {
  Save,
  BarChart,
  Globe,
  Share2,
  Facebook,
  Activity,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function AnalyticsPixelPage() {
  const [ogImage, setOgImage] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [googleSiteVerification, setGoogleSiteVerification] = useState("");
  const [facebookPixelId, setFacebookPixelId] = useState("");
  const [tiktokPixelId, setTiktokPixelId] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Berhasil! Data Analytics & Pixel siap disimpan.");
  };

  return (
    <div className="max-w-4xl p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <BarChart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Analytics & Pixel
            </h1>
            <p className="text-sm text-gray-500">
              Konfigurasi sosial media sharing, pelacakan trafik, dan Pixel
              tracking.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            {/* OG Image */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                <Share2 className="w-4 h-4 text-indigo-500" />
                Open Graph Image URL (Gambar Preview WA/IG)
              </label>
              <span className="block text-xs text-gray-500 font-normal mb-3">
                Link gambar banner (Rekomendasi ukuran: 1200 x 630 px).
              </span>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 bg-white"
                placeholder="https://contoh.com/banner-sosmed.png"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Analytics */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <BarChart className="w-4 h-4 text-indigo-500" />
                  Google Analytics ID
                </label>
                <span className="block text-xs text-gray-500 font-normal mb-3">
                  Format: G-XXXXXXXXXX
                </span>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 bg-white"
                  placeholder="G-..."
                />
              </div>

              {/* Google Search Console */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  Google Site Verification
                </label>
                <span className="block text-xs text-gray-500 font-normal mb-3">
                  Meta tag untuk Search Console
                </span>
                <input
                  type="text"
                  value={googleSiteVerification}
                  onChange={(e) => setGoogleSiteVerification(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 bg-white"
                  placeholder="Ketik kode verifikasinya di sini..."
                />
              </div>

              {/* Facebook Pixel */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <FaFacebook className="w-4 h-4 text-blue-600" />
                  Facebook Pixel ID
                </label>
                <span className="block text-xs text-gray-500 font-normal mb-3">
                  Untuk tracking Ads FB/IG
                </span>
                <input
                  type="text"
                  value={facebookPixelId}
                  onChange={(e) => setFacebookPixelId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 bg-white"
                  placeholder="Contoh: 123456789012345"
                />
              </div>

              {/* TikTok Pixel */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <Activity className="w-4 h-4 text-black" />
                  TikTok Pixel ID
                </label>
                <span className="block text-xs text-gray-500 font-normal mb-3">
                  Untuk tracking Ads TikTok
                </span>
                <input
                  type="text"
                  value={tiktokPixelId}
                  onChange={(e) => setTiktokPixelId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 bg-white"
                  placeholder="Contoh: C1234567890ABC..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95 w-full sm:w-auto"
            >
              <Save className="w-5 h-5" />
              Simpan Analytics & Pixel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
