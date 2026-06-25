import React from "react";
import ReactDOM from "react-dom/client";
// Tokens are imported through Tailwind in index.css (@import) so the @theme
// block in variables.css registers the design-token utilities.
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
