import useAuthStore from "../hooks/useAuthStore";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { Outlet } from "react-router";
import { GoInbox } from "react-icons/go";
import { GrOverview } from "react-icons/gr";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";
import AccountHeader from "../components/account/AccountHeader";
import AccountSidebar from "../components/account/AccountSidebar";
import { AdminTab } from "../types/types";
import { useEffect } from "react";
import { PiUsersThreeBold } from "react-icons/pi";
import { LuFlag } from "react-icons/lu";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSideBar";

const ACCOUNT_SIDEBAR_TABS: AdminTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Users", icon: <PiUsersThreeBold size={24} /> },
  { tabName: "Apps", icon: <GoInbox size={24} /> },
  { tabName: "Reported issues", icon: <LuFlag size={24} /> },
  { tabName: "Traffic", icon: <IoBarChartOutline size={24} /> },
];

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  //   const { callApi: fetchAccountOverview } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  //   const { updateUnReadInvoices, updateAccountOverview } = useAccountStore();

  useEffect(() => {
    (async () => {
      //   const response = await fetchAccountOverview();
      //   const unReadInvocies = response?.data.unReadInvoices;
      //   const overview = response?.data;
      //   overview && updateAccountOverview(overview);
      //   unReadInvocies && updateUnReadInvoices(unReadInvocies);
    })();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ProtectedRoute allowCondition={isAuthenticated && isAdmin}>
      <div className="grow flex flex-col min-h-screen">
        <AdminHeader />
        <div className="grow flex flex-col lg:flex-row lg:h-full">
          <AdminSidebar tabs={ACCOUNT_SIDEBAR_TABS} />
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}
