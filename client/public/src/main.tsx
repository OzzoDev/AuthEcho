import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
//@ts-ignore
import "./index.css";
//@ts-ignore
import "./styles/navbar.css";
//@ts-ignore
import "./styles/btn.css";
//@ts-ignore
import "./styles/form.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
