import useAuthechoAuth from "./hooks/authecho/useAuthechoAuth";
import useAuthechoAuthStore from "./hooks/authecho/useAuthechoAuthStore";
import { RouterProvider } from "react-router";
import router from "./router/Router";

function App() {
  const { isAuthenticated, isAdmin } = useAuthechoAuthStore();

  useAuthechoAuth();

  return <RouterProvider router={router(isAuthenticated, isAdmin)} />;
}

export default App;
