import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import useAuthStore from "../../hooks/useAuthStore";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

export default function AccountPage() {
  const navigate = useNavigate();
  const { username, email, clearAuth } = useAuthStore();
  const { fetchData: signOut } = useApi("GET", "SIGNOUT");

  useAuth(() => navigate("/signin"));

  const handleSignOut = async () => {
    await signOut();
    clearAuth();
    navigate("/signin");
  };

  return (
    <div className="grow flex flex-col items-center space-y-[100px] pt-[200px] pb-[50px]">
      <h1>Your are signed in!</h1>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <PrimaryBtn
        btnText="Sign out"
        onClick={handleSignOut}
        icon={<HiMiniArrowLeftStartOnRectangle size={24} />}
      />
    </div>
  );
}
