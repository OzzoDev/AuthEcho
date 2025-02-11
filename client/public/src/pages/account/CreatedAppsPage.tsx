import { useEffect, useState } from "react";
import AppCard from "../../components/account/createdApps/AppCard";
import useAccountApi from "../../hooks/useAccountApi";
import { AuthechoApp, FetchStatus } from "../../types/types";
import { Outlet, useParams } from "react-router";
import { HashLoader } from "react-spinners";
import useMangeAppStore from "../../hooks/useManageAppStore";

export default function CreatedAppsPage() {
  const { updateApps } = useMangeAppStore();
  const { callApi: fetchAccountOverview } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  const [createdApps, setCreatedApps] = useState<AuthechoApp[]>([]);
  const { appname } = useParams();
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    const getAccountOverview = async () => {
      setApiStatus("loading");
      const response = await fetchAccountOverview(true);
      const receviedCreatedApps = response?.data.createdApps;

      console.log("Apps: ", receviedCreatedApps);

      if (receviedCreatedApps) {
        setCreatedApps(receviedCreatedApps);
        updateApps(receviedCreatedApps);
        setApiStatus("success");
      } else {
        setApiStatus("error");
      }
    };
    getAccountOverview();
  }, []);

  if (apiStatus === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (appname) {
    return <Outlet />;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        Your created apps
      </h2>
      <ul className="flex flex-col gap-y-[100px]">
        {createdApps.map((app, index) => {
          return (
            <li key={index}>
              <AppCard app={app} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
