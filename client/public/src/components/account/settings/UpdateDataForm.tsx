import React, { ReactNode } from "react";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  type?: "text" | "email" | "password";
  name: string;
  value: string;
  placeholder?: string;
  label: string;
  btnText?: string;
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
  children,
  onChange,
  onSubmit,
}: Props) {
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
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          required
          onChange={onChange}
          className="w-full border-0 outline-0 border-b-[1px] border-cyan-300 bg-transparent text-sky-300"
        />
        <PrimaryBtn btnText={btnText} type="submit" icon={<IoMdCheckmark size={24} />} />
      </div>
      {children && <>{children}</>}
    </form>
  );
}
