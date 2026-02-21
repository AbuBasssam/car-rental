import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
// import { router } from "./routes/router";
import { testRouter } from "./routes/router";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={testRouter} />
    </AuthProvider>
    ,
  </React.StrictMode>,
);
