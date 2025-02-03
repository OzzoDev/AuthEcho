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
