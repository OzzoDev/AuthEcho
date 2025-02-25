import useAuthStore from "../hooks/useAuthStore";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { Navigate, Outlet } from "react-router";
import { GoInbox } from "react-icons/go";
import { GrOverview, GrUserAdmin } from "react-icons/gr";
import { IoIosGitNetwork } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import AccountHeader from "../components/account/AccountHeader";
import AccountSidebar from "../components/account/AccountSidebar";
import { AccountTab, FetchStatus } from "../types/types";
import { useEffect, useState } from "react";
import useAccountStore from "../hooks/useAccountStore";
import useAccountApi from "../hooks/useAccountApi";
import { HashLoader } from "react-spinners";

const ACCOUNT_SIDEBAR_TABS: AccountTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Invoices", icon: <HiOutlineMail size={24} /> },
  { tabName: "My apps", icon: <GoInbox size={24} /> },
  { tabName: "Administered apps", icon: <GrUserAdmin size={24} /> },
  { tabName: "Active Connections", icon: <IoIosGitNetwork size={24} /> },
];

export default function AccountLayout() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { callApi: fetchAccountOverview } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  const { updateUnReadInvoices, updateAccountOverview } = useAccountStore();
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    (async () => {
      setApiStatus("loading");

      const response = await fetchAccountOverview();
      const unReadInvocies = response?.data.unReadInvoices;
      const overview = response?.data;
      overview && updateAccountOverview(overview);
      unReadInvocies && updateUnReadInvoices(unReadInvocies);

      response ? setApiStatus("success") : setApiStatus("error");
    })();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  if (apiStatus === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <ProtectedRoute allowCondition={isAuthenticated}>
      <div className="grow flex flex-col min-h-screen">
        <AccountHeader />
        <div className="grow flex flex-col lg:flex-row lg:h-full">
          <AccountSidebar tabs={ACCOUNT_SIDEBAR_TABS} />
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}
