import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router";
import { HashLoader } from "react-spinners";
import AppCard from "../../components/account/app/AppCard";
import AppFilters from "../../components/account/app/AppFilters";
import Paginator from "../../components/utils/Paginator";
import useAccountApi from "../../hooks/useAccountApi";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { AuthechoApp, FetchStatus, paginatedPage } from "../../types/types";
import { calcPageCount, showOnPagination } from "../../utils/utils";

export default function AdminAppsPage() {
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
      const receviedAdminsApps = response?.data.adminApps;

      if (receviedAdminsApps) {
        const sortedApps = receviedAdminsApps
          .map((app) => ({ ...app, isVisible: true }))
          .sort((a, b) => b.users - a.users);

        console.log("sorted apps: ", sortedApps);

        setCreatedApps(sortedApps);
        updateApps(sortedApps);
        setPage((prev) => ({ ...prev, pageCount: calcPageCount(sortedApps, 4) }));
        setApiStatus("success");
      } else {
        setApiStatus("error");
      }
    };
    getAccountOverview();
  }, []);

  useEffect(() => {
    setPage((prev) => ({ ...prev, pageCount: calcPageCount(createdApps, 4) }));
  }, [createdApps]);

  const handlePagination = (_: unknown, value: number) => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  const reCalcPaginationOnSearch = (query: string) => {
    if (query) {
      setPage((prev) => ({ ...prev, current: 1 }));
    } else {
      setPage((prev) => ({ ...prev, current: prev.latest }));
    }
  };

  if (apiStatus === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (appname) {
    return <Outlet />;
  }

  const filteredCreatedApps = createdApps
    .filter((app) => app.isVisible)
    .filter((_, index) => showOnPagination(index, page.current, 4));

  const noApps = createdApps.length === 0;
  const noMatchingApps = filteredCreatedApps.length === 0;

  if (noApps) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        You do not have administrative access to any applications
      </h2>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        {noMatchingApps ? "No matching apps" : "Administered apps"}
      </h2>
      <AppFilters apps={createdApps} setApps={setCreatedApps} onSearch={reCalcPaginationOnSearch} />
      {!noMatchingApps && (
        <>
          <div className="flex justify-center py-6">
            <Paginator onChange={handlePagination} count={page.pageCount} />
          </div>
          <ul className="flex flex-col gap-y-[60px] mb-[100px]">
            {filteredCreatedApps.map((app, index) => {
              return (
                <li key={index}>
                  <AppCard app={app} detailsPath="administeredapps" />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
