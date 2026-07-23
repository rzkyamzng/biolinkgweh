import { prisma } from "@/lib/prisma";
import BiolinkClient from "@/components/public/BiolinkClient";
import ProductClient from "@/components/public/ProductClient";
import Blacklist from "@/components/public/Blacklist";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Ambil data user (Anomaly Game Supply) beserta link sosialnya dari SQLite
  const userData = await prisma.user.findFirst({
    include: {
      socials: true,
    },
  });

  const productsData = await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesData = await prisma.category.findMany({
    orderBy: { name: "desc" },
  });

  // Tampilkan seluruh desain aslimu yang sudah utuh, sambil mengirim data dari database
  return (
    <main className="relative w-full min-h-screen bg-[#0d0d11] text-white antialiased font-sans p-4 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="w-full h-full relative flex flex-col items-center justify-start *:select-none max-w-xl mx-auto">
        <BiolinkClient userData={userData} />
        <ProductClient products={productsData} categories={categoriesData} />
        <Blacklist />
      </div>
    </main>
  );
}
