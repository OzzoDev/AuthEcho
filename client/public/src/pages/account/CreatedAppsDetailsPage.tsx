import OutlineBtn from "../../components/btn/OutlineBtn";
import { IoArrowBackOutline, IoBarChartOutline, IoKeyOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import useMangeAppStore from "../../hooks/useManageAppStore";
import { useEffect, useState } from "react";
import { AppStatus, AuthechoApp, ConnectRequest, ConnectResource } from "../../types/types";
import AdminManager from "../../components/connect/AdminManager";
import ResourceManager from "../../components/connect/ResourceManager";
import useAuthStore from "../../hooks/useAuthStore";
import AppDetailsCard from "../../components/account/app/AppDetailsCard";
import DescriptiveInput from "../../components/utils/DescriptiveInput";
import { APP_STATUS_MAP } from "../../constants/contants";
import Dropdown from "../../components/utils/Dropdown";
import { capitalize } from "../../utils/utils";
import Divider from "../../components/utils/Divider";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import SecretText from "../../components/utils/SecretText";
import UpdateDataForm from "../../components/account/settings/UpdateDataForm";

export default function CreatedAppsDetailsPage() {
  const navigate = useNavigate();
  const { getApp, editApp } = useMangeAppStore();
  const { appname } = useParams();
  const [app, setApp] = useState<AuthechoApp>(getApp(appname));
  const { username } = useAuthStore();
  const [editableAdmins, setEditableAdmins] = useState<string[]>(
    (app?.admins ?? []).filter((admin) => admin !== username)
  );

  const [resources, setResources] = useState<ConnectResource[]>(app.resources);
  const [admins, setAdmins] = useState<string[]>(editableAdmins);
  const [appData, setAppData] = useState<ConnectRequest>({
    appName: app.name,
    appDescription: app.description,
    origin: app.origin,
    admins: app.admins,
    resources: app.resources,
    status: app.status,
    users: app.users,
    deleteCommand: "",
  });
  const [newAppKey, setNewAppKey] = useState<string>("");

  const appStatusOptions = Object.keys(APP_STATUS_MAP).map((key) => capitalize(key));

  useEffect(() => {
    editApp(appData);
    setApp({
      name: appData.appName,
      origin: appData.origin,
      creator: appData.creator || "",
      admins: appData.admins || [],
      description: appData.appDescription,
      resources: appData.resources,
      status: appData.status || "development",
      users: app.users,
    });
    setEditableAdmins((app?.admins ?? []).filter((admin) => admin !== username));
  }, [appData]);

  useEffect(() => {
    return () => {
      console.log("Details page is unmounting, so send put request to updated edited app data");
    };
  }, []);

  useEffect(() => {
    const updatedAppData: ConnectRequest = {
      ...appData,
      resources,
    };

    setAppData(updatedAppData);
  }, [resources]);

  useEffect(() => {
    const updatedAppData: ConnectRequest = {
      ...appData,
      admins,
    };

    setAppData(updatedAppData);
  }, [admins]);

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

  const redirectToCreatedAppsPage = (): void => {
    navigate("/account/myapps");
  };

  const redirectToTraffic = (): void => {
    navigate(`/account/myapps/${appname}/traffic`);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <OutlineBtn
          btnText="Go back"
          onClick={redirectToCreatedAppsPage}
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
        <AdminManager admins={admins} setAdmins={setAdmins} />
      </div>
      <Divider dividerText="Advanced settings" color="darkcyan" />
      <div className="flex flex-col items-center gap-y-8 w-full py-[40px]">
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-6">
          <PrimaryBtn
            btnText="Get new API key"
            onClick={() => {}}
            icon={<IoKeyOutline key={24} />}
          />
          {newAppKey && (
            <div className="w-fit">
              <SecretText text={newAppKey} />
            </div>
          )}
        </div>
        <p className="w-[90%] max-w-[600px]">
          If you have lost access to your application’s API key, you can obtain a new one here.
          Please note that this key is displayed only once for security purposes. It is strongly
          recommend that you store it in a secure location for future reference.
        </p>
      </div>
      <Divider dividerText="Danger zone" />
      <div className="flex flex-col items-center w-full py-[40px]">
        <UpdateDataForm
          label="Delete app"
          name="deleteCommand"
          value={appData.deleteCommand || ""}
          placeholder={`delete ${appData.appName}`}
          isDangerous={true}
          btnText="Delete"
          onChange={handleEditApp}
          onSubmit={() => {}}>
          <p className="mt-4">
            Please proceed with caution. If you choose to delete an application, there will be no
            way to restore it. To delete it anyway, please type
            <span className="text-red-400"> delete {appData.appName}</span> and then click the
            delete button.
          </p>
        </UpdateDataForm>
      </div>
    </div>
  );
}
