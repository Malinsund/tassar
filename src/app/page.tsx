"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/posts");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center ">
      <div className="flex justify-center p-4">
        <Image src="/tassar.svg" alt="icon" width={200} height={200} />
      </div>
      <h1 className="font-special text-2xl">
        Välkommen till Tassar! <br />
        Ett samlat community för alla djurälskare
      </h1>

      {!user && (
        <div className="mt-4">
          <form onSubmit={handleLogin} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-64 mb-2"
              required
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-64 mb-2"
              required
            />
            <button
              type="submit"
              className="bg-primary font-special font-semibold text-white px-4 py-2 rounded"
            >
              Logga in
            </button>
          </form>

          {/* Länk till registreringssidan */}
          <p className="mt-4">
            Inte medlem än? Registrera dig{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-600 underline"
            >
              här
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
