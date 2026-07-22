import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus kategori", error },
      { status: 500 },
    );
  }
}
