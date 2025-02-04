import { AccountTabName, FetchStatus } from "../../types/types";
import { HashLoader } from "react-spinners";
import OverviewPanel from "./overview/OverviewPanel";

interface Props {
  currentTab: AccountTabName;
  apiStatus: FetchStatus;
}

export default function AccountPanel({ currentTab, apiStatus }: Props) {
  switch (currentTab) {
    case "Overview":
      return <OverviewPanel />;
    case "Settings":
      return <h1>Settings tab</h1>;
    case "Apps":
      return <h1>Apps tab</h1>;
    case "Users":
      return <h1>Users tab</h1>;
    case "Invoices":
      return <h1>Invoices tab</h1>;
    case "Reported issues":
      return <h1>Reported issues tab</h1>;
    case "My apps":
      return <h1>My apps tab</h1>;
    case "Administered apps":
      return <h1>Administered apps tab</h1>;
    case "Active Connections":
      return <h1>Active Connections tab</h1>;
  }
}
