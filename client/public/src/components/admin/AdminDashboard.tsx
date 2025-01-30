import { useState } from "react";
import { AdminDashboardTab, AdminAccountBarTab, AllAdminTabName } from "../../types/types";
import AdminHeader from "./AdminHeader";
import AdminPanel from "./AdminPanel";
import AdminSidebar from "./AdminSidebar";
import AdminAccountBar from "./AdminAccountBar";

interface Props {
  tabs: AdminDashboardTab[];
  accountTabs: AdminAccountBarTab[];
}

export default function AdminDashboard({ tabs, accountTabs }: Props) {
  const [currentTab, setCurrentTab] = useState<AllAdminTabName>("Users");

  return (
    <div className="flex pt-[65px] text-white">
      <div className="xl:grid xl:grid-cols-[300px_1fr] w-full">
        <AdminSidebar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="pb-[200px]">
          <AdminHeader />
          <AdminAccountBar
            accountTabs={accountTabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <AdminPanel currentTab={currentTab} />
        </div>
      </div>
    </div>
  );
}
