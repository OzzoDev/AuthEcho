import React, { useState } from "react";
import useApi from "../hooks/useApi";
import useFormStore from "../hooks/useFormStore";
import useSessionStorage from "../hooks/useSessionStorage";
import { ConnectRequest } from "../types/types";
import { NAME_KEY } from "../constants/contants";

export default function ConnectAppPage() {
  const { formError } = useFormStore(true);
  const { fetchData: connectApp } = useApi("POST", "JOIN");
  const { sessionValue: name } = useSessionStorage<string>(NAME_KEY, "");
  const [connectData, setConnectData] = useState<ConnectRequest>({
    appName: "",
    origin: "http://localhost:3001",
    admin: name || "",
    appDescription: "",
  });

  const [appKey, setAppKey] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConnectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await connectApp(true, connectData);
    if (response) {
      const appKeyReceived = response.data.appKey;
      if (appKeyReceived) {
        setAppKey(appKeyReceived);
      }
    }
  };

  return (
    <div className="grow flex flex-col items-center space-y-[100px] pt-[200px] pb-[50px]">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">Connect Your App</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 w-full max-w-[600px]">
        <label className="block mb-2">
          <span className="text-gray-300">App Name</span>
          <input
            type="text"
            name="appName"
            placeholder="Enter your app name"
            value={connectData.appName}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-300">Application Origin</span>
          <input
            type="text"
            name="origin"
            id="origin"
            value={connectData.origin}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-gray-500 text-xs mt-1">
            Specify the production domain or development URL (e.g., http://localhost:3001).
          </p>
        </label>

        <label className="block mb-4">
          <span className="text-gray-300">Description</span>
          <textarea
            name="appDescription"
            placeholder="Optionally describe your app"
            value={connectData.appDescription}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            style={{ maxHeight: "200px" }}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition duration-200">
          Connect
        </button>
      </form>

      {formError && (
        <div className="mt-4">
          <p className="text-red-400 text-sm text-center">{formError}</p>
        </div>
      )}

      {appKey && (
        <div>
          <p className="text-green-600 text-sm text-center">App successfully created</p>
          <p className="text-green-600 text-sm text-center">Your api key: {appKey}</p>
        </div>
      )}
    </div>
  );
}
