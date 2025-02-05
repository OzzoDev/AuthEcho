import { FaRegEdit } from "react-icons/fa";
import { AuthechoApp } from "../../../types/types";
import PrimaryBtn from "../../btn/PrimaryBtn";
import DangerBtn from "../../btn/DangerBtn";
import { IoTrashOutline } from "react-icons/io5";
import SecondaryBtn from "../../btn/SecondaryBtn";
import { MdOutlineShowChart } from "react-icons/md";

interface Props {
  app: AuthechoApp;
}

export default function AppCard({ app }: Props) {
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
          <p className="font-semibold">{app.admins.join(", ")}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>{app.description}</p>
        <div className="flex gap-x-4">
          <PrimaryBtn
            btnText="See traffic"
            onClick={() => {}}
            icon={<MdOutlineShowChart size={24} />}
          />
          <SecondaryBtn btnText="Edit" onClick={() => {}} icon={<FaRegEdit size={24} />} />
          <DangerBtn btnText="Delete" onClick={() => {}} icon={<IoTrashOutline size={24} />} />
        </div>
      </div>
    </div>
  );
}
