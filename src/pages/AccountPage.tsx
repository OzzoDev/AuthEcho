//@ts-ignore
import "../styles/accountPage.css";
import { useEffect, useState } from "react";
import { getData, verifyAccount } from "../utils/utils";
import { USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";

export default function AccountPage() {
  const [name, setName] = useState<string>(getData(USERNAME_KEY));
  const [email, setEmail] = useState<string>(getData(USEREMAIL_KEY));
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkVerification = async () => {
      await verifyAccount(setError);
    };

    checkVerification();
  }, []);

  return (
    <>
      {error ? (
        <h1 className="error">{error}</h1>
      ) : (
        <div>
          <h1>Your are signed in!</h1>
          <p>Username: {name}</p>
          <p>Email: {email}</p>
        </div>
      )}
    </>
  );
}
