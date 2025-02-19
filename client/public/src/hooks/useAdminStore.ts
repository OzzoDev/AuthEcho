import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useEffect } from "react";
import { AdminResponse, FetchStatus } from "../types/types";
import { reset, setError, setOverview, setStatus, setUnResolvedIssues } from "../store/adminSlice";

const useAdminStore = (shouldReset?: boolean) => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    if (shouldReset) {
      dispatch(reset());
    }
  }, [shouldReset, dispatch]);

  const updateStatus = useCallback(
    (status: FetchStatus) => {
      dispatch(setStatus(status));
    },
    [dispatch]
  );

  const updateError = useCallback(
    (error: string) => {
      dispatch(setError(error));
    },
    [dispatch]
  );

  const updateUnResolvedIssue = useCallback(
    (unResolvedIssues: number) => {
      dispatch(setUnResolvedIssues(unResolvedIssues));
    },
    [dispatch]
  );

  const updateOverview = useCallback(
    (overview: AdminResponse) => {
      dispatch(setOverview(overview));
    },
    [dispatch]
  );

  const updateOverviewProperty = useCallback(
    (key: keyof AdminResponse, value: AdminResponse[typeof key]) => {
      const updatedOverview = { ...adminState.overview, [key]: value };
      dispatch(setOverview(updatedOverview));
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    ...adminState,
    updateStatus,
    updateError,
    updateUnResolvedIssue,
    updateOverview,
    updateOverviewProperty,
    clear,
  };
};

export default useAdminStore;
