import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import OutlineBtn from "../../components/btn/OutlineBtn";
import DataLabel from "../../components/utils/DataLabel";
import useAdminStore from "../../hooks/useAdminStore";
import { useState } from "react";
import { ReportedIssue } from "../../types/types";
import { HashLoader } from "react-spinners";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import SecondaryBtn from "../../components/btn/SecondaryBtn";
import { AiOutlineReload } from "react-icons/ai";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import DangerBtn from "../../components/btn/DangerBtn";
import { FaRegTrashCan } from "react-icons/fa6";
import useAdminApi from "../../hooks/useAdminApi";

export default function IssueDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { issueid: issueID } = useParams();
  const { callApi: resolveIssue } = useAdminApi("POST", "RESOLVEISSUE");
  const { callApi: deleteIssue } = useAdminApi("POST", "DELETEISSUE");
  const { status, updateUnResolvedIssue, getIssue } = useAdminStore();
  const [issue, setIssue] = useState<ReportedIssue | undefined>(getIssue(issueID || ""));

  const toIssuesPage = !location.pathname.includes("resolvedissues");

  const handleResolveIssue = async (): Promise<void> => {
    const response = await resolveIssue(true, { issueID });
    const updatedIssue = response?.data.issue;
    const updatedIssues = response?.data.issues;

    updatedIssue && setIssue(updatedIssue);
    updatedIssues &&
      updateUnResolvedIssue(updatedIssues.filter((issue) => !issue.isResolved).length);
  };

  const handleDeleteIssue = async (): Promise<void> => {
    const response = await deleteIssue(true, { issueID });
    response && navigate(`/admin/reportedissues${toIssuesPage ? "" : "/resolvedissues"}`);
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  if (!issue) {
    return (
      <h2 className="text-2xl font-semibold text-cyan-300 ml-[20px] pt-[30px] pb-[60px]">
        Issue not found
      </h2>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <OutlineBtn
        btnText="Go back"
        onClick={() => navigate(`/admin/reportedissues${toIssuesPage ? "" : "/resolvedissues"}`)}
        icon={<IoArrowBackOutline size={24} />}
      />
      <div className="flex justify-between w-full my-12">
        <div className="flex flex-col gap-y-2">
          <DataLabel label="Issue" data={issue.issue} />
          <DataLabel label="From" data={issue.user} />
          <DataLabel label="When" data={issue.sentAt} />
          <p className={`text-${issue.isResolved ? "green" : "red"}-400`}>
            {issue.isResolved ? "Resolved" : "Unresolved"}
          </p>
          <div className="mt-8">
            <p>{issue.text}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-4">
          <>
            {issue.isResolved ? (
              <SecondaryBtn
                btnText="Mark as unresolved"
                onClick={handleResolveIssue}
                icon={<AiOutlineReload size={20} />}
              />
            ) : (
              <PrimaryBtn
                btnText="Mark as resolved"
                onClick={handleResolveIssue}
                icon={<MdOutlineFileDownloadDone size={20} />}
              />
            )}
          </>
          {issue.isResolved && (
            <DangerBtn
              btnText="Delete"
              onClick={handleDeleteIssue}
              icon={<FaRegTrashCan size={20} />}
            />
          )}
        </div>
      </div>
    </div>
  );
}
