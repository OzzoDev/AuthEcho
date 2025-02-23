import { PiUsersThree } from "react-icons/pi";
import useAuthStore from "../../../hooks/useAuthStore";
import { AppStatus, AppStatusData, AuthechoApp } from "../../../types/types";
import { capitalize, decapitalize, joinWithAnd } from "../../../utils/utils";
import AppCardData from "./AppCardData";
import { APP_STATUS_MAP } from "../../../constants/contants";
import { useEffect, useState } from "react";

interface Props {
  app: AuthechoApp;
}

export default function AppDetailsCard({ app }: Props) {
  const { username } = useAuthStore();
  const [admins, setAdmins] = useState<string>(
    joinWithAnd(app.admins.map((admin) => (admin === username ? "You" : admin)))
  );
  const [appStatus, setAppStatus] = useState<AppStatusData>(
    APP_STATUS_MAP[decapitalize(app.status) as AppStatus]
  );

  const creator = app.creator === username ? "You" : app.creator;

  // console.log(admins, creator);
  // console.log(app);

  useEffect(() => {
    setAdmins(joinWithAnd(app.admins.map((admin) => (admin === username ? "You" : admin))));
    setAppStatus(APP_STATUS_MAP[decapitalize(app.status) as AppStatus]);
  }, [app]);

  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-between gap-y-8 px-6 py-4">
      <div className="flex flex-col md:items-end">
        <div className="relative w-fit">
          <div
            style={{ backgroundColor: appStatus.color }}
            className="absolute top-[-5px] right-[-10px] w-[8px] h-[8px] rounded-full"
          />
          <AppCardData
            desciption="Status"
            data={`${appStatus.icon} ${capitalize(app.status)}`}
            noWrap
          />
        </div>
        <span className="flex gap-x-2">
          {app.users}
          <PiUsersThree size={26} />
        </span>
      </div>
      <div>
        <AppCardData desciption="Name" data={app.name} />
        <AppCardData desciption="Origin" data={app.origin} isLink />
        <AppCardData desciption="Creator" data={creator} />
        <AppCardData desciption="Admins" data={admins} />
        <AppCardData desciption="Description" data={app.description} />
      </div>
    </div>
  );
}
