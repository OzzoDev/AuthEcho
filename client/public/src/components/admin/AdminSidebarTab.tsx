import { ReactNode } from "react";
import { AllAdminTabName } from "../../types/types";

interface Props {
  tabText: string;
  icon: ReactNode;
  currentTab: AllAdminTabName;
  onClick: () => void;
}

export default function AdminSidebarTab({ tabText, icon, currentTab, onClick }: Props) {
  const isActive = tabText === currentTab;

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center xl:justify-start gap-x-2 xl:gap-x-2 py-1 xl:py-6 px-4 text-xl xl:text-left font-medium bg-gradient-to-b xl:bg-gradient-to-r from-cyan-600 to-sky-800 border-r-[1px] xl:border-b-[1px] xl:border-r-[0] border-slate-900 ${
        !isActive ? "xl:hover:pl-2" : ""
      } transition-all duration-200 ${!isActive ? "hover:brightness-75" : ""} ${
        isActive ? "brightness-75" : ""
      }`}>
      {icon}
      <p>{tabText}</p>
    </button>
  );
}
