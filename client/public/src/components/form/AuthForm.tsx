import { ApiRequest, FetchStatus } from "../../types/apiTypes";
import { Verify } from "../../types/auth";
import { FormState } from "../../types/types";
import { AUTH_HELPER } from "../../utils/authHelper";
import Navbar from "../Navbar";
import Stepper from "../Stepper";
import Dropdown from "./Dropdown";
import FormInput from "./FormInput";
import FormPasswordInput from "./FormPasswordInput";
import FormVerify from "./FormVerify";

interface Props {
  formUsage: "SIGNUP";
  formState: FormState;
  formData: ApiRequest;
  verifyType: Verify;
  dropDownItems?: string[];
  btnTexts: string[];
  error: string;
  steps: number;
  currentStep: number;
  setStatus: (status: FetchStatus) => void;
  setError: (error: string) => void;
  setFormState: (formState: FormState) => void;
  setFormData?: (formData: ApiRequest) => void;
  onChange: (params: React.ChangeEvent<HTMLInputElement> | string) => void;
  onRemember?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function AuthForm({
  formUsage,
  formState,
  formData,
  verifyType,
  dropDownItems,
  btnTexts,
  error,
  steps,
  currentStep,
  setStatus,
  setError,
  setFormState,
  setFormData,
  onChange,
  onRemember,
  onSubmit,
}: Props) {
  const HELPER = AUTH_HELPER[formUsage];
  const HEADLINE = HELPER.headline;
  const STATE = HELPER.formStates.find((state) => state.state === formState);
  const INPUTS = STATE?.inputs;
  const SUBLINE = STATE?.subline;
  const INFO = STATE?.info;
  const btnText = btnTexts[currentStep];

  const renderInfo = INFO !== "";
  const renderRemberBtn = onRemember && currentStep == steps;

  return (
    <>
      <Navbar />
      <h1 className="page-headline">{HEADLINE}</h1>
      <form onSubmit={onSubmit}>
        <h2 className="form-headline">{SUBLINE}</h2>
        {renderInfo && <p className="form-info">{INFO}</p>}
        {STATE &&
          INPUTS?.map((formInput) => {
            const type = formInput.type;
            const labelText = formInput.labelText || "";
            const name = formInput.name || "";

            switch (type) {
              case "text":
                return <FormInput labelText={labelText} name={name} onChange={onChange} />;
              case "password":
                return <FormPasswordInput labelText={labelText} name={name} onChange={onChange} />;
              case "code":
                return (
                  <FormVerify
                    formData={formData}
                    verify={verifyType}
                    setStatus={setStatus}
                    setError={setError}
                    setFormState={setFormState}
                    setFormData={setFormData}
                  />
                );
              case "select":
                return <Dropdown items={dropDownItems || []} onSelect={onChange} />;
            }
          })}
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
        {renderRemberBtn && (
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
        <button type="submit" className="submit-btn btn btn-primary">
          {btnText}
        </button>
      </form>
      <Stepper steps={steps} selectedIndex={currentStep} />
    </>
  );
}
