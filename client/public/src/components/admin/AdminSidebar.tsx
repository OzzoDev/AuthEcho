import { useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { AdminDashboardTab, AllAdminTabName } from "../../types/types";
import AdminSidebarTab from "./AdminSidebarTab";

interface Props {
  tabs: AdminDashboardTab[];
  currentTab: AllAdminTabName;
  setCurrentTab: (currentTab: AllAdminTabName) => void;
}

export default function AccountSidebar({ tabs, currentTab, setCurrentTab }: Props) {
  const [dashboardTabs, setDashBoardTabs] = useState<AdminDashboardTab[]>(tabs);
  const tabListRef = useRef<HTMLUListElement | null>(null);

  const searchTabs = (searchQuery: string): void => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    if (searchQuery) {
      const matchingTabs = [...dashboardTabs].sort((a, b) => {
        const tabNameA = a.tabName.toLowerCase();
        const tabNameB = b.tabName.toLowerCase();

        const aIndex = tabNameA.indexOf(lowerCaseQuery);
        const bIndex = tabNameB.indexOf(lowerCaseQuery);

        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }

        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;

        return 0;
      });

      setDashBoardTabs(matchingTabs);
    } else {
      setDashBoardTabs(tabs);
    }

    if (tabListRef.current) {
      tabListRef.current.scrollTop = 0;
      tabListRef.current.scrollLeft = 0;
    }
  };

  const handleTabClick = (tabName: AllAdminTabName) => {
    setCurrentTab(tabName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grow xl:max-w-[300px] w-full xl:min-h-screen bg-gray-950">
      <div className="flex flex-row-reverse items-center gap-x-4 p-4">
        <IoSearchSharp size={30} />
        <input
          type="text"
          placeholder="Search"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onChange={(e) => searchTabs(e.target.value)}
          className="w-full bg-transparent outline-none focus:ring-0 border-b-[1px]"
        />
      </div>
      <ul ref={tabListRef} className="flex flex-row xl:flex-col lg:h-full overflow-auto">
        {dashboardTabs.map((tab, index) => {
          return (
            <AdminSidebarTab
              key={`${tab.tabName}${index}`}
              tabText={tab.tabName}
              icon={tab.icon}
              currentTab={currentTab}
              onClick={() => handleTabClick(tab.tabName)}
            />
          );
        })}
      </ul>
    </div>
  );
}
