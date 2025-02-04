import { ReactNode } from "react";

interface Props {
  tabName: string;
  currentTab: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function AccountSidebarTab({ tabName, currentTab, icon, onClick }: Props) {
  const isActive = tabName === currentTab;

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center lg:justify-start gap-x-2 lg:gap-x-2 py-1 lg:py-6 px-4 text-lg font-medium w-full bg-gradient-to-b lg:bg-gradient-to-r from-teal-900 to-gray-900 border-r-[1px] lg:border-b-[1px] lg:border-r-[0] border-slate-500 transition-all duration-200 ${
        !isActive ? "lg:hover:pl-10" : ""
      } transition-all duration-200 ${!isActive ? "hover:brightness-75" : ""} ${
        isActive ? "brightness-75" : ""
      }`}>
      {icon}
      <p className="whitespace-nowrap">{tabName}</p>
    </button>
  );
}
