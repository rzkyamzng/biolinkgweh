"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // State Modal / Form Tambah Kategori
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Data Kategori dari Database
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Tambah Kategori
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });

      const data = await res.json();

      if (res.ok) {
        setNewCategoryName("");
        setIsModalOpen(false);
        fetchCategories(); // Refresh list
      } else {
        // Tampilkan pesan error spesifik dari backend
        alert(data.message || "Gagal membuat kategori");
      }
    } catch (error) {
      console.error("Client Submit Error:", error);
      alert("Gagal terhubung ke server. Periksa jaringan/API Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Hapus Kategori
  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus kategori "${name}"?`))
      return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCategories(); // Refresh data
      } else {
        alert("Gagal menghapus kategori");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus kategori");
    }
  };

  // Filter pencarian
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Kategori Produk</h1>
          <p className="text-slate-400 text-sm">
            Kelola daftar kategori untuk pengelompokan produk.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-lg transition"
        >
          + Tambah Kategori
        </button>
      </div>

      {/* Bar Pencarian */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-6">
        <input
          type="text"
          placeholder="Cari kategori..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Tabel Kategori */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-slate-200 border-b border-slate-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nama Kategori</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-slate-500">
                  Memuat data...
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-slate-500">
                  Tidak ada kategori ditemukan.
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat) => {
                const slug = `/${cat.name.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <tr key={cat.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-medium text-white">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="bg-slate-800 px-2.5 py-1 rounded-md text-xs font-mono">
                        {slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Kategori */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Tambah Kategori Baru</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Contoh: Voucher Game"
                  className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
