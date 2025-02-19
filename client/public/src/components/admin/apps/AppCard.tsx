import { IoIosSnow } from "react-icons/io";
import { AdminRequest, AuthechoApp } from "../../../types/types";
import DangerBtn from "../../btn/DangerBtn";
import DataLabel from "../../utils/DataLabel";
import { useState } from "react";
import useAdminApi from "../../../hooks/useAdminApi";
import useAdminStore from "../../../hooks/useAdminStore";
import SecondaryBtn from "../../btn/SecondaryBtn";
import DeleteCommand from "../users/DeleteCommand";
import { joinWithAnd } from "../../../utils/utils";

interface Props {
  appData: AuthechoApp;
}

export default function AppCard({ appData }: Props) {
  const { callApi: deleteApp } = useAdminApi("POST", "DELETEAPP");
  const { callApi: freezeApp } = useAdminApi("POST", "FREEZEAPP");
  const { updateOverviewProperty } = useAdminStore();
  const [requestData, setRequestData] = useState<AdminRequest>({ app: appData.name });

  const handleDelteCommandChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteApp = async (): Promise<void> => {
    const response = await deleteApp(true, requestData);

    const updatedApps = response?.data.apps;
    updatedApps &&
      updateOverviewProperty(
        "apps",
        updatedApps.map((app) => ({ ...app, isVisible: true }))
      );
  };

  const handleFreezeApp = async (): Promise<void> => {
    const response = await freezeApp(true, requestData);
    const updatedApps = response?.data.apps;
    updatedApps &&
      updateOverviewProperty(
        "apps",
        updatedApps.map((app) => ({ ...app, isVisible: true }))
      );
  };

  const admins = joinWithAnd(appData.admins);

  return (
    <div className="flex justify-between gap-x-20 w-full">
      <div className="flex flex-col gap-y-2">
        <DataLabel label="Username" data={appData.name} />
        <DataLabel label="Origin" data={appData.origin} />
        <DataLabel label="Creator" data={appData.creator} />
        {admins && <DataLabel label="Admins" data={admins} />}
        <DataLabel label="Status" data={appData.status} />
        <DataLabel label="Users" data={String(appData.users)} />
        {appData.description && <DataLabel label="Description" data={appData.description} />}
      </div>
      <div className="flex flex-col items-end gap-y-8">
        {appData.isFrozen ? (
          <SecondaryBtn
            btnText="Unfreeze app"
            onClick={handleFreezeApp}
            icon={<IoIosSnow size={20} />}
          />
        ) : (
          <DangerBtn
            btnText="Freeze app"
            onClick={handleFreezeApp}
            icon={<IoIosSnow size={20} />}
          />
        )}
        <DeleteCommand
          command={`delete ${appData.name}`}
          name="deleteCommand"
          value={requestData.deleteCommand || ""}
          placeholder={`delete ${appData.name}`}
          onChange={handleDelteCommandChange}
          onSubmit={handleDeleteApp}
        />
      </div>
    </div>
  );
}
