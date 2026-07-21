"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
  name: string;
  bio: string;
  avatar: string;
  banner: string; // <-- Tambahkan parameter ini
  socials: Array<{ platform: string; url: string }>;
}) {
  try {
    const user = await prisma.user.findFirst();

    if (!user) {
      await prisma.user.create({
        data: {
          name: data.name,
          bio: data.bio,
          avatarUrl: data.avatar,
          bannerUrl: data.banner,
          socials: {
            create: data.socials.map((s) => ({
              platform: s.platform,
              url: s.url,
            })),
          },
        },
      });
    } else {
      await prisma.socialLink.deleteMany({
        where: { userId: user.id },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: data.name,
          bio: data.bio,
          avatarUrl: data.avatar,
          bannerUrl: data.banner,
          socials: {
            create: data.socials.map((s) => ({
              platform: s.platform,
              url: s.url,
            })),
          },
        },
      });
    }

    revalidatePath("/admin/profile");
    return { success: true, message: "Profil berhasil tersimpan!" };
  } catch (error) {
    console.error("Error updateProfile:", error);
    return { success: false, message: "Gagal menyimpan ke database." };
  }
}
