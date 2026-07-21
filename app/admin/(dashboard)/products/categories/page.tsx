"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, FolderTree, Search, X, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoriesPage() {
  // State Data Kategori
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Akun Game", slug: "akun-game" },
    { id: "2", name: "Akun Premium", slug: "akun-premium" },
    { id: "3", name: "Voucher", slug: "voucher" },
  ]);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  // Otomatis buat slug saat nama diisi
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData({ name, slug });
  };

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Nama kategori wajib diisi!");
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formData.name, slug: formData.slug }
            : c,
        ),
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      };
      setCategories([...categories, newCategory]);
    }

    setIsModalOpen(false);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Kategori Produk
            </h1>
            <p className="text-sm text-slate-500">
              Kelola daftar kategori untuk pengelompokan produk.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      {/* Input Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tabel Kategori */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b text-slate-700 font-semibold">
            <tr>
              <th className="p-4">Nama Kategori</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-900">
                    {item.name}
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-600 font-mono text-xs px-2.5 py-1 rounded">
                      /{item.slug}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      title="Edit Kategori"
                      className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Hapus Kategori"
                      className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-8 text-slate-400">
                  Tidak ada kategori ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Misal: Akun Game"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-mono"
                  placeholder="akun-game"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
