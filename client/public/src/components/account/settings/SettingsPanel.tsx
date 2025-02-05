import { HashLoader } from "react-spinners";
import useAccountApi from "../../../hooks/useAccountApi";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import UpdateInput from "./UpdateDataForm";
import { useEffect, useState } from "react";
import { AccountRequest, SecretUserData } from "../../../types/types";
import UpdateDataDropDown from "./UpdateDataDropDown";
import Modal from "../../utils/Modal";
import UpdateDataForm from "./UpdateDataForm";

export default function SettingsPanel() {
  const { username, email, updateUsername, updateEmail } = useAuthStore();
  const { requestData, status, error, updateRequestData, updateError } = useAccountStore(true);
  const { callApi: fetchSecurityQuestions } = useAccountApi("GET", "SECURITYQUESTIONS");
  const { callApi: updateName } = useAccountApi("PUT", "UPDATENAME");
  //   const [secretUserData, setSecretUserData] = useState<SecretUserData>({
  //     password: "",
  //     securityQuestion: "",
  //     securityQuestionAnswer: "",
  //   });
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const [latestUpdatedValue, setLatestUpdatedValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getSecurityQuestions = async () => {
      const response = await fetchSecurityQuestions();

      if (response) {
        const questions = response.data.questions;
        setSecurityQuestions(questions || []);
      }
    };
    getSecurityQuestions();
  }, []);

  useEffect(() => {
    console.log(latestUpdatedValue);

    if (latestUpdatedValue || error) {
      setShowModal(true);
    }
  }, [latestUpdatedValue, error]);

  const closeModal = () => {
    setShowModal(false);
    setLatestUpdatedValue("");
    updateError("");
  };

  const handleUpdateUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    updateRequestData(name as keyof AccountRequest, value);
    closeModal();
    // switch (name) {
    //   case "name":
    //     updateUsername(value);
    //     updateRequestData("name", value);
    //     break;
    //   case "email":
    //     updateEmail(value);
    //     break;
    //   case "password":
    //   case "securityQuestionAnswer":
    //     const updatedSecretData = { ...secretUserData, [name]: value };
    //     setSecretUserData(updatedSecretData);
    //     break;
    // }
  };

  const handleUpdateSecurityQuestion = (question: string) => {
    updateRequestData("securityQuestion", question);
    closeModal();
  };

  const changeUsername = async () => {
    const response = await updateName(true);
    setLatestUpdatedValue("Username");
    if (response) {
      requestData.name && updateUsername(requestData.name);
      updateRequestData("name", "");
    }
  };

  const changeEmail = async () => {};

  const changePassword = async () => {};

  const changeSecurityQuestionAnswer = async () => {};

  const changeSecurityQuestion = async () => {};

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="relative w-full py-[100px]">
      <div className="flex flex-col items-center gap-y-20">
        <UpdateDataForm
          label="Update username"
          name="name"
          value={requestData.name || ""}
          placeholder={username}
          onChange={handleUpdateUserData}
          onSubmit={changeUsername}
        />
        <UpdateDataForm
          label="Update email"
          name="email"
          value={requestData.email || ""}
          placeholder={email}
          onChange={handleUpdateUserData}
          onSubmit={changeEmail}
        />
        <UpdateDataForm
          label="Update password"
          name="password"
          value={requestData.password || ""}
          onChange={handleUpdateUserData}
          onSubmit={changePassword}
        />
        <UpdateDataForm
          label="Update answser to security question"
          name="securityQuestion"
          value={requestData.securityQuestionAnswer || ""}
          onChange={handleUpdateUserData}
          onSubmit={changeSecurityQuestionAnswer}
        />
        <UpdateDataDropDown
          label="Update security question"
          items={securityQuestions}
          onSelect={handleUpdateSecurityQuestion}
          onSubmit={changeSecurityQuestion}
        />
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-green-500">{latestUpdatedValue} upated successfully</p>
          )}
        </Modal>
      )}
    </div>
  );
}
