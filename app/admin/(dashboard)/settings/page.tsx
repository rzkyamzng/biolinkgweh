"use client";

import { useForm } from "react-hook-form";
import { Save } from "lucide-react";

interface SEOFormValues {
  metaTitle: string;
  metaKeyword: string;
  metaDesc: string;
}

export default function SettingsPage() {
  const { register, handleSubmit } = useForm<SEOFormValues>({
    defaultValues: {
      metaTitle: "Anomaly Game Supply - Jual Akun & TopUp",
      metaKeyword: "pubg, mobile legends, canva pro, capcut pro",
      metaDesc:
        "Penyedia layanan top up dan jual beli akun game/premium terpercaya.",
    },
  });

  const onSubmit = (data: SEOFormValues) => {
    console.log("SEO Data:", data);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">
        Pengaturan SEO Website
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Meta Title
          </label>
          <input
            {...register("metaTitle")}
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Meta Keywords (Pisahkan dengan koma)
          </label>
          <input
            {...register("metaKeyword")}
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Meta Description
          </label>
          <textarea
            {...register("metaDesc")}
            rows={4}
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-4 h-4" /> Simpan Konfigurasi
        </button>
      </form>
    </div>
  );
}
