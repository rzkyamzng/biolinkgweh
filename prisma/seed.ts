// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password terlebih dahulu
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Email yang ingin didaftarkan sebagai Admin
  const email = "anomalygs@gmail.com";

  // Hapus user lama jika ada (agar tidak konflik)
  await prisma.user.deleteMany({
    where: { email },
  });

  // Buat akun Admin baru
  const admin = await prisma.user.create({
    data: {
      name: "Anomaly Admin",
      email: email,
      password: hashedPassword,
      role: "ADMIN",
      profile: {
        create: {
          bio: "Administrator Anomaly Game Supply",
        },
      },
    },
  });

  console.log("✅ Akun Admin berhasil dibuat:", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
