"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();

  // State Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle Upload/Preview Gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic kirim data ke API / Database
    const payload = {
      title,
      description,
      category,
      price: Number(price),
      badge,
      image: imagePreview,
    };
    console.log("Data Produk:", payload);

    // Redirect kembali ke daftar produk setelah sukses
    router.push("/admin/products/list");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      {/* Header & Back Button */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Produk</span>
        </button>
        <h1 className="text-2xl font-bold">Tambah Produk Baru</h1>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 shadow-xl space-y-6"
      >
        {/* 1. Nama / Judul Produk */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">
            Nama / Judul Produk <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: PUBG Mobile Account Conqueror S18"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* 2. Text-Editor / Deskripsi Produk */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">
            Deskripsi Produk
          </label>
          {/* Untuk rich-text editor sungguhan, Anda dapat mengintegrasikan pustaka seperti @tiptap/react, Quill, atau CKEditor */}
          <textarea
            rows={5}
            placeholder="Tuliskan deskripsi lengkap mengenai produk di sini..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-y"
          />
        </div>

        {/* Grid 2 Kolom untuk Kategori, Harga, & Badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 4. Pemilihan Kategori */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Akun Game">Akun Game</option>
              <option value="Akun Premium">Akun Premium</option>
              <option value="Voucher Game">Voucher Game</option>
              <option value="Jasa Top Up">Jasa Top Up</option>
            </select>
          </div>

          {/* 5. Harga */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Harga (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* 6. Pemilihan Badge */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Badge Produk
            </label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">Tanpa Badge</option>
              <option value="HOT ITEM">HOT ITEM</option>
              <option value="BEST SELLER">BEST SELLER</option>
              <option value="PROMO">PROMO</option>
              <option value="NEW">NEW</option>
            </select>
          </div>
        </div>

        {/* 3. Upload Gambar Produk */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">
            Gambar Produk
          </label>
          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-lg p-6 text-center cursor-pointer transition-colors relative bg-slate-900/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-lg object-contain border border-slate-700"
                />
                <span className="text-xs text-indigo-400">
                  Klik atau drag file baru untuk mengganti gambar
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                <Upload size={32} className="text-indigo-400 mb-1" />
                <p className="text-sm font-medium text-slate-200">
                  Upload file atau tarik file ke sini
                </p>
                <p className="text-xs text-slate-500">
                  PNG, JPG, WEBP hingga 5MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-700/60">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-700/50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-600/30"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  );
}
