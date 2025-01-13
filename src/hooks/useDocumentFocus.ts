import { useEffect } from "react";

interface Props<T, U> {
  focusElementRef: React.RefObject<T>;
  dependency: U;
  focusCondition: boolean;
}

const useDocumentFocus = <T extends HTMLElement, U>({ focusElementRef, dependency, focusCondition }: Props<T, U>) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (focusCondition) {
        focusElementRef.current?.focus();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [dependency]);
};

export default useDocumentFocus;
