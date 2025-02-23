import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import UpdateDataDropDown from "../../components/account/settings/UpdateDataDropDown";
import UpdateDataForm from "../../components/account/settings/UpdateDataForm";
import Modal from "../../components/utils/Modal";
import useAccountApi from "../../hooks/useAccountApi";
import useAccountStore from "../../hooks/useAccountStore";
import useAuthStore from "../../hooks/useAuthStore";
import { FetchStatus } from "../../types/types";

export default function SettingsPage() {
  const { username, email, updateUsername, updateEmail } = useAuthStore();
  const { requestData, error, updateRequestData, updateError } = useAccountStore();
  const { callApi: fetchSecurityQuestions } = useAccountApi("GET", "SECURITYQUESTIONS");
  const { callApi: fetchSecurityQuestion } = useAccountApi("GET", "ACCOUNTOVERVIEW");
  const { callApi: requestEmailCode } = useAccountApi("POST", "REQUESTEMAILCODE");
  const { callApi: renewName } = useAccountApi("PUT", "UPDATENAME");
  const { callApi: renewEmail } = useAccountApi("PUT", "UPDATEEMAIL");
  const { callApi: renewPassword } = useAccountApi("PUT", "UPDATEPASSWORD");
  const { callApi: renewSecurityquestionAnswer } = useAccountApi(
    "PUT",
    "UPDATESECURITYQUESTIONANSWER"
  );
  const { callApi: renewSecurityQuestion } = useAccountApi("PUT", "UPDATESECURITYQUESTION");
  const [securityQuestion, setSecurityQuestion] = useState<string>("");
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const [latestUpdatedValue, setLatestUpdatedValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    const getAccountOverview = async () => {
      setApiStatus("loading");

      const response = await fetchSecurityQuestion();

      if (response && response.data.securityQuestion) {
        setSecurityQuestion(response.data.securityQuestion);
        setApiStatus("success");
      } else {
        setApiStatus("error");
      }
    };
    getAccountOverview();
  }, [requestData.securityQuestion]);

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

  const changePassword = async () => {
    const response = await renewPassword(true);
    setLatestUpdatedValue("Password");
    if (response) {
      updateRequestData({ password: "" });
    }
  };

  const changeSecurityQuestionAnswer = async () => {
    const response = await renewSecurityquestionAnswer(true);
    setLatestUpdatedValue("Answer to security question");
    if (response) {
      updateRequestData({ securityQuestionAnswer: "" });
    }
  };

  const changeSecurityQuestion = async () => {
    const response = await renewSecurityQuestion(true);
    setLatestUpdatedValue("Security question");
    if (response) {
      updateRequestData({ securityQuestion: "" });
    }
  };

  if (apiStatus === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="relative flex flex-col items-center w-full pb-[100px]">
      <div className="flex flex-col items-center gap-y-20 mt-[100px] mb-[80px] w-full">
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
            onSubmit={getEmailCode}></UpdateDataForm>
        )}
        <UpdateDataForm
          type="password"
          label="Update password"
          name="password"
          value={requestData.password || ""}
          onChange={handleUpdateUserData}
          onSubmit={changePassword}
        />
        <UpdateDataForm
          type="password"
          label="Update answser to security question"
          name="securityQuestionAnswer"
          value={requestData.securityQuestionAnswer || ""}
          onChange={handleUpdateUserData}
          onSubmit={changeSecurityQuestionAnswer}
        />
        <UpdateDataDropDown
          label="Update security question"
          items={securityQuestions}
          initialValue={securityQuestion}
          onSelect={handleUpdateSecurityQuestion}
          onSubmit={changeSecurityQuestion}
        />
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-green-500">
              {latestUpdatedValue} upated successfully
              {latestUpdatedValue === "Security question" && (
                <span className="text-green-300">
                  &nbsp; Please remember to update the answer to your security question if you have
                  not already done so.
                </span>
              )}
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}
