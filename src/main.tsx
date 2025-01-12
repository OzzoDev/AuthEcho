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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
