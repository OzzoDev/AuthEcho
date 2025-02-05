import React, { ReactNode } from "react";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  type?: "text" | "email" | "password";
  name: string;
  value: string;
  label: string;
  children?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void | Promise<void>;
}

export default function UpdateDataForm({
  type = "text",
  name,
  value,
  label,
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
      className="flex flex-col md:flex-row items-center md:items-end gap-y-4 md:gap-y-0 w-[90%] max-w-[400px]">
      <div className="flex flex-col gap-y-6 w-full px-6 py-2">
        <label className="text-xl">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          required
          onChange={onChange}
          className="w-full border-0 outline-0 border-b-[1px] border-cyan-300 bg-transparent text-sky-300"
        />
        {children && <>{children}</>}
      </div>
      <PrimaryBtn btnText="Update" type="submit" icon={<IoMdCheckmark />} />
    </form>
  );
}
