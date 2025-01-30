import { useEffect } from "react";
import useAuthechoApi from "./useAuthechoApi";
import useAuthechoAuthStore from "./useAuthechoAuthStore";

const useAuthechoAuth = (callback?: () => void, validateSession?: boolean) => {
  const { callApi: auth } = useAuthechoApi("GET", "AUTHENTICATE");
  const { callApi: verifySession } = useAuthechoApi("GET", "VERIFYSESSION");
  const { isAuthenticated, updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail } =
    useAuthechoAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      const response = await auth();

      if (response) {
        updateIsAuthenticated(true);
        const username = response.data.name;
        const email = response.data.email;

        if (username) {
          updateUsername(username);
        }

        if (email) {
          updateEmail(email);
        }
      } else {
        updateIsAuthenticated(false);
        updateUsername("");
        updateEmail("");
        if (callback) {
          callback();
        }
      }
    };

    if (!isAuthenticated) {
      authenticate();
    }
  }, []);

  useEffect(() => {
    const isSessionValid = async () => {
      const response = await verifySession();
      if (!response) {
        updateIsAuthenticated(false);
        updateUsername("");
        updateEmail("");
        if (callback) {
          callback();
        }
      }
    };

    if (validateSession) {
      isSessionValid();
    }
  }, []);

  useEffect(() => {
    const verifyAdmin = async () => {
      const response = await verifySession();
      const isAdmin = response?.data.isAppAdmin;

      if (response && isAdmin) {
        updateIsAdmin(true);
      } else {
        updateIsAdmin(false);
      }
    };

    verifyAdmin();
  }, []);
};

export default useAuthechoAuth;
