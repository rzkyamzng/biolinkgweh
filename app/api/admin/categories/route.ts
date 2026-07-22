import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper untuk membuat slug (contoh: "Akun Game" -> "akun-game")
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Hapus karakter non-alphanumeric
    .replace(/[\s_-]+/g, "-") // Ganti spasi/underscore dengan strip (-)
    .replace(/^-+|-+$/g, ""); // Hapus strip di awal dan akhir
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("GET Category Error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal mengambil data kategori" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Nama kategori wajib diisi" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();
    const slug = createSlug(trimmedName); // Generate slug otomatis

    const newCategory = await prisma.category.create({
      data: {
        name: trimmedName,
        slug: slug, // 👈 Nilai slug wajib dikirim ke Prisma
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("POST Category Error:", error);
    return NextResponse.json(
      { message: error?.message || "Gagal menyimpan kategori" },
      { status: 500 },
    );
  }
}
