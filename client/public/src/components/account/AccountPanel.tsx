import { useEffect } from "react";
import useAccountStore from "../../hooks/useAccountStore";
import OverviewPanel from "./overview/OverviewPanel";

export default function AccountPanel() {
  const { currentTab } = useAccountStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTab]);

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
