import { Outlet, useParams } from "react-router";
import PageLink from "../components/utils/PageLink";

export default function ReportedIssuesLayout() {
  const { issueid } = useParams();

  return (
    <div className="w-full">
      {!issueid && (
        <div className="flex gap-x-6 p-4">
          <PageLink path="/admin/reportedissues" name="Unresolved issues" />
          <PageLink path="/admin/reportedissues/resolvedissues" name="Resolved issues" />
        </div>
      )}
      <Outlet />
    </div>
  );
}
