import React, { ReactNode } from "react";

type InputType = "text" | "url" | "date" | "email" | "textarea";

interface Props {
  labelText: string;
  name?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  children?: ReactNode;
}

export default function DescriptiveInput({
  labelText,
  name = "",
  type = "text",
  value,
  placeholder = "",
  children,
  maxLength,
  isRequired = true,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <label className="text-cyan-200">{labelText}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={maxLength}
          required={isRequired}
          className="min-h-[200px] max-h-[200px] p-2 rounded-md bg-transparent border-[1px] border-white outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          maxLength={maxLength}
          required={isRequired}
          className="p-2 rounded-md bg-transparent border-[1px] border-white outline-none w-full"
        />
      )}
      {children && <div className="text-gray-400">{children}</div>}
    </div>
  );
}
