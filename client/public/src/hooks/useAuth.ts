import { useEffect } from "react";
import useSessionStorage from "./useSessionStorage";
import useApi from "./useApi";
import { AUTH_KEY } from "../constants/contants";

const useAuth = (callback?: () => void) => {
  const { fetchData: verifyAuthentication } = useApi("GET", "VERIFYAUTHENTICATION");
  const { sessionValue, setSessionValue } = useSessionStorage<boolean>(AUTH_KEY, false);

  useEffect(() => {
    const authenticate = async () => {
      const response = await verifyAuthentication();

      if (response) {
        setSessionValue(true);
      } else if (callback) {
        setSessionValue(false);
        if (callback) {
          callback();
        }
      }
    };

    if (!sessionValue) {
      authenticate();
    }
  }, []);
};

export default useAuth;
