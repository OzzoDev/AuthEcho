import { useNavigate } from "react-router";
import useAccountStore from "../../hooks/useAccountStore";
import { AccountTab, AccountTabName } from "../../types/types";
import AccountSidebarTab from "./AccountSidebarTab";
import { removeAllWhitespaces } from "../../utils/utils";

interface Props {
  tabs: AccountTab[];
}

export default function AccountSidebar({ tabs }: Props) {
  const navigate = useNavigate();
  const { currentTab, updateCurrentTab } = useAccountStore();

  const switchTab = (tabName: AccountTabName) => {
    updateCurrentTab(tabName);
    navigate(`/account/${removeAllWhitespaces(tabName.toLowerCase().replace("overview", ""))}`);
  };

  return (
    <div className="h-fit lg:h-auto w-screen lg:w-full lg:max-w-[280px] bg-slate-800">
      <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden">
        {tabs.map((tab, index) => {
          return (
            <li key={index}>
              <AccountSidebarTab
                tabName={tab.tabName}
                currentTab={currentTab}
                icon={tab.icon}
                onClick={() => switchTab(tab.tabName)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
