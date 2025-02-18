import { AdminTab } from "../../types/types";
import { removeAllWhitespaces } from "../../utils/utils";
import AdminSidebarTab from "./AdminSidebarTab";

interface Props {
  tabs: AdminTab[];
}

export default function AdminSidebar({ tabs }: Props) {
  return (
    <div className="h-fit lg:h-auto w-screen lg:w-full lg:w-[320px] lg:max-w-[300px] bg-slate-800">
      <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden">
        {tabs.map((tab, index) => {
          return (
            <li key={index}>
              <AdminSidebarTab
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
