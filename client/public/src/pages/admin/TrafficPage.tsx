import { useEffect, useState } from "react";
import { ActivityLog } from "../../types/types";
import AppTrafficTimePicker from "../../components/account/app/AppTrafficTimePicker";
import { TIME_OPTIONS } from "../../constants/contants";
import AppTrafficGraph from "../../components/account/app/AppTrafficGraph";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import useAdminApi from "../../hooks/useAdminApi";
import useAdminStore from "../../hooks/useAdminStore";
import { HashLoader } from "react-spinners";

export default function TrafficPage() {
  const { callApi: getAppActivity } = useAdminApi("POST", "APPACTIVITY");
  const { status } = useAdminStore();
  const [appActivity, setAppActivity] = useState<ActivityLog[][]>([]);
  const [selectedAppActivity, setSelctedAppActivity] = useState<ActivityLog[]>([]);

  useEffect(() => {
    (async () => {
      const fetchPromises = [...TIME_OPTIONS].map((timeOption) =>
        getAppActivity(true, { days: timeOption.days })
      );
      const response = await Promise.all(fetchPromises);
      const logs = response.map((res) => res?.data.logs ?? []);
      setSelctedAppActivity(logs[logs.length - 1]);

      setAppActivity(logs);
    })();
  }, []);

  if (status === "loading") {
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
