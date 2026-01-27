import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { ROUTES } from "./paths.js";
import Loadable from "../utils/Loadable.jsx";
import { loginAction } from "../actions/loginAction.js";
import PublicRoute from "./PublicRoute";

const HomePage = Loadable(lazy(() => import("../pages/homePage.jsx")));
const LoginPage = Loadable(lazy(() => import("../pages/Login.jsx")));
const SignUpPage = Loadable(lazy(() => import("../pages/SignUp.jsx")));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
            action: loginAction,
          },
          {
            path: ROUTES.SIGNUP,
            element: <SignUpPage />,
            // action: loginAction,
          },
        ],
      },

      // Normal pages

      { index: true, element: <HomePage /> },
    ],
  },
]);
