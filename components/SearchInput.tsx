"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Fungsi debounce sederhana
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      // Memperbarui URL tanpa membuat halaman reload ulang sepenuhnya
      replace(`${pathname}?${params.toString()}`);
    });
  };

  // Custom debounce handler agar tidak query di setiap keystroke
  let timeoutId: NodeJS.Timeout;
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    const value = e.target.value;
    timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300); // Jeda 300ms setelah user berhenti mengetik
  };

  return (
    <div className="relative flex-1 md:w-80">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={onInputChange}
        placeholder="Cari produk berdasarkan nama..."
        className="w-full bg-[#181b29] border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-400 animate-pulse">
          Mencari...
        </span>
      )}
    </div>
  );
}
