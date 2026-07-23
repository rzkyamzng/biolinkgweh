"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) return;

  try {
    // Hapus produk dari database
    await prisma.product.delete({
      where: { id },
    });

    // Revalidate cache agar data di halaman tabel otomatis hilang tanpa reload manual
    revalidatePath("/admin/products/list");
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
  }
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const badge = formData.get("badge") as string;
  const price = parseFloat(formData.get("price") as string);

  // Update data ke database
  await prisma.product.update({
    where: { id },
    data: {
      title,
      description,
      categoryId,
      badge: badge || null,
      price,
    },
  });

  // Revalidate cache agar data di halaman list produk terbarui
  revalidatePath("/admin/products/list");

  // Kembalikan user ke halaman list produk
  redirect("/admin/products/list");
}
