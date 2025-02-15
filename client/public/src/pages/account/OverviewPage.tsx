import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { GoInbox, GoArrowRight } from "react-icons/go";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosGitNetwork } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { PiUserCheck } from "react-icons/pi";
import { HashLoader } from "react-spinners";
import OutlineBtn from "../../components/btn/OutlineBtn";
import DataCard from "../../components/utils/DataCard";
import useAccountApi from "../../hooks/useAccountApi";
import useAccountStore from "../../hooks/useAccountStore";
import { AccountResponse } from "../../types/types";
import { useNavigate } from "react-router";

export default function OverviewPage() {
  const navigate = useNavigate();
  const { status } = useAccountStore(true);
  const { callApi: fetchAccountOverview } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  const [accountOverview, setAccountOverview] = useState<AccountResponse>();

  useEffect(() => {
    const getAccountOverview = async () => {
      const response = await fetchAccountOverview();
      if (response) {
        setAccountOverview(response.data);
      }
    };
    getAccountOverview();
  }, []);

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  const rememberMessage = accountOverview?.isRemembered
    ? "Your are remembered"
    : "Your are not remembered";

  const adminApps = String(accountOverview?.adminApps ? accountOverview.adminApps.length : 0);
  const createdApps = String(accountOverview?.createdApps ? accountOverview.createdApps.length : 0);
  const appConnections = String(
    accountOverview?.appConnections ? accountOverview.appConnections.length : 0
  );

  return (
    <div className="flex flex-wrap justify-center p-20 gap-20  w-full">
      <DataCard
        data={accountOverview?.createdAt || ""}
        label="Date of Account Creation"
        icon={<IoCalendarOutline size={24} />}>
        <p className="text-gray-300">
          The date on which you successfully created and signed into your Authecho account marks the
          beginning of your experience with centralized account management. This ensures that your
          experience remains consistent across various applications.
        </p>
      </DataCard>
      <DataCard
        data={accountOverview?.lastLogin || ""}
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
            onClick={() => navigate("/account/myapps")}
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
            onClick={() => navigate("/account/administeredapps")}
            icon={<GoArrowRight size={24} />}
          />
        </div>
      </DataCard>
      <DataCard data={appConnections} label="App Connections" icon={<IoIosGitNetwork size={30} />}>
        <p className="text-gray-300">
          This indicates the number of applications you can access with your Authecho account.
          However, applications that you control, either as an administrator or those you have
          created within Authecho, are not included. Therefore, only the applications you have
          signed into using your Authecho account are counted.
        </p>
        <div className="mt-auto">
          <OutlineBtn
            btnText="See more"
            onClick={() => navigate("/account/activeconnections")}
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
