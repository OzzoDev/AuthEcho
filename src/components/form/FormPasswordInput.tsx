import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
  labelText: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormPasswordInput({ labelText, name, value, required, onChange }: Props) {
  const [inputType, setInputType] = useState<"text" | "password">("password");

  return (
    <div className="input-container">
      <input type={inputType} name={name} value={value} required={required} onChange={onChange} autoComplete="off" />
      <label>{labelText}</label>
      <button type="button" className="password-toggle" onClick={() => (inputType === "text" ? setInputType("password") : setInputType("text"))}>
        {inputType === "text" ? <FiEyeOff size={25} color="#fafffd" /> : <FiEye size={25} color="#fafffd" />}
      </button>
    </div>
  );
}
