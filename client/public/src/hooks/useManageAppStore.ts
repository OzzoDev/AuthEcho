import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import { setApps } from "../store/manageAppSlice";
import { AuthechoApp, ConnectRequest } from "../types/types";
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

  const getApp = (appName: string | undefined): AuthechoApp => {
    const foundApp = (manageAppState.apps ?? []).find(
      (app) => removeAllWhitespaces(app.name.toLowerCase()) === removeAllWhitespaces(appName ?? "")
    );

    return foundApp || createDefaultApp();
  };

  const editApp = useCallback(
    (editedApp: ConnectRequest): void => {
      const updatedApps = manageAppState.apps.map((app) => {
        if (app.name === editedApp.appName) {
          return editedApp;
        }
        return app;
      });

      setApps(updatedApps as AuthechoApp[]);
    },
    [dispatch]
  );

  const createDefaultApp = (): AuthechoApp => {
    return {
      name: "",
      origin: "",
      creator: "",
      admins: [],
      resources: [],
      description: "",
      status: "development",
      users: 0,
    };
  };

  return {
    ...manageAppState,
    updateApps,
    getApp,
    editApp,
  };
};

export default useMangeAppStore;
