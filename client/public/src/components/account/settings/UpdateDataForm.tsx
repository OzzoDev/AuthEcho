import React, { ReactNode, useEffect, useState } from "react";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { IoMdCheckmark } from "react-icons/io";
import { FiEyeOff, FiEye } from "react-icons/fi";
import DeleteBtn from "../../btn/DangerBtn";
import DangerBtn from "../../btn/DangerBtn";
import { IoTrashOutline } from "react-icons/io5";

type typeofInput = "text" | "email" | "password";

interface Props {
  type?: typeofInput;
  name: string;
  value: string;
  placeholder?: string;
  label: string;
  btnText?: string;
  isDangerous?: boolean;
  children?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void | Promise<void>;
}

export default function UpdateDataForm({
  type = "text",
  name,
  value,
  placeholder = "",
  label,
  btnText = "Update",
  isDangerous = false,
  children,
  onChange,
  onSubmit,
}: Props) {
  const [inputType, setInputType] = useState<typeofInput>(type);

  useEffect(() => {
    setInputType(type);
  }, [type]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:items-start gap-4 md:gap-y-0 w-[90%] max-w-[600px]">
      <label className="text-xl">{label}</label>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full py-2">
        <div
          className={`flex w-full border-b-[1px] border-${isDangerous ? "red-600" : "cyan-300"}`}>
          <input
            type={inputType}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            required
            onChange={onChange}
            className={`w-full border-0 outline-0 bg-transparent text-${
              isDangerous ? "red-400" : "sky-300"
            }`}
          />
          {type === "password" && (
            <button
              type="button"
              className="ml-10 mb-2"
              title={inputType === "text" ? "Hide" : "Show"}
              onClick={() =>
                inputType === "text" ? setInputType("password") : setInputType("text")
              }>
              {inputType === "text" ? (
                <FiEyeOff size={25} color="#fafffd" />
              ) : (
                <FiEye size={25} color="#fafffd" />
              )}
            </button>
          )}
        </div>
        {isDangerous ? (
          <DangerBtn btnText={btnText} type="submit" icon={<IoTrashOutline size={24} />} />
        ) : (
          <PrimaryBtn btnText={btnText} type="submit" icon={<IoMdCheckmark size={24} />} />
        )}
      </div>
      {children && <>{children}</>}
    </form>
  );
}
