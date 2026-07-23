import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { Plus } from "lucide-react";

import DeleteProductButton from "@/components/DeleteProductButton";
import SearchInput from "@/components/SearchInput";

// Fungsi untuk mengambil data produk dari DB
async function getProducts(searchQuery?: string) {
  const products = await prisma.product.findMany({
    where: searchQuery
      ? {
          title: {
            contains: searchQuery,
          },
        }
      : undefined,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; // 👈 1. Ubah tipe menjadi Promise
}) {
  // 🟢 2. Unwrap searchParams menggunakan `await`
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q || "";

  // 3. Ambil data berdasarkan query pencarian
  const products = await getProducts(query);

  // Helper formatting Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="p-6 bg-[#0f111a] min-h-screen text-slate-100">
      {/* Header & Action */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Form Pencarian */}
          <SearchInput defaultValue={query} />

          {/* Tombol Tambah Produk */}
          <Link
            href="/admin/products/add-products"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Tambah Produk
          </Link>
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="bg-[#181b29] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#131522] text-slate-400">
                <th className="p-4 font-semibold">Nama Produk</th>
                <th className="p-4 font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Harga</th>
                <th className="p-4 font-semibold">Badge</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-800/30 transition duration-150"
                  >
                    <td className="p-4 font-medium text-slate-200">
                      {product.title || (
                        <span className="text-red-400 italic">Tanpa Nama</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-400">
                      {product.category.name}
                    </td>
                    <td className="p-4 text-slate-200 font-medium">
                      {formatRupiah(Number(product.price))}
                    </td>
                    <td className="p-4">
                      {product.badge ? (
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded border ${
                            product.badge === "HOT"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          }`}
                        >
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="text-slate-400 hover:text-indigo-400 transition"
                          title="Edit"
                        >
                          <FiEdit size={16} />
                        </Link>

                        {/* Tombol Delete (Action) */}
                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-slate-500 text-sm"
                  >
                    Tidak ada produk ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
