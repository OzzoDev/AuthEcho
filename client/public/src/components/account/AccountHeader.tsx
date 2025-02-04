import { useNavigate } from "react-router";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../hooks/useAuthStore";
import SecondaryBtn from "../btn/SecondaryBtn";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

export default function AccountHeader() {
  const navigate = useNavigate();
  const { username, email, isAdmin, clearAuth } = useAuthStore();
  const { fetchData: signOut } = useApi("GET", "SIGNOUT");

  useAuth(() => navigate("/signin"));

  const handleSignOut = async () => {
    await signOut();
    clearAuth();
    navigate("/signin");
  };

  const role = isAdmin ? "Admin" : "User";

  return (
    <div className="flex justify-between items-center w-full p-4 pt-8 bg-gray-900">
      <div className="space-y-1">
        <p className="text-xl text-cyan-200">Welcome {username}!</p>
        <p className="text-cyan-400">{email}</p>
        <p className="text-cyan-600">{role}</p>
      </div>
      <SecondaryBtn
        btnText="Sign out"
        onClick={handleSignOut}
        icon={<HiMiniArrowLeftStartOnRectangle size={24} />}
      />
    </div>
  );
}
