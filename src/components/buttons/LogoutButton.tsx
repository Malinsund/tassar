import { useAuth } from "@/context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button className="font-special" onClick={logout}>
      Logga ut
    </button>
  );
};

export default LogoutButton;
