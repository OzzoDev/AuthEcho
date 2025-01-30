import { useEffect } from "react";
import useAuthechoAuthStore from "./useAuthechoAuthStore";

const useNavigateAdmin = (callback: () => void) => {
  const { isAdmin } = useAuthechoAuthStore();

  useEffect(() => {
    if (isAdmin) {
      callback();
    }
  }, []);
};

export default useNavigateAdmin;
