import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import {
  resetForm,
  setError,
  setStatus,
  setData,
  setState,
  setCurrentStep,
} from "../store/formSlice";
import { ApiRequest, FetchStatus, FormState, VerifyAction } from "../types/types";
import { ENDPOINTS } from "../constants/ApiEndpoints";

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

  const setFormStep = (currentStep: number) => {
    dispatch(setCurrentStep(currentStep));
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
    action?: VerifyAction,
    useCase?: keyof typeof ENDPOINTS
  ) => {
    if (typeof formData === "function") {
      const updatedData: ApiRequest = {
        ...formState.formData,
        action: !formState.formData.action && action ? action : formState.formData.action,
        useCase: !formState.formData.useCase && useCase ? useCase : formState.formData.useCase,
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
    formStep: formState.currentStep,
    reset,
    setFormStep,
    setFormStatus,
    setFormError,
    setFormData,
    setFormState,
  };
};

export default useFormStore;
