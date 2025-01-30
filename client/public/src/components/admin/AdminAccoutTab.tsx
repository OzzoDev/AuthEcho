import { ReactNode } from "react";
import { AllAdminTabName } from "../../types/types";

interface Props {
  tabText: string;
  icon: ReactNode;
  currentTab: AllAdminTabName;
  onClick: () => void;
}

export default function AdminAccountTab({ tabText, icon, currentTab, onClick }: Props) {
  const isActive = tabText === currentTab;

  return (
    <button
      onClick={onClick}
      className={`block grow flex items-center justify-center xl:justify-start gap-x-2 xl:gap-x-2 py-1 xl:py-2 px-4 text-xl font-medium bg-gradient-to-b from-teal-600 to-slate-700 border-r-[1px] border-slate-900 transition-all duration-200 transition-all duration-200 ${
        !isActive ? "hover:brightness-75" : ""
      } ${isActive ? "brightness-75" : ""}`}>
      {icon}
      <p className="whitespace-nowrap">{tabText}</p>
    </button>
  );
}
