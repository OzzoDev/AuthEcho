import useFormStore from "../../hooks/useFormStore";
import { AUTH_HELPER } from "../../utils/authHelper";
import Dropdown from "./Dropdown";
import FormInput from "./FormInput";
import FormPasswordInput from "./FormPasswordInput";
import FormVerify from "./FormVerify";
import Stepper from "../utils/Stepper";
import { FormUsage } from "../../types/types";
import PrimaryBtn from "../btn/PrimaryBtn";
import ToggleBtn from "../btn/ToggleBtn";
import { HashLoader } from "react-spinners";

interface Props {
  formUsage: FormUsage;
  dropDownItems?: string[];
  dynamicText?: string;
  onChange: (params: React.ChangeEvent<HTMLInputElement> | string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function AuthForm({
  formUsage,
  dropDownItems,
  dynamicText,
  onChange,
  onSubmit,
}: Props) {
  const { formData, formError, formStatus, formState, formStep, setFormData } = useFormStore();

  const HELPER = AUTH_HELPER[formUsage];
  const STATES = HELPER.formStates;
  const STATE = STATES.find((state) => state?.state === formState);
  const INPUTS = STATE?.inputs;
  const HEADLINE = STATE?.headline;
  const SUBLINE = STATE?.subline;
  const DYNAMICLINE = STATE?.dynamicLine;
  const BTNTEXT = STATE?.btnText;
  const RENDERREMEMBERBTN = STATE?.renderRememberUser;

  const excludedSteps = STATES.filter((state) => state?.excludeStep).length;
  const maxSteps = STATES.length - excludedSteps;

  const isFinalStep = formStep === maxSteps;

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
  };

  if (formStatus === "loading") {
    return <HashLoader size={50} color="white" />;
  }

  const subline =
    formState === "resendCode" ? (
      <p>
        To verify your identity, please respond to your security question,
        <span className="text-red-500"> as the verification code provided was incorrect. </span>
        Enter the answer to your security question below to proceed.
      </p>
    ) : SUBLINE ? (
      <p className="text-lg">{SUBLINE}</p>
    ) : null;

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-12 p-10 rounded-[20px] w-[90%] max-w-[560px] bg-slate-700 shadow-[0_0px_30px_rgb(255,255,255,0.5)]">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-8">{HEADLINE}</h2>
        {subline}
        {DYNAMICLINE && <p className="font-semibold">{dynamicText}</p>}
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
                case "email":
                  return (
                    <FormInput
                      key={index}
                      labelText={labelText}
                      name={name}
                      type="email"
                      onChange={onChange}
                    />
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
                  return <FormVerify key={index} formUsage={formUsage} />;
                case "select":
                  return <Dropdown key={index} items={dropDownItems || []} onSelect={onChange} />;
              }
            }
          })}
        <div className="flex justify-center items-center w-full h-[60px] my-[-30px]">
          <p className="font-semibold text-xl text-center text-red-500">{formError}</p>
        </div>
        {RENDERREMEMBERBTN && isFinalStep && (
          <div className="mt-[-20px] mb-[-30px]">
            <ToggleBtn
              btnText="Remember me"
              fontSize="lg"
              onClick={handleRemeberUser}
              selected={formData.rememberUser}
            />
          </div>
        )}
        {BTNTEXT && <PrimaryBtn btnText={BTNTEXT} type="submit" width="w-full" />}
      </form>
      <Stepper steps={maxSteps} selectedIndex={formStep - 1} />
    </>
  );
}
