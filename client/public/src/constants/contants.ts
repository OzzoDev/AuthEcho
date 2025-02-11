import { AppStatus, AppStatusData } from "../types/types";

export const USERNAME_KEY = "AUTHECHO_USERNAME";
export const EMAIL_KEY = "AUTHECHO_EMAIL";
export const AUTH_KEY = "AUTHECHO_AUTHENTICATION";
export const ADMIN_KEY = "AUTHECHO_ADMIN";

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
    color: "blue-400",
    icon: "💪",
    sortValue: 0,
  },
  maintenance: {
    status: "maintenance",
    color: "zinc-600",
    icon: "🔧",
    sortValue: 0,
  },
  testing: {
    status: "testing",
    color: "slate-600",
    icon: "🚀",
    sortValue: 0,
  },
  "pre-production": {
    status: "development",
    color: "cyan-500",
    icon: "📢",
    sortValue: 0,
  },
  production: {
    status: "development",
    color: "green-400",
    icon: "🎉",
    sortValue: 0,
  },
};
