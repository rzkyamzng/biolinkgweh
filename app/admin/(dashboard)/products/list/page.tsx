"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, X, Check } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  badge: string;
}

export default function ProductsListPage() {
  // State untuk data produk
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "PUBG Mobile Account Conqueror S18",
      category: "Akun Game",
      price: 2500000,
      badge: "HOT ITEM",
    },
    {
      id: "2",
      name: "Canva Pro 1 Tahun Private",
      category: "Akun Premium",
      price: 45000,
      badge: "BEST SELLER",
    },
  ]);

  // State untuk Pencarian
  const [search, setSearch] = useState("");

  // State untuk Modal Tambah/Edit Produk
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Akun Game",
    price: "",
    badge: "HOT ITEM",
  });

  // Filter produk berdasarkan input pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Buka Modal untuk Tambah
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Akun Game",
      price: "",
      badge: "HOT ITEM",
    });
    setIsModalOpen(true);
  };

  // Buka Modal untuk Edit
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      badge: product.badge,
    });
    setIsModalOpen(true);
  };

  // Fungsi Hapus Produk
  const handleDelete = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Fungsi Simpan (Tambah / Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Harap isi nama dan harga produk!");
      return;
    }

    if (editingProduct) {
      // Logic Update
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                badge: formData.badge,
              }
            : p,
        ),
      );
    } else {
      // Logic Tambah
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        badge: formData.badge,
      };
      setProducts([...products, newProduct]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tombol Tambah */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Daftar Produk</h1>
        <Link
          href="/admin/products/add-products"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Produk
        </Link>
      </div>

      {/* Input Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b text-slate-700 font-semibold">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Badge</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-900">
                    {item.name}
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>
                  <td className="p-4">
                    <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">
                      {item.badge}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      title="Edit Produk"
                      className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Hapus Produk"
                      className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-8 text-slate-400">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM (TAMBAH / EDIT PRODUK) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
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
                  Nama Produk
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Misal: Canva Pro 1 Bulan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Akun Game">Akun Game</option>
                  <option value="Akun Premium">Akun Premium</option>
                  <option value="Voucher">Voucher</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="45000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Badge Status
                </label>
                <select
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="HOT ITEM">HOT ITEM</option>
                  <option value="BEST SELLER">BEST SELLER</option>
                  <option value="MURAH">MURAH</option>
                </select>
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
