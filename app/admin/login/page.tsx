"use client";

import { useState, useEffect } from "react";
import { useBiolink } from "@/context/BiolinkContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useBiolink();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Jika sudah terautentikasi, redirect langsung ke halaman admin
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi loading delay 800ms agar terasa premium
    setTimeout(() => {
      const success = login(password);
      setIsLoading(false);
      if (success) {
        router.push("/admin");
      } else {
        setError("Password salah. Silakan coba lagi.");
      }
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-4 relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-950/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-slate-900/40 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/[0.06] rounded-[28px] p-8 backdrop-blur-2xl shadow-2xl relative z-10"
      >
        {/* Back to Home Tautan */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Biolink
        </Link>

        {/* Header Title */}
        <div className="space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Gate</h1>
          <p className="text-xs text-slate-400">
            Masukkan password master untuk masuk ke control panel.
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500 rounded-xl pl-4 pr-11 py-3 text-sm outline-none transition text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Animasi Pesan Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 bg-red-950/30 border border-red-800/40 rounded-xl text-xs text-red-400"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/10 transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Masuk ke Dashboard"
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
