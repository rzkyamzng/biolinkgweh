/** @type {import('next').NextConfig} */
const nextconfig = {
  typescript: {
    // !! PERINGATAN !!
    // Mengizinkan build selesai meskipun ada kesalahan TypeScript.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mengabaikan error ESLint saat build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextconfig;
