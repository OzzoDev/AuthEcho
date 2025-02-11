import { AuthechoApp } from "../../../types/types";
import { IoSettingsOutline } from "react-icons/io5";
import SecondaryBtn from "../../btn/SecondaryBtn";
import useAuthStore from "../../../hooks/useAuthStore";
import { joinWithAnd, removeAllWhitespaces } from "../../../utils/utils";
import { useNavigate } from "react-router";

interface Props {
  app: AuthechoApp;
}

export default function AppCard({ app }: Props) {
  const navigate = useNavigate();
  const { username } = useAuthStore();
  const admins = joinWithAnd(["You", ...app.admins.filter((admin) => admin !== username)]);

  const redirectToAppDetailsPage = (): void => {
    navigate(`/account/myapps/${removeAllWhitespaces(app.name.toLowerCase())}`);
  };

  return (
    <div className="flex flex-col gap-y-10 p-4 bg-black bg-opacity-20">
      <div className="flex gap-x-10">
        <div className="flex gap-x-2">
          <p className="text-gray-300">App name</p>
          <p className="font-semibold">{app.name}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="text-gray-300">App origin</p>
          <p className="font-semibold">{app.origin}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="text-gray-300">App admins</p>
          <p className="font-semibold">{admins}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>{app.description}</p>
        <div className="flex gap-x-4">
          <SecondaryBtn
            btnText="Mange app"
            onClick={redirectToAppDetailsPage}
            icon={<IoSettingsOutline size={24} />}
          />
          {/* <PrimaryBtn
            btnText="See traffic"
            onClick={() => {}}
            icon={<MdOutlineShowChart size={24} />}
          />
          <SecondaryBtn btnText="Edit" onClick={() => {}} icon={<FaRegEdit size={24} />} />
          <DangerBtn btnText="Delete" onClick={() => {}} icon={<IoTrashOutline size={24} />} /> */}
        </div>
      </div>
    </div>
  );
}
