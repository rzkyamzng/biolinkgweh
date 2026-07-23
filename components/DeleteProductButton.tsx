"use client";

import { FiTrash2 } from "react-icons/fi";
import { deleteProduct } from "@/app/admin/(dashboard)/products/actions";

export default function DeleteProductButton({ id }: { id: string }) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?",
    );

    if (confirmed) {
      const formData = new FormData();
      formData.append("id", id);
      await deleteProduct(formData);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="text-slate-400 hover:text-red-400 transition"
        title="Hapus"
      >
        <FiTrash2 size={16} />
      </button>
    </form>
  );
}
