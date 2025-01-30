import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setStatus,
  setError,
  setSignInState,
  setRequestData,
  setQuestion,
} from "../../store/authechoApiSlice";
import { RootState } from "../../store/store";
import { Status, SignInState, AuthehcoRequest } from "../../types/types";

const useAuthechoApiStore = (shouldReset?: boolean) => {
  const dispatch = useDispatch();
  const authechoApiState = useSelector((state: RootState) => state.authecho);

  useEffect(() => {
    if (shouldReset) {
      dispatch(reset());
    }
  }, [dispatch, shouldReset]);

  const clear = () => {
    dispatch(reset());
  };

  const updateStatus = (status: Status) => {
    dispatch(setStatus(status));
  };

  const updateError = (error: string) => {
    dispatch(setError(error));
  };

  const updateSignInState = (state: SignInState) => {
    dispatch(setSignInState(state));
  };

  const updateRequestData = (
    requestData: AuthehcoRequest | ((prevData: AuthehcoRequest) => AuthehcoRequest),
    key?: keyof AuthehcoRequest
  ) => {
    if (typeof requestData === "function") {
      dispatch(setRequestData(requestData(authechoApiState.requestData)));
    } else {
      const updatedRequstData = { ...authechoApiState.requestData };

      if (key) {
        updatedRequstData[key] = requestData[key as keyof AuthehcoRequest];
      } else {
        Object.assign(updatedRequstData, requestData);
      }

      dispatch(setRequestData(updatedRequstData));
    }
  };

  const updateQuestion = (state: string) => {
    dispatch(setQuestion(state));
  };

  return {
    status: authechoApiState.status,
    error: authechoApiState.error,
    signInState: authechoApiState.signInState,
    requestData: authechoApiState.requestData,
    question: authechoApiState.question,
    clear,
    updateStatus,
    updateError,
    updateSignInState,
    updateRequestData,
    updateQuestion,
  };
};

export default useAuthechoApiStore;
