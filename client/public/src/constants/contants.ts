import { AppStatus, AppStatusData } from "../types/types";

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
    sortValue: 0,
  },
  testing: {
    status: "testing",
    color: "#c363f7",
    icon: "🚀",
    sortValue: 0,
  },
  "pre-production": {
    status: "pre-production",
    color: "#fa760a",
    icon: "📢",
    sortValue: 0,
  },
  production: {
    status: "production",
    color: "#0afa6e",
    icon: "🎉",
    sortValue: 0,
  },
};
