import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProduct } from "../../actions"; // 👈 Import Server Action

function stripHtml(html: string) {
  if (!html) return "";
  return html
    .replace(/<\/(p|div|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch product & categories...
  const product = await prisma.product.findUnique({ where: { id } });
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!product) notFound();

  return (
    <div className="p-6 bg-[#0f111a] min-h-screen text-slate-100">
      <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>

      {/* 🔴 Tambahkan action={updateProduct} di sini */}
      <form
        action={updateProduct}
        className="max-w-2xl bg-[#181b29] p-6 rounded-xl border border-slate-800 space-y-5 shadow-xl"
      >
        {/* Input Hidden untuk ID Produk */}
        <input type="hidden" name="id" value={product.id} />

        {/* 1. Nama Produk */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-300">
            Nama Produk (Title)
          </label>
          <input
            type="text"
            name="title"
            defaultValue={product.title}
            className="w-full bg-[#0f111a] border border-slate-700/60 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            required
          />
        </div>

        {/* 2. Deskripsi */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-300">
            Deskripsi
          </label>
          <textarea
            name="description"
            rows={8}
            defaultValue={stripHtml(product.description)}
            className="w-full bg-[#0f111a] border border-slate-700/60 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition resize-y"
            required
          />
        </div>

        {/* 3. Kategori & Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">
              Kategori
            </label>
            <select
              name="categoryId"
              defaultValue={product.categoryId}
              className="w-full bg-[#0f111a] border border-slate-700/60 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-300">
              Badge
            </label>
            <input
              type="text"
              name="badge"
              defaultValue={product.badge || ""}
              className="w-full bg-[#0f111a] border border-slate-700/60 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* 4. Harga */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-300">
            Harga (IDR)
          </label>
          <input
            type="number"
            name="price"
            defaultValue={Number(product.price)}
            className="w-full bg-[#0f111a] border border-slate-700/60 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition shadow-lg shadow-indigo-600/20"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
