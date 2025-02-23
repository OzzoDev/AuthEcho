import { useEffect, useState } from "react";
import useAdminStore from "../../hooks/useAdminStore";
import { PaginatedPage, ReportedIssue } from "../../types/types";
import { HashLoader } from "react-spinners";
import { calcPageCount, formatLargeNumber, showOnPagination } from "../../utils/utils";
import { LuFlag } from "react-icons/lu";
import SearchBarFlat from "../../components/utils/SearchBarFlat";
import Paginator from "../../components/utils/Paginator";
import IssueCard from "../../components/admin/issues/IssueCard";

const ITEMS_PER_PAGE = 10;

export default function ResolvedIssuesPage() {
  const { status, overview } = useAdminStore();
  const [issues, setIssues] = useState<ReportedIssue[]>([]);
  const [page, setPage] = useState<PaginatedPage>({ current: 1, latest: 1, pageCount: 1 });

  useEffect(() => {
    const storedIssues = overview.issues;
    if (storedIssues) {
      const unresolvedIssues = storedIssues.filter((issue) => issue.isResolved);
      setIssues(unresolvedIssues);
      setPage((prev) => ({ ...prev, pageCount: calcPageCount(unresolvedIssues, ITEMS_PER_PAGE) }));
    }
  }, [overview, setIssues]);

  const handleSearch = (query: string): void => {
    const filteredIssues: ReportedIssue[] = issues.map((issue) => {
      return {
        ...issue,
        isVisible: issue.issue.toLowerCase().includes(query.toLowerCase()),
      };
    });

    setIssues(filteredIssues);

    setPage((prev) => ({
      ...prev,
      current: query ? 1 : prev.latest,
      pageCount: calcPageCount(filteredIssues, ITEMS_PER_PAGE),
    }));
  };

  const handlePagination = (_: unknown, value: number): void => {
    setPage((prev) => ({ ...prev, current: value, latest: value }));
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (issues.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        No issues resolved
      </h2>
    );
  }

  const filteredIssues = [...issues]
    .filter((issue) => issue.isVisible)
    .filter((_, index) => showOnPagination(index, page.current, ITEMS_PER_PAGE));

  const paginate = issues.length > ITEMS_PER_PAGE && filteredIssues.length > 0;

  return (
    <div className="w-full">
      <div className="flex gap-x-2 items-center p-4">
        <LuFlag size={24} />
        <p className="text-gray-400">
          Resolved issues&nbsp;
          <span className="text-cyan-300 font-semibold">{formatLargeNumber(issues.length)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-y-6 p-4">
        <SearchBarFlat onChange={handleSearch} />
        {paginate && (
          <div className="flex justify-center py-6">
            <Paginator onChange={handlePagination} count={page.pageCount} />
          </div>
        )}
      </div>
      {filteredIssues.length === 0 ? (
        <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
          No matching issue
        </h2>
      ) : (
        <ul className="flex flex-col gap-y-16 p-6 my-12">
          {filteredIssues.map((issue) => {
            return (
              <li key={issue._id}>
                <IssueCard issueData={issue} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
