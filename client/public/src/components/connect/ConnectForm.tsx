import { CiGlobe } from "react-icons/ci";
import { HashLoader } from "react-spinners";
import PrimaryBtn from "../btn/PrimaryBtn";
import DescriptiveInput from "../utils/DescriptiveInput";
import useApi from "../../hooks/useApi";
import useFormStore from "../../hooks/useFormStore";
import { ConnectRequest, ConnectResource } from "../../types/types";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import ResourceManager from "./ResourceManager";
import AdminManager from "./AdminManager";

interface Props {
  connectData: ConnectRequest;
  setConnectData: (connectData: ConnectRequest) => void;
  setAppKey: (key: string) => void;
  setAppName: (appName: string) => void;
}

function ConnectForm({ connectData, setConnectData, setAppKey, setAppName }: Props) {
  const { isAuthenticated } = useAuthStore();
  const { formError, formStatus } = useFormStore(true);
  const { fetchData: connectApp } = useApi("POST", "JOIN");
  const [resources, setResources] = useState<ConnectResource[]>([]);
  const [admins, setAdmins] = useState<string[]>([]);

  useEffect(() => {
    const updatedConnectData: ConnectRequest = {
      ...connectData,
      resources,
    };

    setConnectData(updatedConnectData);
  }, [resources]);

  useEffect(() => {
    const updatedConnectData: ConnectRequest = {
      ...connectData,
      admins,
    };

    setConnectData(updatedConnectData);
  }, [admins]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedConnectData: ConnectRequest = {
      ...connectData,
      [name]: value,
    };

    setConnectData(updatedConnectData);
  };

  const resetForm = () => {
    setConnectData({
      appName: "",
      origin: "http://localhost:3001",
      admins: [],
      resources: [],
      appDescription: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await connectApp(true, connectData);

    if (response) {
      const appKeyReceived = response.data.appKey;
      const appNameReceived = response.data.appName;
      if (appKeyReceived) {
        setAppKey(appKeyReceived);
      }

      if (appNameReceived) {
        setAppName(appNameReceived);
      }

      resetForm();
    }
  };

  if (!isAuthenticated) {
    return <h2 className="text-4xl text-red-400 my-[200px]">Sign in to connect your app!</h2>;
  }

  if (formStatus === "loading") {
    return <HashLoader size={50} color="white" className="my-[200px]" />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-[90%] max-w-[800px] mb-[50px]">
      <DescriptiveInput
        labelText="Name"
        name="appName"
        value={connectData.appName}
        placeholder="My app"
        maxLength={100}
        onChange={handleChange}>
        <p>
          Enter the name of your application.
          <span className="text-red-400"> Maximum 100 characters</span>.
        </p>
      </DescriptiveInput>
      <DescriptiveInput
        labelText="Origin"
        type="url"
        name="origin"
        value={connectData.origin}
        maxLength={100}
        onChange={handleChange}>
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
        value={connectData.appDescription}
        maxLength={300}
        isRequired={false}
        onChange={handleChange}>
        <p>
          You may optionally provide a description for your application
          <span className="text-red-400"> of maximum 300 characters</span>. This description may be
          publicly accessible and serves to clarify the purpose and functionality of your app,
          thereby assisting users in understanding its features and benefits.
        </p>
      </DescriptiveInput>
      <ResourceManager resources={resources} setResources={setResources} />
      <AdminManager admins={admins} setAdmins={setAdmins} />
      {formError && <p className="text-center text-lg mb-[-30px] bg-rose-700">{formError}</p>}
      <div className="mt-10">
        <PrimaryBtn btnText="Connect" type="submit" width="w-full" icon={<CiGlobe size={24} />} />
      </div>
    </form>
  );
}

export default React.memo(ConnectForm);
