import { useEffect, useState } from "react";
import AppCard from "../../components/account/createdApps/AppCard";
import useAccountApi from "../../hooks/useAccountApi";
import { AuthechoApp } from "../../types/types";

export default function CreatedAppsPage() {
  const { callApi: fetchAccountOverview } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  const [createdApps, setCreatedApps] = useState<AuthechoApp[]>([]);

  useEffect(() => {
    const getAccountOverview = async () => {
      const response = await fetchAccountOverview();
      const receviedCreatedApps = response?.data.createdApps;

      if (receviedCreatedApps) {
        console.log(receviedCreatedApps);

        setCreatedApps(receviedCreatedApps);
      }
    };
    getAccountOverview();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        Your created apps
      </h2>
      <ul className="flex flex-col gap-y-6">
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
