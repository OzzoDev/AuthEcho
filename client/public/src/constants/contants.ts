export const NAME_KEY = "AUTHECHO_USERNAME";
export const EMAIL_KEY = "AUTHECHO_EMAIL";
export const AUTH_KEY = "AUTHECHO_AUTHENTICATION";

type MenuItems = {
  linkText: string;
  path: string;
};

export const NAV_MENU_ITEMS: MenuItems[] = [
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
  {
    linkText: "Contact",
    path: "/contact",
  },
  {
    linkText: "About",
    path: "/about",
  },
];
