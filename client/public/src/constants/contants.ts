import { AppStatus, AppStatusData, TimeOption } from "../types/types";

export const USERNAME_KEY = "AUTHECHO_USERNAME";
export const EMAIL_KEY = "AUTHECHO_EMAIL";
export const AUTH_KEY = "AUTHECHO_AUTHENTICATION";
export const ADMIN_KEY = "AUTHECHO_ADMIN";
export const USER_APPS_KEY = "AUTHECHO_USER_APPS";

type Link = {
  linkText: string;
  path: string;
};

export const NAV_LINKS: Link[] = [
  {
    linkText: "Create account",
    path: "/signup",
  },
  {
    linkText: "My account",
    path: "/account",
  },
  {
    linkText: "Reset Password",
    path: "/resetPassword",
  },
  {
    linkText: "Unlock account",
    path: "/unlockaccount",
  },
];

export const FOOTER_LINKS: Link[] = [
  {
    linkText: "About",
    path: "/about",
  },
  {
    linkText: "Privacy Policy",
    path: "/privacypolicy",
  },
  {
    linkText: "Licensing",
    path: "/licensing",
  },
  {
    linkText: "Contact",
    path: "/contact",
  },
];

export const APP_STATUS_MAP: Record<AppStatus, AppStatusData> = {
  development: {
    status: "development",
    color: "#21c0ff",
    icon: "💪",
    sortValue: 0,
  },
  maintenance: {
    status: "maintenance",
    color: "#505859",
    icon: "🔧",
    sortValue: 1,
  },
  testing: {
    status: "testing",
    color: "#c363f7",
    icon: "🚀",
    sortValue: 2,
  },
  "pre-production": {
    status: "pre-production",
    color: "#fa760a",
    icon: "📢",
    sortValue: 3,
  },
  production: {
    status: "production",
    color: "#0afa6e",
    icon: "🎉",
    sortValue: 4,
  },
};

export const TIME_OPTIONS: TimeOption[] = [
  { time: "Start", days: -1 },
  { time: "5y", days: 1825 },
  { time: "3y", days: 1095 },
  { time: "1y", days: 365 },
  { time: "6m", days: 180 },
  { time: "3m", days: 90 },
  { time: "1m", days: 30 },
  { time: "2w", days: 14 },
  { time: "1w", days: 7 },
  { time: "3d", days: 3 },
  { time: "1d", days: 1 },
  { time: "Today", days: 0 },
];
