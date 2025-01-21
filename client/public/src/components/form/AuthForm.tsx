import useFormStore from "../../hooks/useFormStore";
import { Verify } from "../../types/auth";
import { AUTH_HELPER } from "../../utils/authHelper";
import Dropdown from "./Dropdown";
import FormInput from "./FormInput";
import FormPasswordInput from "./FormPasswordInput";
import FormVerify from "./FormVerify";

interface Props {
  formUsage: "SIGNUP";
  verifyType: Verify;
  dropDownItems?: string[];
  btnTexts: string[];
  onChange: (params: React.ChangeEvent<HTMLInputElement> | string) => void;
  onRemember?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function AuthForm({
  formUsage,
  verifyType,
  dropDownItems,
  onChange,
  onRemember,
  onSubmit,
}: Props) {
  const { formError, formData, formState } = useFormStore();

  const HELPER = AUTH_HELPER[formUsage];
  const STATE = HELPER.formStates.find((state) => state.state === formState);
  const INPUTS = STATE?.inputs;
  const SUBLINE = STATE?.subline;
  const INFO = STATE?.info;
  const BTNTEXT = STATE?.btnText;
  const RENDERREMEMBERBTN = STATE?.renderRememberUser && onRemember;

  const renderInfo = INFO !== "";

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="form-headline">{SUBLINE}</h2>
        {renderInfo && <p className="form-info">{INFO}</p>}
        {STATE &&
          INPUTS?.map((formInput, index) => {
            const type = formInput.type;
            const labelText = formInput.labelText || "";
            const name = formInput.name || "";

            switch (type) {
              case "text":
                return (
                  <FormInput key={index} labelText={labelText} name={name} onChange={onChange} />
                );
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
                return <FormVerify key={index} verify={verifyType} />;
              case "select":
                return <Dropdown key={index} items={dropDownItems || []} onSelect={onChange} />;
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
        <button type="submit" className="submit-btn btn btn-primary">
          {BTNTEXT}
        </button>
      </form>
    </>
  );
}
