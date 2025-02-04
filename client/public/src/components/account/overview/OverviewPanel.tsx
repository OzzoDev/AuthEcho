import useAccountApi from "../../../hooks/useAccountApi";
import useAccountStore from "../../../hooks/useAccountStore";
import { HashLoader } from "react-spinners";

export default function OverviewPanel() {
  const { status, responseData } = useAccountStore();
  useAccountApi("GET", "ACCOUNTOVERVIEW", true);

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div>
      <p>{responseData.createdAt}</p>
      <p>{responseData.lastLogin}</p>
    </div>
  );
}
