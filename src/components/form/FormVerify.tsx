import { useEffect, useRef, useState } from "react";

interface Props {
  setVerificationCode: (verificationCode: string) => void;
}

export default function FormVerify({ setVerificationCode }: Props) {
  const [code, setCode] = useState<string[]>(Array(8).fill(""));
  const [lastClipboard, setLastClipboard] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null));

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
              setCode(newCode);
              setVerificationCode(newCode.join(""));
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
    newCode[index] = value;
    setCode(newCode);
    setVerificationCode(newCode.join(""));

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
