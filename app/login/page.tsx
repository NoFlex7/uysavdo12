"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://uysavdonext1-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone.trim(),
            password: password.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Telefon yoki parol noto‘g‘ri");
        return;
      }

      // user ni saqlaymiz
      localStorage.setItem("user", JSON.stringify(data.user));

      // role ga qarab yo‘naltirish
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/moderator");
      }
    } catch (err) {
      setError("Server bilan aloqa yo‘q");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT IMAGE */}
      <div className="relative hidden md:flex w-1/2">
        <Image
          src="/uy.png"
          alt="Uy Savdo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0AA3A1]/70 to-[#B4C29E]/70" />
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-sm p-8">
          <div className="flex flex-col ml-[80px] items-center mb-8 w-[105px] h-[92px]"> 
            <Image
              src="/uy2.svg"
              alt="UySavdo.uz"
              width={150}
              height={50}
              className="mb-6"
            />
          </div>
          <h2 className="text-xl font-bold mb-2">Tizimga kirish</h2>
          <p className="text-sm text-gray-500 mb-6">
            Login va parol kiriting
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Telefon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0AA3A1]"
            />

            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0AA3A1]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[black] text-white rounded-md hover:bg-[black] transition disabled:opacity-60"
            >
              {loading ? "Kirilmoqda..." : "Kirish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
