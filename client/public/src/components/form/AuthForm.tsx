import ReactLoading from "react-loading";
import useFormStore from "../../hooks/useFormStore";
import { AUTH_HELPER } from "../../utils/authHelper";
import Dropdown from "./Dropdown";
import FormInput from "./FormInput";
import FormPasswordInput from "./FormPasswordInput";
import FormVerify from "./FormVerify";
import Stepper from "../Stepper";
import { useEffect, useState } from "react";
import { FormUsage } from "../../types/types";

interface Props {
  formUsage: FormUsage;
  dropDownItems?: string[];
  dynamicText?: string;
  onChange: (params: React.ChangeEvent<HTMLInputElement> | string) => void;
  onRemember?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function AuthForm({
  formUsage,
  dropDownItems,
  dynamicText,
  onChange,
  onRemember,
  onSubmit,
}: Props) {
  const { formError, formStatus, formData, formState } = useFormStore();
  const [lastestStep, setLastestStep] = useState<number>(0);

  const HELPER = AUTH_HELPER[formUsage];
  const STATES = HELPER.formStates;
  const STATE = STATES.find((state) => state?.state === formState);
  const INPUTS = STATE?.inputs;
  const HEADLINE = STATE?.headline;
  const SUBLINE = STATE?.subline;
  const DYNAMICLINE = STATE?.dynamicLine;
  const BTNTEXT = STATE?.btnText;
  const RENDERREMEMBERBTN = STATE?.renderRememberUser && onRemember;

  const excludedSteps = STATES.filter((state) => state?.excludeStep).length;
  const availableSteps = STATES.filter((state) => !state?.excludeStep);
  const maxSteps = STATES.length - excludedSteps;
  const currentStep = availableSteps.indexOf(STATE);

  useEffect(() => {
    if (currentStep !== -1) {
      setLastestStep(currentStep);
    }
  }, [currentStep]);

  return (
    <>
      {formStatus === "loading" ? (
        <ReactLoading type="spin" color="#00f" height={50} width={50} />
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <h2 className="form-headline">{HEADLINE}</h2>
            {SUBLINE && <p className="form-subline">{SUBLINE}</p>}
            {DYNAMICLINE && <p className="form-subline form-dynamicText">{dynamicText}</p>}
            {STATE &&
              INPUTS?.map((formInput, index) => {
                const type = formInput.type;
                const labelText = formInput.labelText || "";
                const name = formInput.name || "";

                if (!type) {
                  return (
                    <FormInput key={index} labelText={labelText} name={name} onChange={onChange} />
                  );
                } else {
                  switch (type) {
                    case "password":
                      return (
                        <FormPasswordInput
                          key={index}
                          labelText={labelText}
                          name={name}
                          onChange={onChange}
                        />
                      );
                    case "code":
                      return <FormVerify key={index} formUsage={formUsage} />;
                    case "select":
                      return (
                        <Dropdown key={index} items={dropDownItems || []} onSelect={onChange} />
                      );
                  }
                }
              })}
            <div className="error-container">
              <p className="error-message">{formError}</p>
            </div>
            {RENDERREMEMBERBTN && (
              <button
                type="button"
                onClick={onRemember}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).blur()}
                className={
                  formData.rememberUser
                    ? `remeber-btn btn btn-check btn-check-selected`
                    : `remeber-btn btn btn-check`
                }>
                Remember me
              </button>
            )}
            {BTNTEXT && (
              <button type="submit" className="submit-btn btn btn-primary">
                {BTNTEXT}
              </button>
            )}
          </form>
          <Stepper steps={maxSteps} selectedIndex={lastestStep} />
        </>
      )}
    </>
  );
}
