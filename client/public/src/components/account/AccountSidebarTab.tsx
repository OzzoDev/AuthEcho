import { ReactNode } from "react";
import { AccountDashboardTabName } from "../../types/types";

interface Props {
  tabText: string;
  icon: ReactNode;
  currentTab: AccountDashboardTabName;
  onClick: () => void;
}

export default function AccountSidebarTab({ tabText, icon, currentTab, onClick }: Props) {
  const isActive = tabText === currentTab;

  return (
    <button
      onClick={onClick}
      className={`block flex xl:w-[360px] items-center justify-center xl:justify-start gap-x-2 xl:gap-x-2 py-1 xl:py-6 px-4 text-xl font-medium w-full bg-gradient-to-b xl:bg-gradient-to-r from-teal-900 to-gray-900 border-r-[1px] xl:border-b-[1px] xl:border-r-[0] border-slate-500 transition-all duration-200 ${
        !isActive ? "xl:hover:pl-10" : ""
      } transition-all duration-200 ${!isActive ? "hover:brightness-75" : ""} ${
        isActive ? "brightness-75" : ""
      }`}>
      {icon}
      <p className="whitespace-nowrap">{tabText}</p>
    </button>
  );
}
