import { useState, useEffect } from "react";
import { IoArrowBackOutline, IoBarChartOutline, IoKeyOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import AppDetailsCard from "../../components/account/app/AppDetailsCard";
import UpdateDataForm from "../../components/account/settings/UpdateDataForm";
import OutlineBtn from "../../components/btn/OutlineBtn";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import AdminManager from "../../components/connect/AdminManager";
import ResourceManager from "../../components/connect/ResourceManager";
import DescriptiveInput from "../../components/utils/DescriptiveInput";
import Dropdown from "../../components/utils/Dropdown";
import SecretText from "../../components/utils/SecretText";
import { APP_STATUS_MAP } from "../../constants/contants";
import useApi from "../../hooks/useApi";
import useAuthStore from "../../hooks/useAuthStore";
import useClipboard from "../../hooks/useClipboard";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { AuthechoApp, ConnectResource, ConnectRequest, AppStatus } from "../../types/types";
import { capitalize } from "../../utils/utils";
import Divider from "../../components/utils/Divider";

export default function AdminAppDetailsPage() {
  const navigate = useNavigate();
  const { fetchData: updateApp } = useApi("PUT", "UPDATEAPP");
  const { fetchData: generateAppKey } = useApi("POST", "GENERATEAPKEY");
  const { copyToClipboard } = useClipboard();
  const { getApp, editApp } = useMangeAppStore();
  const { appname } = useParams();
  const [app, setApp] = useState<AuthechoApp>(getApp(appname));
  const [resources, setResources] = useState<ConnectResource[]>(app.resources);
  const [appData, setAppData] = useState<ConnectRequest>({
    app: app.name,
    appName: app.name,
    appDescription: app.description,
    origin: app.origin,
    creator: app.creator,
    admins: app.admins,
    resources: app.resources,
    status: app.status,
  });
  const [appKey, setAppKey] = useState<string>("");
  const [isKeyCopied, setIsKeyCoiped] = useState<boolean>(false);
  const appStatusOptions = Object.keys(APP_STATUS_MAP).map((key) => capitalize(key));

  useEffect(() => {
    const editedApp = {
      name: appData.appName,
      origin: appData.origin,
      creator: appData.creator || "",
      admins: appData.admins || [],
      description: appData.appDescription,
      resources: appData.resources,
      status: appData.status || "development",
      users: app.users,
    };
    editApp(editedApp);
    setApp(editedApp);
  }, [appData]);

  useEffect(() => {
    const updateDelay = setTimeout(() => {
      const updateAppData = async () => {
        await updateApp(false, appData);
      };
      updateAppData();
    }, 1000);

    return () => clearTimeout(updateDelay);
  }, [appData]);

  useEffect(() => {
    const updatedAppData: ConnectRequest = {
      ...appData,
      resources,
    };

    setAppData(updatedAppData);
  }, [resources]);

  const handleEditApp = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    const updatedAppData: ConnectRequest = {
      ...appData,
      [name]: value,
    };

    setAppData(updatedAppData);
  };

  const handleUpdatedAppStatus = (status: string): void => {
    const updatedAppData: ConnectRequest = {
      ...appData,
      status: status as AppStatus,
    };
    setAppData(updatedAppData);
  };

  const handleGenerateAppKey = async () => {
    const response = await generateAppKey(false, appData);
    if (response) {
      const key = response.data.appKey;
      key && setAppKey(key);
      setIsKeyCoiped(false);
    }
  };

  const handleCopyKey = () => {
    setIsKeyCoiped((prev) => !prev);
    copyToClipboard(appKey);
  };

  const redirectToAdminAppsPage = (): void => {
    navigate("/account/administeredapps");
  };

  const redirectToTraffic = (): void => {
    navigate(`/account/administeredapps/${appname}/traffic`);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <OutlineBtn
          btnText="Go back"
          onClick={redirectToAdminAppsPage}
          icon={<IoArrowBackOutline size={24} />}
        />
        <PrimaryBtn
          btnText="See traffic"
          onClick={redirectToTraffic}
          icon={<IoBarChartOutline size={24} />}
        />
      </div>
      <AppDetailsCard app={app} />
      <div className="flex flex-col gap-y-[40px] my-[100px] mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
        <DescriptiveInput
          labelText="Name"
          name="appName"
          value={appData.appName}
          placeholder="My app"
          maxLength={100}
          onChange={handleEditApp}>
          <p>
            Enter the name of your application.
            <span className="text-red-400"> Maximum 100 characters</span>.
          </p>
        </DescriptiveInput>
        <DescriptiveInput
          labelText="Origin"
          type="url"
          name="origin"
          value={appData.origin}
          maxLength={100}
          onChange={handleEditApp}>
          <p>
            Specify the production domain or development URL (e.g., example.com,
            http://localhost:3001).
            <span className="text-red-400">
              &nbsp;Please note that only one application is allowed per origin.
            </span>
          </p>
        </DescriptiveInput>
        <DescriptiveInput
          labelText="Description"
          type="textarea"
          name="appDescription"
          placeholder="This is my first Authecho app"
          value={appData.appDescription}
          maxLength={300}
          isRequired={false}
          onChange={handleEditApp}>
          <p>
            You may optionally provide a description for your application
            <span className="text-red-400"> of maximum 300 characters</span>. This description may
            be publicly accessible and serves to clarify the purpose and functionality of your app,
            thereby assisting users in understanding its features and benefits.
          </p>
        </DescriptiveInput>
        <div className="flex flex-col gap-y-4">
          <p className="text-cyan-200">Status</p>
          <Dropdown
            initialValue={capitalize(appData.status || "")}
            items={appStatusOptions}
            onSelect={handleUpdatedAppStatus}
          />
          <p className="text-gray-400">
            Update the status of the application to accurately reflect its operational state, such
            as whether it is currently running in the development or production environment
          </p>
        </div>
        <ResourceManager resources={resources} setResources={setResources} />
      </div>
      <Divider dividerText="Advanced settings" color="darkcyan" />
      <div className="flex flex-col items-center gap-y-8 w-full py-[40px]">
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-6">
          <PrimaryBtn
            btnText="Get new API key"
            onClick={handleGenerateAppKey}
            icon={<IoKeyOutline key={24} />}
          />
          {appKey && (
            <div className="flex flex gap-x-10 items-center w-fit">
              <SecretText text={appKey} />
              <button onClick={handleCopyKey}>{isKeyCopied ? "Copied" : "Copy"}</button>
            </div>
          )}
        </div>
        <p className="w-[90%] max-w-[600px]">
          If you have lost access to your application’s API key, you can obtain a new one here.
          Please note that this key is displayed only once for security purposes. It is strongly
          recommend that you store it in a secure location for future reference.
        </p>
      </div>
    </div>
  );
}
