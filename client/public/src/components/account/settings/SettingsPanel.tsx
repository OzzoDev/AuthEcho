import { HashLoader } from "react-spinners";
import useAccountApi from "../../../hooks/useAccountApi";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import UpdateInput from "./UpdateDataForm";
import { useState } from "react";
import { SecretUserData } from "../../../types/types";

export default function SettingsPanel() {
  const { username, email, updateUsername, updateEmail } = useAuthStore();
  const { status, responseData } = useAccountStore(true);
  const [secretUserData, setSecretUserData] = useState<SecretUserData>({
    password: "",
    securityQuestion: "",
  });

  useAccountApi("GET", "ACCOUNTOVERVIEW", true);

  const handleUpdateUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        updateUsername(value);
        break;
      case "email":
        updateEmail(value);
        break;
      case "password":
      case "securityQuestion":
        const updatedSecretData = { ...secretUserData, [name]: value };
        setSecretUserData(updatedSecretData);
        break;
    }
  };

  const changeUsername = async () => {};

  const changeEmail = async () => {};

  const changePassword = async () => {};

  const changeSecurityQuestion = async () => {};

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="w-full pt-[200px]">
      <div className="flex flex-col items-center gap-y-20">
        <UpdateInput
          label="Update username"
          name="name"
          value={username}
          onChange={handleUpdateUserData}
          onSubmit={changeUsername}
        />
        <UpdateInput
          label="Update email"
          name="email"
          value={email}
          onChange={handleUpdateUserData}
          onSubmit={changeEmail}
        />
        <UpdateInput
          label="Update password"
          name="password"
          value={secretUserData.password}
          onChange={handleUpdateUserData}
          onSubmit={changePassword}
        />
        <UpdateInput
          label="Update security question"
          name="securityQuestion"
          value={secretUserData.securityQuestion}
          onChange={handleUpdateUserData}
          onSubmit={changeSecurityQuestion}
        />
      </div>
    </div>
  );
}
