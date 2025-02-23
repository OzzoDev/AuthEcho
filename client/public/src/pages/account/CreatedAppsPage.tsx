import { useEffect, useState } from "react";
import AppCard from "../../components/account/app/AppCard";
import { AuthechoApp, PaginatedPage } from "../../types/types";
import { Outlet, useParams } from "react-router";
import { HashLoader } from "react-spinners";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { calcPageCount, showOnPagination } from "../../utils/utils";
import Paginator from "../../components/utils/Paginator";
import AppFilters from "../../components/account/app/AppFilters";
import useAccountStore from "../../hooks/useAccountStore";

export default function CreatedAppsPage() {
  const { updateApps } = useMangeAppStore();
  const { status, accountOverview } = useAccountStore();
  const [createdApps, setCreatedApps] = useState<AuthechoApp[]>([]);
  const { appname } = useParams();
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const createdApps = accountOverview.createdApps;
    if (createdApps) {
      const sortedApps = createdApps
        .map((app) => ({ ...app, isVisible: true }))
        .sort((a, b) => b.users - a.users);
      setCreatedApps(sortedApps);
      updateApps(sortedApps);
      setPage((prev) => ({ ...prev, pageCount: calcPageCount(sortedApps, 4) }));
    }
  }, []);

  useEffect(() => {
    setPage((prev) => ({ ...prev, pageCount: calcPageCount(createdApps, 4) }));
  }, [createdApps]);

  const handlePagination = (_: unknown, value: number): void => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  const reCalcPaginationOnSearch = (query: string): void => {
    if (query) {
      setPage((prev) => ({ ...prev, current: 1 }));
    } else {
      setPage((prev) => ({ ...prev, current: prev.latest }));
    }
  };

  if (status === "loading") {
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
  const paginate = createdApps.length > 4;

  if (noApps) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        You have not connected any apps yet
      </h2>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        {noMatchingApps ? "No matching apps" : "My apps"}
      </h2>
      <AppFilters apps={createdApps} setApps={setCreatedApps} onSearch={reCalcPaginationOnSearch} />
      {!noMatchingApps && (
        <>
          {paginate && (
            <div className="flex justify-center py-6">
              <Paginator onChange={handlePagination} count={page.pageCount} />
            </div>
          )}
          <ul className="flex flex-col gap-y-[60px] mb-[100px]">
            {filteredCreatedApps.map((app) => {
              return (
                <li key={app.name}>
                  <AppCard app={app} detailsPath="myapps" />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
