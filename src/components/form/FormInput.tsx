import React from "react";

interface Props {
  labelText: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ labelText, name, value, required, onChange }: Props) {
  return (
    <div className="input-container">
      <input type="text" name={name} value={value} required={required} onChange={onChange} autoComplete="off" />
      <label>{labelText}</label>
    </div>
  );
}
