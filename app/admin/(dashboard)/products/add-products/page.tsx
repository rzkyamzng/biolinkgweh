"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

interface Category {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load categories
  useEffect(() => {
    fetch("/api/admin/categories")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Multi Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.urls) {
        setImages((prev) => [...prev, ...data.urls]);
      }
    } catch (err) {
      alert("Gagal mengunggah gambar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !price ||
      !categoryId ||
      images.length === 0
    ) {
      alert("Harap lengkapi semua data wajib!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          categoryId,
          badge,
          images,
        }),
      });

      if (res.ok) {
        alert("Produk berhasil ditambahkan!");
        router.push("/admin/products");
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan produk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold">Tambah Produk Baru</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
        >
          Kembali ke Daftar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Judul Produk */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Nama / Judul Produk *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: M4 GLACIER KILLMESS"
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* 2. Deskripsi (Rich Text) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Deskripsi Produk *
          </label>
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        {/* 3. Kategori, Harga, & Badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kategori *</label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Harga (Rp) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1530000"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Badge Produk
            </label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">Tanpa Badge</option>
              <option value="NEW">NEW</option>
              <option value="HOT ITEM">HOT ITEM</option>
              <option value="BEST SELLER">BEST SELLER</option>
              <option value="PROMO">PROMO</option>
            </select>
          </div>
        </div>

        {/* 4. Multiple Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gambar Produk (Bisa pilih banyak) *
          </label>
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-indigo-500 transition cursor-pointer relative bg-slate-800/30">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-slate-400">
              {isUploading
                ? "Mengunggah gambar..."
                : "Klik atau tarik beberapa gambar ke sini"}
            </p>
          </div>

          {/* Preview Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((url, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-slate-700 aspect-video"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
