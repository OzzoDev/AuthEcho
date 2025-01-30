import { useEffect, useState } from "react";

const useSessionStorage = <T>(
  key: string,
  initialValue: T
): {
  sessionValue: T | undefined;
  setSessionValue: (value: T) => void;
  removeSessionValue: () => void;
} => {
  const [localValue, setLocalValue] = useState<T | undefined>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading session storage:", error);
      return initialValue;
    }
  });

  const setSessionValue = (value: T) => {
    try {
      setLocalValue(value);
      sessionStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("storageChange"));
    } catch (error) {
      console.error("Error setting session storage:", error);
    }
  };

  const removeSessionValue = () => {
    try {
      setLocalValue(undefined);
      sessionStorage.removeItem(key);
      window.dispatchEvent(new Event("storageChange"));
    } catch (error) {
      console.error("Error removing session storage:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const item = sessionStorage.getItem(key);
      setLocalValue(item ? JSON.parse(item) : initialValue);
    };

    window.addEventListener("storageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, [key, initialValue]);

  return { sessionValue: localValue, setSessionValue, removeSessionValue };
};

export default useSessionStorage;
