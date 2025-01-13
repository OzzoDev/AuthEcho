import { useEffect, useRef, useState } from "react";
import { FetchStatus } from "../../types/apiTypes";
import { Verify } from "../../types/auth";
import { UserFormData } from "../../types/types";
import useVerify from "../../hooks/useVerify";
import useClipboard from "../../hooks/useClipboard";

interface Props {
  formData: UserFormData;
  verify: Verify;
  setStatus: (status: FetchStatus) => void;
  setError: (error: string) => void;
  setFormData: (formData: UserFormData) => void;
}

export default function FormVerify({ formData, verify, setStatus, setError }: Props) {
  const [code, setCode] = useState<string[]>(Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null));

  const verifyCode = useVerify({ formData, code: code.join(""), verify, setStatus, setError });

  const { lastClipboard } = useClipboard({ setCode });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [lastClipboard]);

  useEffect(() => {
    verifyCode();
  }, [code]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCode(event.clipboardData.getData("text").trim().split(""));
  };

  return (
    <div className="verify-conatiner">
      {code.map((char, index) => (
        <input key={index} ref={(el) => (inputRefs.current[index] = el)} type="text" maxLength={1} value={char} onChange={(e) => handleChange(index, e.target.value)} onPaste={handlePaste} className="verify-input" />
      ))}
    </div>
  );
}
