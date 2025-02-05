import { CiGlobe } from "react-icons/ci";
import { HashLoader } from "react-spinners";
import PrimaryBtn from "../btn/PrimaryBtn";
import DescriptiveInput from "../utils/DescriptiveInput";
import useApi from "../../hooks/useApi";
import useFormStore from "../../hooks/useFormStore";
import { ConnectRequest } from "../../types/types";
import React from "react";
import useAuthStore from "../../hooks/useAuthStore";

interface Props {
  connectData: ConnectRequest;
  setConnectData: (connectData: ConnectRequest) => void;
  setAppKey: (key: string) => void;
  setAppName: (appName: string) => void;
}

function ConnectForm({ connectData, setConnectData, setAppKey, setAppName }: Props) {
  const { username, isAuthenticated } = useAuthStore();
  const { formError, formStatus } = useFormStore(true);
  const { fetchData: connectApp } = useApi("POST", "JOIN");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedConnectData: ConnectRequest = {
      ...connectData,
      [name as keyof ConnectRequest]: value,
    };

    setConnectData(updatedConnectData);
  };

  const resetForm = () => {
    setConnectData({
      appName: "",
      origin: "http://localhost:3001",
      admin: username || "",
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-[90%] max-w-[600px] mb-[50px]">
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
          Specify the production domain or development URL (e.g. example.com,
          http://localhost:3001).
        </p>
      </DescriptiveInput>
      <DescriptiveInput
        labelText="Name"
        type="textarea"
        name="appDescription"
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
      {formError && <p className="text-center text-lg text-red-500 mb-[-30px]">{formError}</p>}
      <div className="mt-10">
        <PrimaryBtn btnText="Connect" type="submit" width="w-full" icon={<CiGlobe size={24} />} />
      </div>
    </form>
  );
}

export default React.memo(ConnectForm);
