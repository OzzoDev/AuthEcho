//@ts-ignore
import "../styles/accountPage.css";
import { useRef, useState } from "react";
import { getData, removeData } from "../utils/utils";
import { AUTH_KEY, USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";
import { useNavigate } from "react-router-dom";
import { Password } from "../types/userTypes";
import ReactLoading from "react-loading";
import {
  sendVerificationCode,
  updateEmail,
  updatePassword,
  updateUsername,
  validateEmail,
} from "../utils/ServerClient";
import Navbar from "../components/Navbar";
import { FetchStatus } from "../types/apiTypes";
import useSessionStorage from "../hooks/useSessionStorage";

export default function AccountPage() {
  const [name, setName] = useState<string>(getData(USERNAME_KEY));
  const [email, setEmail] = useState<string>(getData(USEREMAIL_KEY));
  const [newEmail, setNewEmail] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [passwordData, setPasswordData] = useState<Password>({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [comparePasswords, setComparePasswords] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("123456");
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string>("");
  const { removeSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    verifyEmail ? setVerificationCode(value) : setNewEmail(value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewName(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (comparePasswords) {
      setPasswordData((prevData) => ({ ...prevData, ["confirmNewPassword"]: value }));
    } else {
      setPasswordData((prevData) => ({ ...prevData, ["newPassword"]: value }));
    }
  };

  const changeEmail = async () => {
    if (verifyEmail) {
      const updateEmailResponse = await updateEmail(
        { userData: email || name, email: newEmail, verificationCode },
        setStatus,
        setError
      );
      if (updateEmailResponse) {
        setEmail(newEmail);
        setVerifyEmail(false);
      }
    } else {
      const validateEmailResponse = await validateEmail(
        { userData: email || name, email: newEmail },
        setStatus,
        setError
      );
      if (validateEmailResponse) {
        const verficationCodeResponse = await sendVerificationCode(
          { userData: email || name, action: "verifyEmail" },
          setStatus,
          setError
        );
        if (verficationCodeResponse) {
          setVerifyEmail(true);
        }
      }
    }
  };

  const changeUsername = async () => {
    const updateUsernameResponse = await updateUsername(
      { userData: email || name, name: newName },
      setStatus,
      setError
    );
    if (updateUsernameResponse) {
      setName(newName);
    }
  };

  const changePassword = async () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = "";
    }

    if (!comparePasswords) {
      setComparePasswords(true);
    } else {
      const updatePasswordResponse = await updatePassword(
        {
          userData: email || name,
          password: passwordData.newPassword,
          confirmPassword: passwordData.confirmNewPassword,
        },
        setStatus,
        setError
      );
      if (updatePasswordResponse) {
        setComparePasswords(false);
      }
    }
  };

  const logOut = () => {
    removeData(USERNAME_KEY);
    removeData(USEREMAIL_KEY);
    removeSessionValue();
    navigate("/signin");
  };

  return (
    <div className="accountContainer">
      <h1>Your are signed in!</h1>
      <p>Username: {name}</p>
      <p>Email: {email}</p>
      <button onClick={logOut}>Log out</button>
      {status === "loading" ? (
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
      ) : (
        <>
          <Navbar />
          <div className="updateWrapper">
            <p className="error">{error}</p>
            <div className="updateContainer">
              <label>Update Email</label>
              <div className="updateControls">
                <input
                  type="text"
                  placeholder={verifyEmail ? "Enter verification code" : "Enter new email"}
                  onChange={handleEmailChange}
                />
                <button onClick={changeEmail}>{verifyEmail ? "Verify" : "Update"}</button>
              </div>
            </div>
            <div className="updateContainer">
              <label>Update Username</label>
              <div className="updateControls">
                <input
                  type="text"
                  placeholder="Enter new username"
                  onChange={handleUsernameChange}
                />
                <button onClick={changeUsername}>Update</button>
              </div>
            </div>
            <div className="updateContainer">
              <label>Update Password</label>
              <div className="updateControls">
                <input
                  type="password"
                  ref={passwordInputRef}
                  placeholder={comparePasswords ? "Confirm new password" : "Enter new password"}
                  onChange={handlePasswordChange}
                />
                <button onClick={changePassword}>{comparePasswords ? "Confirm" : "Update"}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
