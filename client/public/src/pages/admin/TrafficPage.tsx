import { useEffect, useState } from "react";
import { ActivityLog, FetchStatus } from "../../types/types";
import AppTrafficTimePicker from "../../components/account/app/AppTrafficTimePicker";
import { TIME_OPTIONS } from "../../constants/contants";
import AppTrafficGraph from "../../components/account/app/AppTrafficGraph";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import useAdminApi from "../../hooks/useAdminApi";
import { HashLoader } from "react-spinners";

export default function TrafficPage() {
  const { callApi: getAppActivity } = useAdminApi("POST", "APPACTIVITY");
  const [appActivity, setAppActivity] = useState<ActivityLog[][]>([]);
  const [selectedAppActivity, setSelctedAppActivity] = useState<ActivityLog[]>([]);
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    (async () => {
      setApiStatus("loading");

      const fetchPromises = [...TIME_OPTIONS].map((timeOption) =>
        getAppActivity(true, { days: timeOption.days })
      );
      const response = await Promise.all(fetchPromises);
      const logs = response.map((res) => res?.data.logs ?? []);
      setSelctedAppActivity(logs[logs.length - 1]);

      setAppActivity(logs);

      response ? setApiStatus("success") : setApiStatus("error");
    })();
  }, []);

  if (apiStatus === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="w-full">
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
