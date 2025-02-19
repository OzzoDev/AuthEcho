import { useNavigate } from "react-router";
import { ReportedIssue } from "../../../types/types";
import PrimaryBtn from "../../btn/PrimaryBtn";
import DataLabel from "../../utils/DataLabel";
import { MdOutlineEmail } from "react-icons/md";

interface Props {
  issueData: ReportedIssue;
}

export default function IssueCard({ issueData }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-y-2">
        <DataLabel label="Issue" data={issueData.issue} />
        <DataLabel label="From" data={issueData.user} />
        <DataLabel label="When" data={issueData.sentAt} />
        <p className={`text-${issueData.isResolved ? "green" : "red"}-400`}>
          {issueData.isResolved ? "Resolved" : "Unresolved"}
        </p>
      </div>
      <PrimaryBtn
        btnText="Read"
        onClick={() => navigate(`/admin/reportedissues/${issueData._id}`)}
        icon={<MdOutlineEmail size={20} />}
      />
    </div>
  );
}
