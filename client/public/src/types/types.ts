import { ReactNode } from "react";

export type AuthehcoRequest = {
  user: string;
  password?: string;
  verificationCode?: string;
  questionAnswer?: string;
  rememberUser: boolean;
  [key: string]: string | boolean | undefined;
};

export type AuthechoResponse = {
  message: string;
  success: boolean;
  question?: string;
  name?: string;
  email?: string;
  isAppAdmin?: boolean;
};

export type ApiResponse = {
  message?: string;
  success: boolean;
  users?: User[];
};

export type User = {
  id?: number;
  name?: string;
  email?: string;
};

export type ApiUseCase = "GETUSERS" | "ADDUSER";

export type SignInState = "user" | "code" | "question" | "password";

export type Status = "idle" | "loading" | "error" | "success";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type AccountDashboardTabName =
  | "Overview"
  | "Profile"
  | "Settings"
  | "Themes & Appearance"
  | "Messages"
  | "Notifications"
  | "Activity Log"
  | "Achievements"
  | "Badges"
  | "Engagement Stats"
  | "Friends & Connections"
  | "Subscription Plan"
  | "Invoices"
  | "My Posts"
  | "Saved Items"
  | "Recommendations"
  | "Recommendations"
  | "Content Preferences"
  | "Language Preferences"
  | "Time Zone Settings"
  | "Accessibility Options"
  | "Events";

export type AccountDashboardTab = {
  tabName: AccountDashboardTabName;
  icon: ReactNode;
};

export type AdminDashboardTabName =
  | "Users"
  | "User Permissions"
  | "User Groups"
  | "Traffic Reports"
  | "Sales Reports"
  | "Backup & Restore"
  | "System Health"
  | "Product Management"
  | "Order Management"
  | "Customer Management"
  | "Inventory Management"
  | "Notifications"
  | "Invoices"
  | "Events"
  | "Sales Reports"
  | "Conversion Rates"
  | "Announcements"
  | "Feedback & Suggestions"
  | "Marketing Campaigns"
  | "Email Marketing"
  | "Social Media Integration"
  | "Advertising Management";

export type AdminDashboardTab = {
  tabName: AdminDashboardTabName;
  icon: ReactNode;
};

export type AdminAccountBarTabName =
  | "Overview"
  | "Profile"
  | "Settings"
  | "Themes & Appearance"
  | "Messages"
  | "Language Preferences"
  | "Time Zone Settings"
  | "Accessibility Options";

export type AdminAccountBarTab = {
  tabName: AdminAccountBarTabName;
  icon: ReactNode;
};

export type AllAdminTabName = AdminDashboardTabName | AdminAccountBarTabName;
