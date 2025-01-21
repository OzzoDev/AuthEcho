import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { resetForm, setError, setStatus, setData, setState } from "../store/formSlice";
import { ApiRequest, FetchStatus, VerifyAction } from "../types/apiTypes";
import { FormState } from "../types/types";

const useFormStore = (shouldReset?: boolean) => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);

  useEffect(() => {
    if (shouldReset) {
      dispatch(resetForm());
    }
  }, [dispatch, shouldReset]);

  const reset = () => {
    dispatch(resetForm());
  };

  const setFormStatus = (status: FetchStatus) => {
    dispatch(setStatus(status));
  };

  const setFormError = (error: string) => {
    dispatch(setError(error));
  };

  const setFormData = (
    formData: ApiRequest | ((prevData: ApiRequest) => ApiRequest),
    key?: keyof ApiRequest,
    action?: VerifyAction
  ) => {
    if (typeof formData === "function") {
      const updatedData: ApiRequest = {
        ...formState.formData,
        action: !formState.formData.action && action ? action : formState.formData.action,
      };
      dispatch(setData(formData(updatedData)));
    } else {
      const updatedData: ApiRequest = { ...formState.formData };

      if (key) {
        updatedData[key] = formData[key as keyof ApiRequest];
      } else {
        Object.assign(updatedData, formData);
      }

      dispatch(setData(updatedData));
    }
  };

  const setFormState = (formState: FormState) => {
    dispatch(setState(formState));
  };

  return {
    formError: formState.error,
    formStatus: formState.status,
    formData: formState.formData,
    formState: formState.formState,
    reset,
    setFormStatus,
    setFormError,
    setFormData,
    setFormState,
  };
};

export default useFormStore;
