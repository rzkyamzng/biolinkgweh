import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan lokasi prisma client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, categoryId, badge, images } = body;

    if (!title || !description || !price || !categoryId || !images?.length) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        categoryId,
        badge: badge || null,
        images: {
          create: images.map((url: string) => ({ url })),
        },
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menambah produk", error },
      { status: 500 },
    );
  }
}
