//@ts-ignore
import "../styles/accountPage.css";
import { useEffect, useState } from "react";
import { getData, removeData, removeToken, verifyAccount } from "../utils/utils";
import { USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const [name, setName] = useState<string>(getData(USERNAME_KEY));
  const [email, setEmail] = useState<string>(getData(USEREMAIL_KEY));
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      await verifyAccount(setError);
    };

    checkVerification();
  }, []);

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
        <div className="accountContainer">
          <h1>Your are signed in!</h1>
          <p>Username: {name}</p>
          <p>Email: {email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      )}
    </>
  );
}
