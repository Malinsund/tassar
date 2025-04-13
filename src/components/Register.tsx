"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Image
        src="/logo.svg"
        alt="tassar logo"
        width={200}
        height={200}
        className="m-6"
      />
      <h1 className="font-special text-2xl">Registrera dig</h1>
      <form onSubmit={handleRegister} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-64 mb-2 dark:text-black"
          required
        />
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-64 mb-2 dark:text-black"
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-64 mb-2 dark:text-black"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Registrera
        </button>
      </form>

      <p className="mt-4">
        Har du redan ett konto?{" "}
        <button
          onClick={() => router.push("/")}
          className="text-blue-600 underline"
        >
          Logga in här
        </button>
      </p>
    </div>
  );
}
