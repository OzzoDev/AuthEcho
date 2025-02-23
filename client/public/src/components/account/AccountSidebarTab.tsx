import { ReactNode } from "react";
import { NavLink } from "react-router";
import useAccountStore from "../../hooks/useAccountStore";

interface Props {
  tabName: string;
  path: string;
  icon: ReactNode;
}

export default function AccountSidebarTab({ tabName, path, icon }: Props) {
  const { unReadInvoices } = useAccountStore();

  const renderUnReadInvoicesCount = tabName === "Invoices" && unReadInvoices > 0;

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        isActive
          ? "flex items-center justify-center lg:justify-start gap-x-2 lg:gap-x-2 py-1 lg:py-6 px-4 text-lg font-medium w-full bg-gradient-to-b lg:bg-gradient-to-r from-teal-900 to-gray-900 border-r-[1px] lg:border-b-[1px] lg:border-r-[0] border-slate-500 transition-all duration-200 brightness-75"
          : "flex items-center justify-center lg:justify-start gap-x-2 lg:gap-x-2 py-1 lg:py-6 px-4 text-lg font-medium w-full bg-gradient-to-b lg:bg-gradient-to-r from-teal-900 to-gray-900 border-r-[1px] lg:border-b-[1px] lg:border-r-[0] border-slate-500 transition-all duration-200 lg:hover:pl-10 hover:brightness-75"
      }>
      {icon}
      <div className="relative whitespace-nowrap">
        {tabName}
        {renderUnReadInvoicesCount && (
          <p className="flex justify-center items-center w-4 h-4 absolute right-[-16px] top-[-2px] rounded-full text-[0.8rem] bg-rose-600">
            {unReadInvoices < 9 ? unReadInvoices : `${9}+`}
          </p>
        )}
      </div>
    </NavLink>
  );
}
