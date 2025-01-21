import { useEffect, useState } from "react";

const useClipboard = (setClip: (clip: string) => void) => {
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
            const clip = trimedClipboardText;
            setClip(clip);
          }
        }
      } catch (err) {
        // console.error("Failed to read clipboard: ", err);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [lastClipboard]);

  return {
    lastClipboard,
  };
};

export default useClipboard;
