import { HashLoader } from "react-spinners";
import useAdminStore from "../../hooks/useAdminStore";
import AppCard from "../../components/admin/apps/AppCard";
import SearchBarFlat from "../../components/utils/SearchBarFlat";
import { useEffect, useState } from "react";
import { AuthechoApp, PaginatedPage } from "../../types/types";
import RadioButtonGroup from "../../components/utils/RadioButtonGroup";
import { calcPageCount, formatLargeNumber, showOnPagination } from "../../utils/utils";
import Paginator from "../../components/utils/Paginator";
import { GoInbox } from "react-icons/go";

const ITEMS_PER_PAGE = 10;

export default function AppsPage() {
  const { status, overview } = useAdminStore();
  const [apps, setApps] = useState<AuthechoApp[]>([]);
  const [searchCategory, setSearchCategory] = useState<keyof AuthechoApp>("name");
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const storedApps = overview.apps;
    if (storedApps) {
      setApps(storedApps);
      setPage((prev) => ({ ...prev, pageCount: calcPageCount(storedApps, ITEMS_PER_PAGE) }));
    }
  }, [overview, setPage]);

  const handleSearch = (query: string): void => {
    const filteredApps: AuthechoApp[] = apps.map((app) => {
      const value = app[searchCategory];
      return {
        ...app,
        isVisible:
          value && typeof value === "string"
            ? value.toLowerCase().includes(query.toLowerCase())
            : false,
      };
    });

    setApps(filteredApps);

    setPage((prev) => ({
      ...prev,
      current: query ? 1 : prev.latest,
      pageCount: calcPageCount(filteredApps, ITEMS_PER_PAGE),
    }));
  };

  const handleSearchCategoryChange = (option: string): void => {
    const updatedSearchCatecory: keyof AuthechoApp = option.split(" ")[1] as keyof AuthechoApp;
    setSearchCategory(updatedSearchCatecory);
  };

  const handlePagination = (_: unknown, value: number): void => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (apps.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        No applications connected
      </h2>
    );
  }

  const filteredApps = [...apps]
    .filter((app) => app.isVisible)
    .filter((_, index) => showOnPagination(index, page.current, ITEMS_PER_PAGE));

  const paginate = apps.length > ITEMS_PER_PAGE && filteredApps.length > 0;

  return (
    <div className="w-full">
      <div className="flex gap-x-2 items-center p-4">
        <GoInbox size={24} />
        <p className="text-gray-400">
          Applications&nbsp;
          <span className="text-cyan-300 font-semibold">{formatLargeNumber(apps.length)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-y-6 p-4">
        <SearchBarFlat onChange={handleSearch} />
        <RadioButtonGroup
          options={["App name", "App creator"]}
          onSelect={handleSearchCategoryChange}
        />
        {paginate && (
          <div className="flex justify-center py-6">
            <Paginator onChange={handlePagination} count={page.pageCount} />
          </div>
        )}
      </div>
      {filteredApps.length === 0 ? (
        <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
          No matching application
        </h2>
      ) : (
        <ul className="flex flex-col gap-y-16 p-6 my-12">
          {filteredApps.map((app) => {
            return (
              <li key={app.name}>
                <AppCard appData={app} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
