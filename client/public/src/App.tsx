import { RouterProvider } from "react-router";
import router from "./router/Router";
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();

  return <RouterProvider router={router} />;
}

export default App;
