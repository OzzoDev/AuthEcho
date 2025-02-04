import useAccountStore from "../../hooks/useAccountStore";
import { AccountTab } from "../../types/types";
import AccountSidebarTab from "./AccountSidebarTab";

interface Props {
  tabs: AccountTab[];
}

export default function AccountSidebar({ tabs }: Props) {
  const { currentTab, updateCurrentTab } = useAccountStore();

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
                onClick={() => updateCurrentTab(tab.tabName)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
