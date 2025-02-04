import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import AccountHeader from "../../components/account/AccountHeader";
import AccountSidebar from "../../components/account/AccountSideBar";
import AccountPanel from "../../components/account/AccountPanel";
import { useEffect, useState } from "react";
import { BsCollection } from "react-icons/bs";
import { GoInbox } from "react-icons/go";
import { GrOverview, GrUserAdmin } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoIosGitNetwork } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { AccountTab, AccountTabName, FetchStatus } from "../../types/types";
import { HiOutlineMail } from "react-icons/hi";
import { BiMessageRoundedError } from "react-icons/bi";

const ACCOUNT_SIDEBAR_TABS: AccountTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Apps", icon: <BsCollection size={24} /> },
  { tabName: "Users", icon: <HiOutlineUserGroup size={24} /> },
  { tabName: "Invoices", icon: <HiOutlineMail size={24} /> },
  { tabName: "Reported issues", icon: <BiMessageRoundedError size={24} /> },
  { tabName: "My apps", icon: <GoInbox size={24} /> },
  { tabName: "Administered apps", icon: <GrUserAdmin size={24} /> },
  { tabName: "Active Connections", icon: <IoIosGitNetwork size={24} /> },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<AccountTabName>("Overview");
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    setApiStatus("loading");

    const timeoutID = setTimeout(() => {
      setApiStatus("success");
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [currentTab]);

  useAuth(() => navigate("/signin"));

  return (
    <div className="grow flex flex-col min-h-screen">
      <AccountHeader />
      <div className="grow flex flex-col lg:flex-row lg:h-full">
        <AccountSidebar
          tabs={ACCOUNT_SIDEBAR_TABS}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <AccountPanel currentTab={currentTab} apiStatus={apiStatus} />
      </div>
    </div>
  );
}
