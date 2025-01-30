import { useNavigate } from "react-router";
import useAuthechoAuth from "../hooks/authecho/useAuthechoAuth";
import useNavigateAdmin from "../hooks/authecho/useNavigateAdmin";
import AccountDashboard from "../components/account/AccountDashboard";
import { VscAccount } from "react-icons/vsc";
import { GrOverview } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDevicesOther } from "react-icons/md";
import { LuMessageSquareText } from "react-icons/lu";
import { MdNotificationsNone } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { MdQueryStats } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineRecommend } from "react-icons/md";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { IoAccessibilityOutline } from "react-icons/io5";
import { RiCalendarEventLine } from "react-icons/ri";
import { GiAchievement } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { GrLanguage } from "react-icons/gr";
import { AccountDashboardTab } from "../types/types";

const ACCOUNT_DASHBOARD_TABS: AccountDashboardTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Profile", icon: <VscAccount size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Themes & Appearance", icon: <MdDevicesOther size={24} /> },
  { tabName: "Messages", icon: <LuMessageSquareText size={24} /> },
  { tabName: "Notifications", icon: <MdNotificationsNone size={24} /> },
  { tabName: "Activity Log", icon: <LuActivity size={24} /> },
  { tabName: "Achievements", icon: <GiAchievement size={24} /> },
  { tabName: "Badges", icon: <SlBadge size={24} /> },
  { tabName: "Engagement Stats", icon: <MdQueryStats size={24} /> },
  { tabName: "Friends & Connections", icon: <LiaUserFriendsSolid size={24} /> },
  { tabName: "Subscription Plan", icon: <MdPayment size={24} /> },
  { tabName: "Invoices", icon: <MdOutlineEmail size={24} /> },
  { tabName: "My Posts", icon: <MdOutlinePostAdd size={24} /> },
  { tabName: "Saved Items", icon: <CiSaveDown2 size={24} /> },
  { tabName: "Recommendations", icon: <MdOutlineRecommend size={24} /> },
  { tabName: "Content Preferences", icon: <MdOutlineContentPasteGo size={24} /> },
  { tabName: "Language Preferences", icon: <GrLanguage size={24} /> },
  { tabName: "Time Zone Settings", icon: <MdAccessTime size={24} /> },
  { tabName: "Accessibility Options", icon: <IoAccessibilityOutline size={24} /> },
  { tabName: "Events", icon: <RiCalendarEventLine size={24} /> },
];

export default function AccountPage() {
  const navigate = useNavigate();

  useAuthechoAuth(() => navigate("/signin"), true);
  useNavigateAdmin(() => navigate("/admin"));

  return <AccountDashboard tabs={ACCOUNT_DASHBOARD_TABS} />;
}
