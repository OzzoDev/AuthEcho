import { IoIosSnow } from "react-icons/io";
import { AdminRequest, UserData } from "../../../types/types";
import DangerBtn from "../../btn/DangerBtn";
import DataLabel from "../../utils/DataLabel";
import DeleteCommand from "./DeleteCommand";
import { useState } from "react";
import useAdminApi from "../../../hooks/useAdminApi";
import useAdminStore from "../../../hooks/useAdminStore";
import SecondaryBtn from "../../btn/SecondaryBtn";

interface Props {
  userData: UserData;
}

export default function UserCard({ userData }: Props) {
  const { callApi: deleteUser } = useAdminApi("POST", "DELETEUSER");
  const { callApi: freezeAccount } = useAdminApi("POST", "FREEZEACCOUNT");
  const { updateOverviewProperty } = useAdminStore();
  const [requestData, setRequestData] = useState<AdminRequest>({ username: userData.name });

  const handleDelteCommandChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteAccount = async (): Promise<void> => {
    const response = await deleteUser(true, requestData);
    const updatedUsers = response?.data.users;
    updatedUsers &&
      updateOverviewProperty(
        "users",
        updatedUsers.map((user) => ({ ...user, isVisible: true }))
      );
  };

  const handleFreezeAccount = async (): Promise<void> => {
    const response = await freezeAccount(true, requestData);
    const updatedUsers = response?.data.users;
    updatedUsers &&
      updateOverviewProperty(
        "users",
        updatedUsers.map((user) => ({ ...user, isVisible: true }))
      );
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-y-4 w-full">
      <div className="flex flex-col gap-y-2">
        <DataLabel label="Username" data={userData.name} />
        <DataLabel label="Email" data={userData.email} />
        <DataLabel label="Last login" data={userData.lastLogin} />
        <DataLabel label="Account created at" data={userData.createdAt} />
      </div>
      <div className="flex flex-col items-center md:items-end gap-y-8">
        {userData.isFrozen ? (
          <SecondaryBtn
            btnText="Unfreeze account"
            onClick={handleFreezeAccount}
            icon={<IoIosSnow size={20} />}
          />
        ) : (
          <DangerBtn
            btnText="Freeze account"
            onClick={handleFreezeAccount}
            icon={<IoIosSnow size={20} />}
          />
        )}
        <DeleteCommand
          command={`delete ${userData.name}`}
          name="deleteCommand"
          value={requestData.deleteCommand || ""}
          placeholder={`delete ${userData.name}`}
          onChange={handleDelteCommandChange}
          onSubmit={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
