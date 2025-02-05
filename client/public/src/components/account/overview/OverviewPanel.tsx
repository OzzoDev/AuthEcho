import useAccountApi from "../../../hooks/useAccountApi";
import useAccountStore from "../../../hooks/useAccountStore";
import { HashLoader } from "react-spinners";
import DataCard from "../../utils/DataCard";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { GoArrowRight, GoInbox } from "react-icons/go";
import { IoIosGitNetwork } from "react-icons/io";
import { PiUserCheck } from "react-icons/pi";
import OutlineBtn from "../../btn/OutlineBtn";

export default function OverviewPanel() {
  const { status, responseData, updateCurrentTab } = useAccountStore(true);
  useAccountApi("GET", "ACCOUNTOVERVIEW", true);

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  const rememberMessage = responseData.isRemembered
    ? "Your are remembered"
    : "Your are not remembered";

  const adminApps = String(responseData.adminApps ? responseData.adminApps.length : 0);
  const createdApps = String(responseData.createdApps ? responseData.createdApps.length : 0);
  const appConnections = String(
    responseData.appConnections ? responseData.appConnections.length : 0
  );

  return (
    <div className="flex flex-wrap justify-center p-20 gap-20  w-full">
      <DataCard
        data={responseData.createdAt || ""}
        label="Date of Account Creation"
        icon={<IoCalendarOutline size={24} />}>
        <p className="text-gray-300">
          The date on which you successfully created and signed into your Authecho account marks the
          beginning of your experience with centralized account management. This ensures that your
          experience remains consistent across various applications.
        </p>
      </DataCard>
      <DataCard
        data={responseData.lastLogin || ""}
        label="Most Recent Login"
        icon={<FaRegClock size={24} />}>
        <p className="text-gray-300">
          Your most recent login will be recorded each time you access your account dashboard. This
          serves as a verification mechanism, allowing you to confirm that your latest sign-in
          session is authenticated and secure.
        </p>
      </DataCard>
      <DataCard
        data={createdApps}
        label="Number of Created Applications"
        icon={<GoInbox size={24} />}>
        <p className="text-gray-300">
          This represents the number of applications you have connected to your Authecho account and
          integrated with the Authecho SDK. These applications are under your full control, allowing
          for customization as needed with the SDK.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See more"
            onClick={() => updateCurrentTab("My apps")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>
      <DataCard data={adminApps} label="Managed Applications" icon={<GrUserAdmin size={24} />}>
        <p className="text-gray-300">
          These are the applications over which you have administrative control. When you log into
          these applications, you are granted admin permissions, enabling you to manage content,
          oversee products, and view traffic reports associated with the application.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See more"
            onClick={() => updateCurrentTab("Administered apps")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>
      <DataCard
        data={appConnections}
        label="Total Application Connections"
        icon={<IoIosGitNetwork size={30} />}>
        <p className="text-gray-300">
          This indicates the total number of applications you have access to with your Authecho
          account. It includes both newly signed-in applications and those you have created and
          connected to Authecho, as well as applications where you have been granted admin access.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See more"
            onClick={() => updateCurrentTab("Active Connections")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>
      <DataCard data={rememberMessage} label="Am I Remembered?" icon={<PiUserCheck size={30} />}>
        <p className="text-gray-300">
          By default, you will be remembered across sessions upon signing in, meaning you will not
          need to log in again the next time you wish to access your account. Due to high-security
          standards, you can remain logged in for a maximum of one year. If you prefer not to be
          remembered, you can uncheck that option during the login process.
        </p>
      </DataCard>
    </div>
  );
}
