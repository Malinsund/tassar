"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import "../app/globals.css";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="font-special">
      <h1>{isLogin ? "Logga in" : "Registrera dig"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ange din e-post"
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ange ditt lösenord"
          />
        </div>
        <button type="submit">{isLogin ? "Logga in" : "Registrera"}</button>
      </form>

      <div>
        <p>
          {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Registrera dig här" : "Logga in här"}
          </button>
        </p>
      </div>
    </div>
  );
}
