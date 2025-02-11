import { useEffect, useState } from "react";
import AppCard from "../../components/account/createdApps/AppCard";
import useAccountApi from "../../hooks/useAccountApi";
import { AuthechoApp, FetchStatus } from "../../types/types";
import { Outlet, useParams } from "react-router";
import { HashLoader } from "react-spinners";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { calcPageCount, showOnPagination } from "../../utils/utils";
import Paginator from "../../components/utils/Paginator";

type paginatedPage = {
  current: number;
  latest: number;
  pageCount: number;
};

export default function CreatedAppsPage() {
  const { updateApps } = useMangeAppStore();
  const { callApi: fetchAccountOverview } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  const [createdApps, setCreatedApps] = useState<AuthechoApp[]>([]);
  const { appname } = useParams();
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");
  const [page, setPage] = useState<paginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const getAccountOverview = async () => {
      setApiStatus("loading");
      const response = await fetchAccountOverview(true);
      const receviedCreatedApps = response?.data.createdApps;

      if (receviedCreatedApps) {
        setCreatedApps(receviedCreatedApps);
        updateApps(receviedCreatedApps);
        setPage((prev) => ({ ...prev, pageCount: calcPageCount(receviedCreatedApps, 4) }));
        setApiStatus("success");
      } else {
        setApiStatus("error");
      }
    };
    getAccountOverview();
  }, []);

  const handlePagination = (_: unknown, value: number) => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  if (apiStatus === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (appname) {
    return <Outlet />;
  }

  const filteredCreatedApps = createdApps.filter((_, index) =>
    showOnPagination(index, page.current, 4)
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        Your created apps
      </h2>
      <ul className="flex flex-col gap-y-[60px]">
        {filteredCreatedApps.map((app, index) => {
          return (
            <li key={index}>
              <AppCard app={app} />
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center pb-[140px]">
        <Paginator onChange={handlePagination} count={page.pageCount} />
      </div>
    </div>
  );
}
