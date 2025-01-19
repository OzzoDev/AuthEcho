import { useEffect, useState } from "react";

const useSessionStorage = <T>(
  key: string,
  initialValue: T
): {
  sessionValue: T | undefined;
  setSessionValue: (value: T | ((val: T | undefined) => T)) => void;
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

  const setSessionValue = (value: T | ((val: T | undefined) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(localValue) : value;
      setLocalValue(valueToStore);
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting session storage:", error);
    }
  };

  const removeSessionValue = () => {
    try {
      setLocalValue(undefined);
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing session storage:", error);
    }
  };

  useEffect(() => {
    const item = window.sessionStorage.getItem(key);
    if (item) {
      setLocalValue(JSON.parse(item));
    }
  }, [key]);

  return { sessionValue: localValue, setSessionValue, removeSessionValue };
};

export default useSessionStorage;
