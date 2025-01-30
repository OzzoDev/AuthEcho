import { useState } from "react";
import AccountHeader from "./AccountHeader";
import AccountPanel from "./AccountPanel";
import AccountSidebar from "./AccountSidebar";
import { AccountDashboardTabName, AccountDashboardTab } from "../../types/types";

interface Props {
  tabs: AccountDashboardTab[];
}

export default function AccountDashboard({ tabs }: Props) {
  const [currentTab, setCurrentTab] = useState<AccountDashboardTabName>("Overview");

  return (
    <div className="xl:grid xl:grid-cols-[300px_1fr] w-full pt-[65px] text-white">
      <AccountSidebar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="pb-[200px]">
        <AccountHeader />
        <AccountPanel currentTab={currentTab} />
      </div>
    </div>
  );
}
