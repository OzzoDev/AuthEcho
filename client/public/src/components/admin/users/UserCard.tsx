import { IoIosSnow } from "react-icons/io";
import { UserData } from "../../../types/types";
import DangerBtn from "../../btn/DangerBtn";
import DataLabel from "../../utils/DataLabel";
import DeleteCommand from "./DeleteCommand";

interface Props {
  userData: UserData;
}

export default function UserCard({ userData }: Props) {
  const handleDelteCommandChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
  };

  const handleDeleteAccount = async (): Promise<void> => {
    //
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-y-2">
        <DataLabel label="Username" data={userData.name} />
        <DataLabel label="Email" data={userData.email} />
        <DataLabel label="Last login" data={userData.lastLogin} />
        <DataLabel label="Account created at" data={userData.createdAt} />
      </div>
      <div className="flex flex-col items-end gap-y-8">
        <DangerBtn btnText="Freeze account" onClick={() => {}} icon={<IoIosSnow size={20} />} />
        <DeleteCommand
          command={`delete ${userData.name}`}
          name=""
          value=""
          placeholder={`delete ${userData.name}`}
          onChange={handleDelteCommandChange}
          onSubmit={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
