import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <button
      className="font-special"
      onClick={() => {
        console.log("Logout clicked");
        logout();
        router.push("/");
      }}
    >
      Logga ut
    </button>
  );
};

export default LogoutButton;
