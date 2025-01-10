//@ts-ignore
import "../styles/accountPage.css";
import { useRef, useState } from "react";
import { capitalize, getData, removeAllQuotes, removeData, removeToken } from "../utils/utils";
import { USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";
import { useNavigate } from "react-router-dom";
import { FetchStatus, Password } from "../types/userTypes";
import axios from "axios";
import ReactLoading from "react-loading";
import { sendVerificationCode, updateEmail, updatePassword, updateUsername, validateEmail } from "../utils/ServerClient";
import { useDispatch } from "react-redux";
import { signout } from "../store/authSlice";

export default function AccountPage() {
  const [name, setName] = useState<string>(getData(USERNAME_KEY));
  const [email, setEmail] = useState<string>(getData(USEREMAIL_KEY));
  const [newEmail, setNewEmail] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [passwordData, setPasswordData] = useState<Password>({ newPassword: "", confirmNewPassword: "" });
  const [comparePasswords, setComparePasswords] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("123456");
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("idle");

  const [error, setError] = useState<string>("");

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    try {
      setStatus("loading");
      setError("");
      if (verifyEmail) {
        await updateEmail({ userData: email || name, email: newEmail, verificationCode }, dispatch);
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
        console.error(error);
        setStatus("error");
        setError(errorMessage);
      }
    }
  };

  const changeUsername = async () => {
    try {
      setStatus("loading");
      setError("");
      await updateUsername({ userData: email || name, name: newName }, dispatch);
      setName(newName);
      setStatus("success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        console.error(error);
        setStatus("error");
        setError(errorMessage);
      }
    }
  };

  const changePassword = async () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = "";
    }

    try {
      if (!comparePasswords) {
        setComparePasswords(true);
      } else {
        setStatus("loading");
        setError("");
        await updatePassword({ userData: email || name, newPassword: passwordData.newPassword, confirmNewPassword: passwordData.confirmNewPassword }, dispatch);
        setComparePasswords(false);
        setStatus("success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        console.error(error);
        setStatus("error");
        setError(errorMessage);
      }
    }
  };

  const logOut = () => {
    removeData(USERNAME_KEY);
    removeData(USEREMAIL_KEY);
    removeToken();
    dispatch(signout());
    navigate("/signin");
  };

  return (
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
              <p className="error">{error}</p>
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
              <div className="updateContainer">
                <label>Update Password</label>
                <div className="updateControls">
                  <input type="password" ref={passwordInputRef} placeholder={comparePasswords ? "Confirm new password" : "Enter new password"} onChange={handlePasswordChange} />
                  <button onClick={changePassword}>{comparePasswords ? "Confirm" : "Update"}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
