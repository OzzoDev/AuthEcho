import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import { setApps } from "../store/manageAppSlice";
import { AuthechoApp } from "../types/types";
import { removeAllWhitespaces } from "../utils/utils";

const useMangeAppStore = () => {
  const dispatch = useDispatch();
  const manageAppState = useSelector((state: RootState) => state.manageApp);

  const updateApps = useCallback(
    (apps: AuthechoApp[]) => {
      dispatch(setApps(apps));
    },
    [dispatch]
  );

  const getApp = (appName: string | undefined): AuthechoApp | undefined => {
    return manageAppState.apps.find(
      (app) => removeAllWhitespaces(app.name.toLowerCase()) === appName
    );
  };

  return {
    ...manageAppState,
    updateApps,
    getApp,
  };
};

export default useMangeAppStore;
