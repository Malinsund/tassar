"use client";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col justify-center text-center">
      <h1>Welcome to the Page!</h1>

      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in.</p>
          <a href="/login">
            <button>Login</button>
          </a>
        </div>
      )}
    </div>
  );
}
