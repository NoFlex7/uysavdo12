"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://uysavdonext1-3.onrender.com/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Xatolik yuz berdi");
        return;
      }

      router.push("/login");
    } catch {
      setError("Server bilan aloqa yo‘q");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="relative hidden md:block w-1/2">
        <Image src="/uy.png" alt="Uy Savdo" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0AA3A1]/80 to-[#B4C29E]/80" />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-sm px-8">
          <div className="text-center mb-10">
            <h1 className="text-xl font-semibold">Uy Savdo</h1>
          </div>

          <h2 className="text-lg font-semibold mb-1">Ro‘yxatdan o‘tish</h2>
          <p className="text-sm text-gray-500 mb-6">
            Telefon va parol kiriting
          </p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="tel"
              placeholder="Telefon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-gray-100"
              required
            />

            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-gray-100"
              required
            />

            <button
              disabled={loading}
              className="w-full h-10 bg-black text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Akkauntingiz bormi?{" "}
            <Link href="/login" className="text-[#0AA3A1] font-medium">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
