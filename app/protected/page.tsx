"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin" | "moderator";
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login"); // login qilmagan bo‘lsa
      return;
    }

    const parsedUser = JSON.parse(user);

    // agar role tekshirish kerak bo‘lsa
    if (role && parsedUser.role !== role) {
      router.push("/login"); // role mos kelmasa login ga
      return;
    }

    setLoading(false);
  }, [router, role]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
