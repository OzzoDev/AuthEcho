import { IoArrowBackOutline } from "react-icons/io5";
import OutlineBtn from "../../components/btn/OutlineBtn";
import { useNavigate, useParams } from "react-router";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { useEffect, useState } from "react";
import { ActivityLog, AuthechoApp } from "../../types/types";
import useApi from "../../hooks/useApi";
import AppTrafficTimePicker from "../../components/account/app/AppTrafficTimePicker";
import { TIME_OPTIONS } from "../../constants/contants";
import AppTrafficGraph from "../../components/account/app/AppTrafficGraph";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";

export default function ControlledAppTrafficPage() {
  const navigate = useNavigate();
  const { appname } = useParams();
  const { getApp } = useMangeAppStore();
  const { fetchData: fetchAppActivity } = useApi("POST", "APPACTIVITY");
  const [appActivity, setAppActivity] = useState<ActivityLog[][]>([]);
  const [selectedAppActivity, setSelctedAppActivity] = useState<ActivityLog[]>([]);
  const app: AuthechoApp = getApp(appname);

  useEffect(() => {
    (async () => {
      const fetchPromises = [...TIME_OPTIONS].map((timeOption) =>
        fetchAppActivity(true, { appName: app.name, days: timeOption.days })
      );
      const response = await Promise.all(fetchPromises);
      const logs = response.map((res) => res?.data.logs ?? []);
      setSelctedAppActivity(logs[logs.length - 1]);

      setAppActivity(logs);
    })();
  }, []);

  const redirectToCreatedAppsDetialsPage = (): void => {
    navigate(`/account/myapps/${appname}`);
  };

  return (
    <div className="w-full">
      <div className="p-4">
        <OutlineBtn
          btnText="Go back"
          onClick={redirectToCreatedAppsDetialsPage}
          icon={<IoArrowBackOutline size={24} />}
        />
      </div>
      <h1 className="ml-4 mt-2 mb-4 text-lg text-sky-300 font-medium">
        User Activity-Based App Traffic Reports for
        <span
          className="
        text-sky-600 font-semibold">
          &nbsp;{app.name}
        </span>
      </h1>
      <div className="flex flex-col gap-y-2 px-6 py-4">
        <p className="flex gap-x-2">
          <BsArrowUp size={20} /> User Count
        </p>
        <p className="flex gap-x-2">
          <BsArrowRight size={20} /> Date of Recorded Activity
        </p>
      </div>
      <AppTrafficGraph appActivity={selectedAppActivity} />
      <AppTrafficTimePicker
        appActivity={appActivity}
        setSelectedAppActivity={setSelctedAppActivity}
      />
    </div>
  );
}
