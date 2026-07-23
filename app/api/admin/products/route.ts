import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🟢 Menangani Method POST (Tambah Produk Baru)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, categoryId, badge, images } = body;

    // Validasi sederhana
    if (!title || !description || !price || !categoryId) {
      return NextResponse.json(
        { message: "Mohon lengkapi semua field yang wajib diisi" },
        { status: 400 },
      );
    }

    // Simpan ke database menggunakan Prisma
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        categoryId,
        badge: badge || null,
        // Jika kamu mengunggah gambar yang terhubung ke model ProductImage:
        images:
          images && images.length > 0
            ? {
                create: images.map((url: string) => ({ url })),
              }
            : undefined,
      },
    });

    return NextResponse.json(
      { message: "Produk berhasil ditambahkan", data: newProduct },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan produk", error: String(error) },
      { status: 500 },
    );
  }
}
