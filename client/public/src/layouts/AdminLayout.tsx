import useAuthStore from "../hooks/useAuthStore";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { Outlet } from "react-router";
import { GoInbox } from "react-icons/go";
import { GrOverview } from "react-icons/gr";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";
import { AdminTab } from "../types/types";
import { useEffect } from "react";
import { PiUsersThreeBold } from "react-icons/pi";
import { LuFlag } from "react-icons/lu";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSideBar";
import useAdminApi from "../hooks/useAdminApi";
import useAdminStore from "../hooks/useAdminStore";

const ACCOUNT_SIDEBAR_TABS: AdminTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Users", icon: <PiUsersThreeBold size={24} /> },
  { tabName: "Apps", icon: <GoInbox size={24} /> },
  { tabName: "Reported Issues", icon: <LuFlag size={24} /> },
  { tabName: "Traffic", icon: <IoBarChartOutline size={24} /> },
];

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { callApi: fetchOverview } = useAdminApi("GET", "OVERVIEW");
  const { updateOverview, updateUnResolvedIssue } = useAdminStore();

  useEffect(() => {
    (async () => {
      const response = await fetchOverview();

      const unResolvedIssues = response?.data.unResolvedIssues;
      const overview = response?.data;
      overview &&
        updateOverview({
          ...overview,
          apps: overview.apps?.map((app) => ({ ...app, isVisible: true })),
          users: overview.users?.map((user) => ({ ...user, isVisible: true })),
        });
      unResolvedIssues && updateUnResolvedIssue(unResolvedIssues);
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
