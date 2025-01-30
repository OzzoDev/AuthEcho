import { JSX, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { AllAdminTabName } from "../../types/types";

interface Props {
  currentTab: AllAdminTabName;
}

export default function AdminPanel({ currentTab }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentTab]);

  if (isLoading) {
    return (
      <div className="flex justify-center pt-[50px] w-full h-full">
        <HashLoader color="#d8dbe3" size={60} />
      </div>
    );
  }

  let currentPanel: JSX.Element | null = null;

  switch (currentTab) {
    case "Users":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Users tab</p>
        </div>
      );
      break;
    case "User Permissions":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">User Permissions tab</p>
        </div>
      );
      break;
    case "User Groups":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">User Groups tab</p>
        </div>
      );
      break;
    case "Traffic Reports":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Traffic Reports tab</p>
        </div>
      );
      break;
    case "Sales Reports":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Sales Reports tab</p>
        </div>
      );
      break;
    case "Backup & Restore":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Backup & Restore tab</p>
        </div>
      );
      break;
    case "System Health":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">System Health tab</p>
        </div>
      );
      break;
    case "Product Management":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Product Management tab</p>
        </div>
      );
      break;
    case "Order Management":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Order Management tab</p>
        </div>
      );
      break;
    case "Customer Management":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Customer Management tab</p>
        </div>
      );
      break;
    case "Inventory Management":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Inventory Management tab</p>
        </div>
      );
      break;
    case "Notifications":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Notifications tab</p>
        </div>
      );
      break;
    case "Invoices":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Invoices tab</p>
        </div>
      );
      break;
    case "Events":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Events tab</p>
        </div>
      );
      break;
    case "Conversion Rates":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Conversion Rates tab</p>
        </div>
      );
      break;
    case "Announcements":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Announcements tab</p>
        </div>
      );
      break;
    case "Feedback & Suggestions":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Feedback & Suggestions tab</p>
        </div>
      );
      break;
    case "Marketing Campaigns":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Marketing Campaigns tab</p>
        </div>
      );
      break;
    case "Email Marketing":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Email Marketing tab</p>
        </div>
      );
      break;
    case "Social Media Integration":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Social Media Integration tab</p>
        </div>
      );
      break;
    case "Advertising Management":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Advertising Management tab</p>
        </div>
      );
      break;
    case "Overview":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Overview tab</p>
        </div>
      );
      break;
    case "Profile":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Profile tab</p>
        </div>
      );
      break;
    case "Settings":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Settings tab</p>
        </div>
      );
      break;
    case "Themes & Appearance":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Themes & Appearance tab</p>
        </div>
      );
      break;
    case "Messages":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Messages tab</p>
        </div>
      );
      break;
    case "Language Preferences":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Language Preferences tab</p>
        </div>
      );
      break;
    case "Time Zone Settings":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Time Zone Settings tab</p>
        </div>
      );
      break;
    case "Accessibility Options":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Accessibility Options tab</p>
        </div>
      );
      break;
    default:
      break;
  }

  if (!currentPanel) {
    return (
      <div className="flex justify-center pt-[50px] w-full h-full">
        <h2 className="text-center text-3xl font-semibold">This tab is currently unoccupied.</h2>
      </div>
    );
  }

  return currentPanel;
}
