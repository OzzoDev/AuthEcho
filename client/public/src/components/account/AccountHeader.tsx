import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../hooks/useAuthStore";
import SecondaryBtn from "../btn/SecondaryBtn";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import useAccountApi from "../../hooks/useAccountApi";

export default function AccountHeader() {
  const navigate = useNavigate();
  const { username, email, clearAuth } = useAuthStore();
  const { callApi: signOut } = useAccountApi("GET", "SIGNOUT");

  useAuth(() => navigate("/signin"));

  const handleSignOut = async () => {
    await signOut(true);
    clearAuth();
    navigate("/signin");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full p-4 pt-8 border-b-2 border-cyan-600 bg-gray-900">
      <div className="flex flex-col items-center md:items-start space-y-1">
        <p className="text-xl text-cyan-200">Welcome {username}!</p>
        <p className="text-cyan-400">{email}</p>
        <p className="text-cyan-600">User</p>
      </div>
      <SecondaryBtn
        btnText="Sign out"
        onClick={handleSignOut}
        icon={<HiMiniArrowLeftStartOnRectangle size={24} />}
      />
    </div>
  );
}
