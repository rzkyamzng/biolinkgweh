"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah!");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header Form */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-xl mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
          <p className="text-sm text-slate-500">
            Masukan kredensial akun kamu untuk mengakses panel admin.
          </p>
        </div>

        {/* Alert Error */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk ke Panel Admin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
