import { useEffect } from "react";
import useSessionStorage from "./useSessionStorage";
import useApi from "./useApi";
import { AUTH_KEY, EMAIL_KEY, NAME_KEY } from "../constants/contants";

const useAuth = (callback?: () => void) => {
  const { fetchData: verifyAuthentication } = useApi("GET", "VERIFYAUTHENTICATION");
  const { sessionValue: auth, setSessionValue: setAuth } = useSessionStorage<boolean>(
    AUTH_KEY,
    false
  );
  const { setSessionValue: setName } = useSessionStorage<string>(NAME_KEY, "");
  const { setSessionValue: setEmail } = useSessionStorage<string>(EMAIL_KEY, "");

  useEffect(() => {
    const authenticate = async () => {
      const response = await verifyAuthentication();

      if (response) {
        setAuth(true);
        const nameResponse = response.data.name;
        const emailResponse = response.data.email;

        if (nameResponse && emailResponse) {
          setName(nameResponse);
          setEmail(emailResponse);
        }
      } else if (callback) {
        setAuth(false);
        callback();
      }
    };

    if (!auth) {
      authenticate();
    }
  }, []);
};

export default useAuth;
