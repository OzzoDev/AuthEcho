import { useNavigate } from "react-router";
import useAuthechoAuth from "../hooks/authecho/useAuthechoAuth";
import { VscAccount, VscFeedback } from "react-icons/vsc";
import { GrOverview } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDevicesOther, MdOutlineInventory2, MdOutlineSocialDistance } from "react-icons/md";
import {
  LuChartNoAxesCombined,
  LuHandCoins,
  LuMessageSquareText,
  LuShoppingCart,
} from "react-icons/lu";
import { MdNotificationsNone } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { IoAccessibilityOutline } from "react-icons/io5";
import {
  RiCalendarEventLine,
  RiInboxArchiveLine,
  RiMailVolumeLine,
  RiStore2Line,
} from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { TfiAnnouncement, TfiStatsUp } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { TbHealthRecognition } from "react-icons/tb";
import { FiDatabase, FiUser } from "react-icons/fi";
import { FaRegFlag } from "react-icons/fa";
import { AdminAccountBarTab, AdminDashboardTab } from "../types/types";
import AdminDashboard from "../components/admin/AdminDashboard";

const ADMIN_DASHBOARD_TABS: AdminDashboardTab[] = [
  { tabName: "Users", icon: <LuUsers size={24} /> },
  { tabName: "User Permissions", icon: <RiShieldUserLine size={24} /> },
  { tabName: "User Groups", icon: <PiUsersThreeBold size={24} /> },
  { tabName: "Traffic Reports", icon: <LuChartNoAxesCombined size={24} /> },
  { tabName: "Sales Reports", icon: <LuHandCoins size={24} /> },
  { tabName: "Conversion Rates", icon: <TfiStatsUp size={24} /> },
  { tabName: "Marketing Campaigns", icon: <RiStore2Line size={24} /> },
  { tabName: "Email Marketing", icon: <RiMailVolumeLine size={24} /> },
  { tabName: "Social Media Integration", icon: <MdOutlineSocialDistance size={24} /> },
  { tabName: "Advertising Management", icon: <FaRegFlag size={24} /> },
  { tabName: "Backup & Restore", icon: <FiDatabase size={24} /> },
  { tabName: "System Health", icon: <TbHealthRecognition size={24} /> },
  { tabName: "Product Management", icon: <LuShoppingCart size={24} /> },
  { tabName: "Order Management", icon: <RiInboxArchiveLine size={24} /> },
  { tabName: "Customer Management", icon: <FiUser size={24} /> },
  { tabName: "Inventory Management", icon: <MdOutlineInventory2 size={24} /> },
  { tabName: "Notifications", icon: <MdNotificationsNone size={24} /> },
  { tabName: "Invoices", icon: <MdOutlineEmail size={24} /> },
  { tabName: "Events", icon: <RiCalendarEventLine size={24} /> },
  { tabName: "Announcements", icon: <TfiAnnouncement size={24} /> },
  { tabName: "Feedback & Suggestions", icon: <VscFeedback /> },
];

const ADMIN_ACCOUNTBAR_TABS: AdminAccountBarTab[] = [
  { tabName: "Overview", icon: <GrOverview size={24} /> },
  { tabName: "Profile", icon: <VscAccount size={24} /> },
  { tabName: "Settings", icon: <IoSettingsOutline size={24} /> },
  { tabName: "Themes & Appearance", icon: <MdDevicesOther size={24} /> },
  { tabName: "Messages", icon: <LuMessageSquareText size={24} /> },
  { tabName: "Language Preferences", icon: <GrLanguage size={24} /> },
  { tabName: "Time Zone Settings", icon: <MdAccessTime size={24} /> },
  { tabName: "Accessibility Options", icon: <IoAccessibilityOutline size={24} /> },
];

export default function AdminPage() {
  const navigate = useNavigate();

  useAuthechoAuth(() => navigate("/account"), true);

  return <AdminDashboard tabs={ADMIN_DASHBOARD_TABS} accountTabs={ADMIN_ACCOUNTBAR_TABS} />;
}
