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

  const getApp = (appName: string | undefined): AuthechoApp => {
    if (!appName) {
      return createDefaultApp();
    }

    const foundApp = manageAppState.apps.find((app) => {
      return removeAllWhitespaces(app.name.toLowerCase()) === removeAllWhitespaces(appName ?? "");
    });

    return foundApp || createDefaultApp();
  };

  const editApp = useCallback(
    (editedApp: AuthechoApp): void => {
      const updatedApps = manageAppState.apps.map((app) => {
        if (app.name === editedApp.name) {
          return editedApp;
        }
        return app;
      });

      dispatch(setApps(updatedApps as AuthechoApp[]));
    },
    [dispatch]
  );

  const removeApp = useCallback(
    (appName: string): void => {
      const filteredApps = manageAppState.apps.filter((app) => app.name !== appName);
      dispatch(setApps(filteredApps));
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
    removeApp,
  };
};

export default useMangeAppStore;
