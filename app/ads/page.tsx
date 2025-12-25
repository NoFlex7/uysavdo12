"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdsPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      const parsed = JSON.parse(user);
      setRole(parsed.role);
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">E’lonlar ro‘yxati</h1>
      <p>Salom, {role}!</p>
      <ul className="list-disc ml-5">
        <li>E’lon 1</li>
        <li>E’lon 2</li>
        <li>E’lon 3</li>
      </ul>
    </div>
  );
}
