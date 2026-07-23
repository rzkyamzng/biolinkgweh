"use server";

// Sesuaikan import prisma ini dengan lokasi file prisma client-mu.
// Biasanya ada di "@/lib/prisma" atau langsung inisialisasi baru jika belum ada.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Fungsi untuk mengambil data pengaturan
export async function getSettings() {
  try {
    const settings = await prisma.setting.findFirst({
      where: { id: 1 },
    });
    return settings;
  } catch (error) {
    console.error("Gagal mengambil settings:", error);
    return null;
  }
}

// Fungsi untuk menyimpan/Update Meta Settings
export async function updateMetaSettings(data: {
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
}) {
  try {
    // Upsert = Update jika ada, Create jika belum ada
    const updated = await prisma.setting.upsert({
      where: { id: 1 },
      update: {
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      },
      create: {
        id: 1,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      },
    });
    return { success: true, data: updated };
  } catch (error) {
    console.error("Gagal menyimpan meta settings:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}
