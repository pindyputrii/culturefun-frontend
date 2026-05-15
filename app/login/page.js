"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Lock, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");

        router.push("/admin");
      } else {
        setError(data.message);

        setLoading(false);
      }
    } catch (err) {
      setError("Server error");

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6fa] flex items-center justify-center px-6 py-10 overflow-hidden relative">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-orange opacity-30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#0A1E4A] opacity-20 rounded-full blur-3xl"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-[45px] overflow-hidden max-w-6xl w-full grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="bg-[#0A1E4A] text-white p-14 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 background-image: radial-gradient(circle at top right, white, transparent 40%)"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8">
              <ShieldCheck size={40} />
            </div>

            <h1 className="text-6xl font-black leading-tight">
              Culture
              <br />
              Fun
            </h1>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-md">
              Dashboard admin untuk mengelola budaya dan landmark Indonesia
              dengan sistem modern dan interaktif.
            </p>
          </div>

          <div className="relative z-10 mt-16">
            <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg">
              <p className="text-sm text-gray-300">Secure Admin Access</p>

              <h2 className="text-3xl font-bold mt-2">Protected Dashboard</h2>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-5xl font-black text-[#0A1E4A]">Admin Login</h2>

            <p className="text-gray-500 mt-4 text-lg">
              Login untuk mengakses dashboard admin CultureFun
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* USERNAME */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-3 block">
                Username
              </label>

              <div className="flex items-center bg-gray-100 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-orange transition-all">
                <User className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent outline-none ml-4 w-full text-lg"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-3 block">
                Password
              </label>

              <div className="flex items-center bg-gray-100 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-orange transition-all">
                <Lock className="text-gray-400" />

                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none ml-4 w-full text-lg"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 text-red-600 p-4 rounded-2xl font-medium">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7A1A] hover:bg-[#eb6f12] hover:scale-[1.02] transition-all text-white py-5 rounded-2xl font-bold text-xl shadow-xl cursor-pointer disabled:opacity-50"
            >
              {loading ? "Loading..." : "LOGIN"}
            </button>
          </form>

          {/* BOTTOM */}
          <p className="text-gray-400 text-sm mt-10 text-center">
            CultureFun Admin Panel © 2025
          </p>
        </div>
      </div>
    </main>
  );
}
