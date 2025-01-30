export const AUTH_KEY = "AUTHECHO_AUTHENTICATION";
export const USERNAME_KEY = "AUTHECHO_USERNAME";
export const EMAIL_KEY = "AUTHECHO_EMAIL";
export const ADMIN_KEY = "AUTHECHO_ADMIN";
export const AUTHECHO_LINK = "http://localhost:3001";

type MenuItems = {
  linkText: string;
  path: string;
};

export const NAV_MENU_ITEMS: MenuItems[] = [
  {
    linkText: "My account",
    path: "/account",
  },
];
