import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./router.jsx";
import "../styles/index.css";
import { UserProvider } from "../hooks/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <Routes />
    </UserProvider>
  </React.StrictMode>
);
