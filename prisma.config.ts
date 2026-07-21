// prisma.config.ts
import { defineConfig } from "@prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: {
    kind: "multi-file", // atau hapus jika schema kamu hanya 1 file
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
