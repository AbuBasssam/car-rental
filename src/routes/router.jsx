import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { ROUTES } from "./paths.js";
import Loadable from "../utils/Loadable.jsx";

const HomePage = Loadable(lazy(() => import("../pages/homePage.jsx")));
const LoginPage = Loadable(lazy(() => import("../pages/Login.jsx")));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
    ],
  },
]);
