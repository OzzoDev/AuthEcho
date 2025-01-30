import { useNavigate } from "react-router";
import useAuthechoApi from "../../hooks/authecho/useAuthechoApi";
import useAuthechoAuthStore from "../../hooks/authecho/useAuthechoAuthStore";
import OutlineIconBtn from "../btn/OutlineIconBtn";
import { GoArrowRight } from "react-icons/go";
import { AUTHECHO_LINK } from "../../constants/constants";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { username, email, clearAuth } = useAuthechoAuthStore();
  const { callApi: signOut } = useAuthechoApi("GET", "SIGNOUT");

  const handleSignOut = async () => {
    const response = await signOut(true);

    if (response) {
      clearAuth();
      navigate("/signin");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-y-4 w-full bg-slate-900 p-4">
      <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-0">
        <h2 className="text-2xl font-semibold text-cyan-400">Welcome {username}!</h2>
        <h3 className="text-teal-500">{email}</h3>
        <h4 className="text-teal-700">Admin</h4>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <OutlineIconBtn
          btnText="Sign out"
          icon={<GoArrowRight size={24} color="white" />}
          onClick={handleSignOut}
        />
        <a href={AUTHECHO_LINK} className="underline">
          Mange account
        </a>
      </div>
    </div>
  );
}
