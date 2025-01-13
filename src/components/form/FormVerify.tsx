import { useEffect, useRef, useState } from "react";
import { FetchStatus } from "../../types/apiTypes";
import { Verify } from "../../types/auth";
import { UserFormData } from "../../types/types";
import useDocumentFocus from "../../hooks/useDocumentFocus";
import useVerify from "../../hooks/useVerify";

interface Props {
  formData: UserFormData;
  verify: Verify;
  setStatus: (status: FetchStatus) => void;
  setError: (error: string) => void;
  setFormData: (formData: UserFormData) => void;
}

export default function FormVerify({ formData, verify, setStatus, setError, setFormData }: Props) {
  const [code, setCode] = useState<string[]>(Array(8).fill(""));
  const [lastClipboard, setLastClipboard] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null));

  const isDocumentUnfocused = Array.from(inputRefs.current).every((ref) => ref === null || !ref?.contains(document.activeElement));

  useDocumentFocus<HTMLInputElement, string>({ focusElementRef: { current: inputRefs.current[0] }, dependency: lastClipboard, focusCondition: isDocumentUnfocused });
  useVerify({ formData, code: code.join(""), verify, setStatus, setError });

  useEffect(() => {
    const fetchClipboard = async () => {
      try {
        inputRefs.current[0]?.focus();
        const clipboardText = await navigator.clipboard.readText();
        setLastClipboard(clipboardText);
      } catch (err) {
        console.error("Failed to read clipboard: ", err);
      }
    };

    fetchClipboard();

    const intervalId = setInterval(async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (lastClipboard && clipboardText) {
          const trimedLastClipboard = lastClipboard.trim();
          const trimedClipboardText = clipboardText.trim();

          if (trimedLastClipboard !== trimedClipboardText) {
            setLastClipboard(trimedClipboardText);
            if (trimedClipboardText.length >= 8) {
              const newCode = trimedClipboardText.slice(0, 8).split("");
              const updatedFormData = { ...formData, verificationCode: newCode.join("") };
              setCode(newCode);
              setFormData(updatedFormData);
            }
          }
        }
      } catch (err) {
        console.error("Failed to read clipboard: ", err);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [lastClipboard]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    const updatedFormData = { ...formData, verificationCode: newCode.join("") };
    newCode[index] = value;
    setCode(newCode);
    setFormData(updatedFormData);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="verify-conatiner">
      {code.map((char, index) => (
        <input key={index} ref={(el) => (inputRefs.current[index] = el)} type="text" maxLength={1} value={char} onChange={(e) => handleChange(index, e.target.value)} className="verify-input" />
      ))}
    </div>
  );
}
