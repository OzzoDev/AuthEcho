import { useEffect, useState } from "react";

interface Props {
  setCode: (code: string[]) => void;
}

const useClipboard = ({ setCode }: Props) => {
  const [lastClipboard, setLastClipboard] = useState<string>("");

  useEffect(() => {
    const fetchClipboard = async () => {
      try {
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
            }
          }
        }
      } catch (err) {
        console.error("Failed to read clipboard: ", err);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [lastClipboard]);

  return {
    lastClipboard,
  };
};

export default useClipboard;
