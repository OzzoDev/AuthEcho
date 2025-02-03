import { useEffect } from "react";
import useApi from "./useApi";
import useAuthStore from "./useAuthStore";

const useAuth = (fallback?: () => void, toAccount?: () => void, toAdmin?: () => void) => {
  const { fetchData: verifyAuthentication } = useApi("GET", "VERIFYAUTHENTICATION");
  const {
    isAuthenticated,
    isAdmin,
    updateIsAuthenticated,
    updateIsAdmin,
    updateUsername,
    updateEmail,
    clearAuth,
  } = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      const response = await verifyAuthentication();

      if (response) {
        const name = response.data.name;
        const email = response.data.email;
        const isAdmin = response.data.isAdmin;

        if (name) {
          updateUsername(name);
        }

        if (email) {
          updateEmail(email);
        }

        if (isAdmin) {
          updateIsAdmin(true);
        }

        updateIsAuthenticated(true);
      } else if (fallback) {
        clearAuth();
        fallback();
      }
    };

    if (!isAuthenticated) {
      authenticate();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      toAccount && toAccount();
      if (isAdmin) {
        toAdmin && toAdmin();
      }
    }
  }, [isAuthenticated]);
};

export default useAuth;
