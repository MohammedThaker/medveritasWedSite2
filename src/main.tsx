// ─────────────────────────────────────────────────────────────────
// main.tsx — Application entry point
// Replace the contents of your existing main.tsx with this file.
// ─────────────────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes/AppRoutes";
import "./App.css"; // your existing global styles — unchanged

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
