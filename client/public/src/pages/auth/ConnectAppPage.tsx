import React, { useRef, useState } from "react";
import useApi from "../../hooks/useApi";
import useFormStore from "../../hooks/useFormStore";
import { ConnectRequest } from "../../types/types";
import useAuthStore from "../../hooks/useAuthStore";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { CiGlobe } from "react-icons/ci";
import { HashLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function ConnectAppPage() {
  const { formError, formStatus } = useFormStore(true);
  const { fetchData: connectApp } = useApi("POST", "JOIN");
  const { username } = useAuthStore();
  const [connectData, setConnectData] = useState<ConnectRequest>({
    appName: "",
    origin: "http://localhost:3001",
    admin: username || "",
    appDescription: "",
  });

  const [appKey, setAppKey] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useOutsideClick(modalRef, closeModal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConnectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await connectApp(true, connectData);
    console.log("Response", response);

    if (response) {
      const appKeyReceived = response.data.appKey;
      setIsModalVisible(true);
      if (appKeyReceived) {
        setAppKey(appKeyReceived);
      }
    }
  };

  if (isModalVisible) {
    return (
      <div
        ref={modalRef}
        className="flex flex-col relative gap-6 m-auto bg-gray-800 p-8 pt-12 rounded-lg">
        <button onClick={closeModal} className="absolute top-4 right-4">
          <IoMdClose size={28} color="red" />
        </button>
        <h2 className="text-xl">
          App <span className="text-gray-400">{connectData.appName}</span> connected successfully
        </h2>
        <p className="text-green-500">Your API key: {appKey}</p>
        <p className="text-gray-400">This key is visible for one time only for your security</p>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col items-center space-y-[100px] pt-[100px] pb-[50px] text-white">
      <h1 className="text-4xl text-center max-w-[90%] text-sky-200">
        Connect your app to Authecho!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-[90%] max-w-[600px]">
        {formStatus === "loading" ? (
          <HashLoader size={50} color="white" />
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              <label className="text-cyan-200">Name</label>
              <input
                type="text"
                name="appName"
                placeholder="My app"
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                required
                className="p-2 rounded-md bg-transparent border-[1px] border-white outline-none"
              />
              <p className="text-gray-400">Enter the name of your application</p>
            </div>
            <div className="flex flex-col space-y-4">
              <label className="text-cyan-200">Origin</label>
              <input
                type="url"
                name="origin"
                value={connectData.origin}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                required
                className="p-2 rounded-md bg-transparent border-[1px] border-white outline-none"
              />
              <p className="text-gray-400">
                Specify the production domain or development URL (e.g., http://localhost:3001 or
                example.com).
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <label className="text-cyan-200">Description</label>
              <textarea
                name="appDescription"
                onChange={handleChange}
                maxLength={300}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className="p-2 min-h-[7.5rem] max-h-[7.5rem] rounded-md bg-transparent border-[1px] border-white outline-none resize-none"
              />
              <p className="text-gray-400">
                You may optionally provide a description for your application{" "}
                <span className="text-red-400">of maxium 300 characters</span>. This description may
                be publicly accessible and serves to clarify the purpose and functionality of your
                app, thereby assisting users in understanding its features and benefits.
              </p>
            </div>
            <div className="mt-10">
              <PrimaryBtn
                btnText="Connect"
                type="submit"
                width="w-full"
                icon={<CiGlobe size={24} />}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
