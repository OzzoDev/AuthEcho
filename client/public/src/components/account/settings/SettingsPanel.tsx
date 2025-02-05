import { HashLoader } from "react-spinners";
import useAccountApi from "../../../hooks/useAccountApi";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import { useEffect, useState } from "react";
import UpdateDataDropDown from "./UpdateDataDropDown";
import Modal from "../../utils/Modal";
import UpdateDataForm from "./UpdateDataForm";

export default function SettingsPanel() {
  const { username, email, updateUsername, updateEmail } = useAuthStore();
  const { requestData, status, error, updateRequestData, updateError } = useAccountStore();
  const { callApi: fetchSecurityQuestions } = useAccountApi("GET", "SECURITYQUESTIONS");
  const { callApi: requestEmailCode } = useAccountApi("POST", "REQUESTEMAILCODE");
  const { callApi: renewName } = useAccountApi("PUT", "UPDATENAME");
  const { callApi: renewEmail } = useAccountApi("PUT", "UPDATEEMAIL");
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const [latestUpdatedValue, setLatestUpdatedValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);

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
    updateRequestData({ [name]: value });
    closeModal();
  };

  const handleUpdateSecurityQuestion = (question: string) => {
    updateRequestData({ securityQuestion: question });
    closeModal();
  };

  const changeUsername = async () => {
    const response = await renewName(true);
    setLatestUpdatedValue("Username");
    if (response) {
      requestData.name && updateUsername(requestData.name);
      updateRequestData({ name: "" });
    }
  };

  const getEmailCode = async () => {
    const response = await requestEmailCode(true);
    if (response) {
      setVerifyEmail(true);
    }
  };

  const changeEmail = async () => {
    const response = await renewEmail(true);
    setLatestUpdatedValue("Email");
    if (response) {
      requestData.email && updateEmail(requestData.email);
      updateRequestData({ email: "", verificationCode: "" });
      setVerifyEmail(false);
    }
  };

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

        {verifyEmail ? (
          <UpdateDataForm
            type="password"
            label="Verify email"
            name="verificationCode"
            value={requestData.verificationCode || ""}
            btnText="Verify"
            onChange={handleUpdateUserData}
            onSubmit={changeEmail}>
            <p className="text-gray-300">
              Please check the inbox of your new email address, {requestData.email}, for a
              verification code.
            </p>
          </UpdateDataForm>
        ) : (
          <UpdateDataForm
            type="email"
            label="Update email"
            name="email"
            value={requestData.email || ""}
            placeholder={email}
            onChange={handleUpdateUserData}
            onSubmit={getEmailCode}>
            <p>
              {Object.values(requestData).map((obj) => (
                <p>{obj}</p>
              ))}
            </p>
          </UpdateDataForm>
        )}
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
