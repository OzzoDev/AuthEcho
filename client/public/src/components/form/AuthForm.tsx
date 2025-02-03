import useFormStore from "../../hooks/useFormStore";
import { AUTH_HELPER } from "../../utils/authHelper";
import Dropdown from "./Dropdown";
import FormInput from "./FormInput";
import FormPasswordInput from "./FormPasswordInput";
import FormVerify from "./FormVerify";
import Stepper from "../utils/Stepper";
import { useEffect, useState } from "react";
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
  const { formData, formError, formStatus, formState, setFormData } = useFormStore();
  const [lastestStep, setLastestStep] = useState<number>(0);

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
  const availableSteps = STATES.filter((state) => !state?.excludeStep);
  const maxSteps = STATES.length - excludedSteps;
  const currentStep = availableSteps.indexOf(STATE);

  useEffect(() => {
    if (currentStep !== -1) {
      setLastestStep(currentStep);
    }
  }, [currentStep]);

  const handleRemeberUser = () => {
    setFormData({ rememberUser: !formData.rememberUser }, "rememberUser");
  };

  if (formStatus === "loading") {
    return <HashLoader size={50} color="white" />;
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-12 p-10 rounded-[20px] w-[90%] max-w-[560px] bg-slate-700 shadow-[0_0px_30px_rgb(255,255,255,0.5)]">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-8">{HEADLINE}</h2>
        {SUBLINE && <p className="text-lg">{SUBLINE}</p>}
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
        {RENDERREMEMBERBTN && (
          <ToggleBtn
            btnText="Remember me"
            fontSize="lg"
            onClick={handleRemeberUser}
            selected={formData.rememberUser}
          />
        )}
        {BTNTEXT && <PrimaryBtn btnText={BTNTEXT} type="submit" width="w-full" />}
      </form>
      <Stepper steps={maxSteps} selectedIndex={lastestStep} />
    </>
  );
}
