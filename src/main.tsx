import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./index.css";

try {
  registerSW({
    immediate: true,
    onRegisterError() {
      // Fail silently on restricted WebKit/iframe environments
    },
  });
} catch {
  // Ignore if ServiceWorker is unsupported in current browser context
}

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
