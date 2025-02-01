import { NavLink } from "react-router";
import notFound from "../assets/notFound.svg";
import PrimaryBtn from "../components/btn/PrimaryBtn";

export default function NotFoundPage() {
  return (
    <div className="grow flex flex-col items-center justify-center space-y-20 w-full text-white">
      <img src={notFound} alt="" className="w-[50%]" />
      <h1 className="text-3xl text-red-600">404 - Not found</h1>
      <NavLink to="/">
        <PrimaryBtn btnText="Home" />
      </NavLink>
    </div>
  );
}
