import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import AccountHeader from "../../components/account/AccountHeader";
import { GoInbox } from "react-icons/go";
import { GrOverview, GrUserAdmin } from "react-icons/gr";
import { IoIosGitNetwork } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { AccountTab } from "../../types/types";
import { HiOutlineMail } from "react-icons/hi";
import AccountSidebar from "../../components/account/AccountSidebar";

const ACCOUNT_SIDEBAR_TABS: AccountTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Invoices", icon: <HiOutlineMail size={24} /> },
  { tabName: "My apps", icon: <GoInbox size={24} /> },
  { tabName: "Administered apps", icon: <GrUserAdmin size={24} /> },
  { tabName: "Active Connections", icon: <IoIosGitNetwork size={24} /> },
];

export default function AccountPage() {
  const navigate = useNavigate();

  useAuth(() => navigate("/signin"));

  return (
    <div className="grow flex flex-col min-h-screen">
      <AccountHeader />
      <div className="grow flex flex-col lg:flex-row lg:h-full">
        <AccountSidebar tabs={ACCOUNT_SIDEBAR_TABS} />
      </div>
    </div>
  );
}
