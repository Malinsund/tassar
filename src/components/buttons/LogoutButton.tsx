import { useAuth } from "@/context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Log Out</button>;
};

export default LogoutButton;
