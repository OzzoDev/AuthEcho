//@ts-ignore
import "../styles/accountPage.css";
import { useEffect, useState } from "react";
import { capitalize, getData, removeAllQuotes, removeData, removeToken, verifyAccount } from "../utils/utils";
import { USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";
import { useNavigate } from "react-router-dom";
import { FetchStatus } from "../types/userTypes";
import axios from "axios";
import ReactLoading from "react-loading";
import { sendVerificationCode, updateEmail, updateUsername, validateEmail } from "../utils/ServerClient";

export default function AccountPage() {
  const [name, setName] = useState<string>(getData(USERNAME_KEY));
  const [email, setEmail] = useState<string>(getData(USEREMAIL_KEY));
  const [newEmail, setNewEmail] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("123456");
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");

  const [error, setError] = useState<string>("");
  const [updateError, setUpdateError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      setStatus("loading");
      await verifyAccount(setError, setStatus);
    };

    checkVerification();
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    verifyEmail ? setVerificationCode(value) : setNewEmail(value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewName(value);
  };

  const changeEmail = async () => {
    try {
      setStatus("loading");
      setUpdateError("");
      if (verifyEmail) {
        await updateEmail({ userData: email || name, email: newEmail, verificationCode });
        setEmail(newEmail);
        setVerifyEmail(false);
      } else {
        await validateEmail({ userData: email || name, newEmail: newEmail });
        await sendVerificationCode({ userData: email || name, emailBodyText: `Hello ${name}! Here is the verification code to confirm your new email:`, to: newEmail });
        setVerifyEmail(true);
      }
      setStatus("success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        console.error("Email verification failed", error);
        setStatus("error");
        setUpdateError(errorMessage);
      }
    }
  };

  const changeUsername = async () => {
    try {
      setStatus("loading");
      setUpdateError("");
      await updateUsername({ userData: email || name, name: newName });
      setName(newName);
      setStatus("success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        console.error("Email verification failed", error);
        setStatus("error");
        setUpdateError(errorMessage);
      }
    }
  };

  const logOut = () => {
    removeData(USERNAME_KEY);
    removeData(USEREMAIL_KEY);
    removeToken();
    navigate("/signin");
  };

  return (
    <>
      {error ? (
        <h1 className="error">{error}</h1>
      ) : (
        <>
          {status !== "idle" && (
            <div className="accountContainer">
              <h1>Your are signed in!</h1>
              <p>Username: {name}</p>
              <p>Email: {email}</p>
              <button onClick={logOut}>Log out</button>
              {status === "loading" ? (
                <ReactLoading type="spin" color="#00f" height={50} width={50} />
              ) : (
                <div className="updateWrapper">
                  <p className="error">{updateError}</p>
                  <div className="updateContainer">
                    <label>Update Email</label>
                    <div className="updateControls">
                      <input type="text" placeholder={verifyEmail ? "Enter verification code" : "Enter new email"} onChange={handleEmailChange} />
                      <button onClick={changeEmail}>{verifyEmail ? "Verify" : "Update"}</button>
                    </div>
                  </div>
                  <div className="updateContainer">
                    <label>Update Username</label>
                    <div className="updateControls">
                      <input type="text" placeholder="Enter new username" onChange={handleUsernameChange} />
                      <button onClick={changeUsername}>Update</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
