// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password '123456' (atau password pilihan kamu)
  const hashedPassword = await bcrypt.hash("123456", 10);

  // Hapus user lama biar bersih
  await prisma.user.deleteMany();

  // Buat user admin baru
  await prisma.user.create({
    data: {
      email: "anomalygs@gmail.com", // <-- PASTIKAN EMAIL INI SAMA DENGAN FORM LOGIN
      name: "Anomaly Game Supply",
      password: hashedPassword, // <-- PASSWORD HARUS TER-HASH DENGAN BCRYPTS
    },
  });

  console.log("✅ Admin berhasil di-seed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
