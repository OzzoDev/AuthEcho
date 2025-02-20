import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setIsAdmin,
  setUsername,
  setEmail,
  clearAuthState,
  setHasReviewed,
} from "../store/authSlice";
import { RootState } from "../store/store";

const useAuthStore = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state: RootState) => state.auth);

  const updateIsAuthenticated = useCallback(
    (isAuthenticated: boolean) => {
      dispatch(setIsAuthenticated(isAuthenticated));
    },
    [dispatch]
  );

  const updateIsAdmin = useCallback(
    (isAdmin: boolean) => {
      dispatch(setIsAdmin(isAdmin));
    },
    [dispatch]
  );

  const updateUsername = useCallback(
    (username: string) => {
      dispatch(setUsername(username));
    },
    [dispatch]
  );

  const updateEmail = useCallback(
    (email: string) => {
      dispatch(setEmail(email));
    },
    [dispatch]
  );

  const updateHasReviewed = useCallback(
    (hasReviewed: boolean) => {
      dispatch(setHasReviewed(hasReviewed));
    },
    [dispatch]
  );

  const clearAuth = useCallback(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  return {
    ...authState,
    updateIsAuthenticated,
    updateIsAdmin,
    updateUsername,
    updateEmail,
    updateHasReviewed,
    clearAuth,
  };
};

export default useAuthStore;
