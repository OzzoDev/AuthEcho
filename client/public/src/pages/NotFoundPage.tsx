import PrimaryBtn from "../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";
import { CiHome } from "react-icons/ci";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="grow flex flex-col items-center justify-center space-y-10 text-red-500">
      <h1 className="text-2xl">404 - Not found</h1>
      <PrimaryBtn
        btnText="Go to Home"
        onClick={() => navigate("/")}
        icon={<CiHome size={24} />}
        fontSize="lg"
      />
    </div>
  );
}
