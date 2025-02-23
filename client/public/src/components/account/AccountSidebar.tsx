import { AccountTab } from "../../types/types";
import AccountSidebarTab from "./AccountSidebarTab";
import { removeAllWhitespaces } from "../../utils/utils";

interface Props {
  tabs: AccountTab[];
}

export default function AccountSidebar({ tabs }: Props) {
  return (
    <div className="h-fit lg:h-auto w-screen lg:w-full lg:w-[320px] lg:max-w-[300px] bg-slate-800">
      <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden">
        {tabs.map((tab, index) => {
          return (
            <li key={index}>
              <AccountSidebarTab
                tabName={tab.tabName}
                path={removeAllWhitespaces(tab.tabName.toLowerCase().replace("overview", ""))}
                icon={tab.icon}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
