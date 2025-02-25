import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import AppCard from "../../components/account/app/AppCard";
import AppFilters from "../../components/account/app/AppFilters";
import Paginator from "../../components/utils/Paginator";
import { AuthechoApp, PaginatedPage } from "../../types/types";
import { calcPageCount, showOnPagination } from "../../utils/utils";
import useAccountStore from "../../hooks/useAccountStore";

export default function ActiveConnectionsPage() {
  const { status, accountOverview } = useAccountStore(true);
  const [activeConnections, setActiveConnections] = useState<AuthechoApp[]>([]);
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const apps = accountOverview.appConnections;
    if (apps) {
      const sortedApps = apps
        .map((app) => ({ ...app, isVisible: true }))
        .sort((a, b) => b.users - a.users);

      setActiveConnections(sortedApps);
      setPage((prev) => ({ ...prev, pageCount: calcPageCount(sortedApps, 4) }));
    }
  }, []);

  useEffect(() => {
    setPage((prev) => ({ ...prev, pageCount: calcPageCount(activeConnections, 4) }));
  }, [activeConnections]);

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

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  const filteredCreatedApps = activeConnections
    .filter((app) => app.isVisible)
    .filter((_, index) => showOnPagination(index, page.current, 4));

  const noApps = activeConnections.length === 0;
  const noMatchingApps = filteredCreatedApps.length === 0;
  const paginate = activeConnections.length > 4;

  if (noApps) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        You have not yet accessed any applications with your Authecho account
      </h2>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        {noMatchingApps ? "No matching apps" : "Active application connections"}
      </h2>
      <AppFilters
        apps={activeConnections}
        setApps={setActiveConnections}
        onSearch={reCalcPaginationOnSearch}
      />
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
                  <AppCard app={app} detailsPath="administeredapps" isManageable={false} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
