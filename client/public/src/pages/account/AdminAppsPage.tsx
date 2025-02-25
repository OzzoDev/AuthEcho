import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router";
import { HashLoader } from "react-spinners";
import AppCard from "../../components/account/app/AppCard";
import AppFilters from "../../components/account/app/AppFilters";
import Paginator from "../../components/utils/Paginator";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { AuthechoApp, PaginatedPage } from "../../types/types";
import { calcPageCount, showOnPagination } from "../../utils/utils";
import useAccountStore from "../../hooks/useAccountStore";

export default function AdminAppsPage() {
  const { updateApps } = useMangeAppStore();
  const { status, accountOverview } = useAccountStore();
  const [adminApps, setAdminApps] = useState<AuthechoApp[]>([]);
  const { appname } = useParams();
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const adminApps = accountOverview.adminApps;
    if (adminApps) {
      const sortedApps = adminApps
        .map((app) => ({ ...app, isVisible: true }))
        .sort((a, b) => b.users - a.users);

      setAdminApps(sortedApps);
      updateApps(sortedApps);
      setPage((prev) => ({ ...prev, pageCount: calcPageCount(sortedApps, 4) }));
    }
  }, []);

  useEffect(() => {
    setPage((prev) => ({ ...prev, pageCount: calcPageCount(adminApps, 4) }));
  }, [adminApps]);

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

  if (appname) {
    return <Outlet />;
  }

  const filteredCreatedApps = adminApps
    .filter((app) => app.isVisible)
    .filter((_, index) => showOnPagination(index, page.current, 4));

  const noApps = adminApps.length === 0;
  const noMatchingApps = filteredCreatedApps.length === 0;
  const paginate = adminApps.length > 4;

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
      <AppFilters apps={adminApps} setApps={setAdminApps} onSearch={reCalcPaginationOnSearch} />
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
