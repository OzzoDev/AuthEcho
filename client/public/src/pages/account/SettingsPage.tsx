import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { HashLoader } from "react-spinners";
import UpdateDataDropDown from "../../components/account/settings/UpdateDataDropDown";
import UpdateDataForm from "../../components/account/settings/UpdateDataForm";
import Accordion from "../../components/utils/Accordion";
import Modal from "../../components/utils/Modal";
import useAccountApi from "../../hooks/useAccountApi";
import useAccountStore from "../../hooks/useAccountStore";
import useAuthStore from "../../hooks/useAuthStore";
import Divider from "../../components/utils/Divider";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { username, email, updateUsername, updateEmail, clearAuth } = useAuthStore();
  const { requestData, status, error, updateRequestData, updateError } = useAccountStore();
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
  const { callApi: deleteAccount } = useAccountApi("DELETE", "DELETEACCOUNT");
  const [securityQuestion, setSecurityQuestion] = useState<string>("");
  const [securityQuestions, setSecurityQuestions] = useState<string[]>([]);
  const [latestUpdatedValue, setLatestUpdatedValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);

  useEffect(() => {
    const getAccountOverview = async () => {
      const response = await fetchSecurityQuestion();

      if (response && response.data.securityQuestion) {
        setSecurityQuestion(response.data.securityQuestion);
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

  const handleDeleteAccount = async () => {
    const isComandValid =
      requestData.deleteCommand?.toLowerCase() === `delete ${username.toLowerCase()}`;

    if (isComandValid) {
      const response = await deleteAccount(true);

      if (response) {
        clearAuth();
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/signup");
      }
    } else {
      updateError("Please provide the right delete command");
    }
    updateRequestData({ deleteCommand: "" });
  };

  if (status === "loading") {
    return <HashLoader size={50} color="white" className="m-auto" />;
  }

  return (
    <div className="relative flex flex-col items-center w-full pb-[100px]">
      <Accordion heading="How to mange my account?">
        <p className="p-8 leading-[1.5rem]">
          Within your account settings, you possess complete control over your account. Here, you
          can update all available properties, including your username, email address, password,
          security question, and the corresponding answer. By enabling you to modify all properties,
          the likelihood of becoming locked out of your account is significantly reduced. For
          instance, should you wish to update your security question, this can be accomplished with
          just a few clicks, thereby facilitating easier recall of the credentials necessary for
          accessing your account. Furthermore, you need not feel that your Authecho account is tied
          to a specific email address, as you can easily change the email associated with your
          account. This flexibility allows you to manage access controls as desired. Additionally,
          you have the option to delete your account if you wish; however, this action is not
          recommended, as it is irreversible.
        </p>
      </Accordion>

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

      <Divider dividerText="Danger zone" />

      <section className="flex flex-col items-center w-full pt-[40px]">
        <UpdateDataForm
          label="Delete account"
          name="deleteCommand"
          value={requestData.deleteCommand || ""}
          placeholder={`delete ${username}`}
          isDangerous={true}
          btnText="Delete"
          onChange={handleUpdateUserData}
          onSubmit={handleDeleteAccount}>
          <p className="mt-4">
            Please proceed with caution. If you choose to delete your account, there will be no way
            to restore it. To delete your account, please type
            <span className="text-red-400"> delete {username}</span> and then click the delete
            button.
          </p>
        </UpdateDataForm>
      </section>

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
