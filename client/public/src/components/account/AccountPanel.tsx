import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { AccountDashboardTabName } from "../../types/types";
import { JSX } from "react/jsx-runtime";

interface Props {
  currentTab: AccountDashboardTabName;
}

export default function AccountPanel({ currentTab }: Props) {
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

  let currentPanel: JSX.Element | null;

  switch (currentTab) {
    case "Overview":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Overview tab</p>
        </div>
      );
      break;
    case "Profile":
      currentPanel = (
        <div className="grow flex justify-center pt-[50px] w-full h-full">
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
    case "Notifications":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Notifications tab</p>
        </div>
      );
      break;
    case "Activity Log":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Activity Log tab</p>
        </div>
      );
      break;
    case "Achievements":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Achievements tab</p>
        </div>
      );
      break;
    case "Badges":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Badges tab</p>
        </div>
      );
      break;
    case "Engagement Stats":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Engagement Stats tab</p>
        </div>
      );
      break;
    case "Friends & Connections":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Friends & Connections tab</p>
        </div>
      );
      break;
    case "Subscription Plan":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Subscription Plan tab</p>
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
    case "My Posts":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">My Posts tab</p>
        </div>
      );
      break;
    case "Saved Items":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Saved Items tab</p>
        </div>
      );
      break;
    case "Recommendations":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Recommendations tab</p>
        </div>
      );
      break;
    case "Content Preferences":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Content Preferences tab</p>
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
    case "Events":
      currentPanel = (
        <div className="flex justify-center pt-[50px] w-full h-full">
          <p className="text-center text-2xl font-medium">Events tab</p>
        </div>
      );
      break;
    default:
      return null;
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
