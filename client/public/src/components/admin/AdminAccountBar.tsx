import { AdminAccountBarTab, AllAdminTabName } from "../../types/types";
import AdminAccountTab from "./AdminAccoutTab";

interface Props {
  accountTabs: AdminAccountBarTab[];
  currentTab: AllAdminTabName;
  setCurrentTab: (currentTab: AllAdminTabName) => void;
}

export default function AdminAccountBar({ accountTabs, currentTab, setCurrentTab }: Props) {
  return (
    <ul className="flex flex-wrap">
      {accountTabs.map((tab, index) => {
        return (
          <AdminAccountTab
            key={`${tab.tabName}${index}`}
            tabText={tab.tabName}
            icon={tab.icon}
            currentTab={currentTab}
            onClick={() => setCurrentTab(tab.tabName)}
          />
        );
      })}
    </ul>
  );
}
