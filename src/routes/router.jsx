import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { ROUTES } from "./paths.js";
import Loadable from "../utils/Loadable.jsx";
import { loginAction } from "../actions/loginAction.js";
import { logoutAction } from "../actions/logoutAction.js";
import { signUpAction } from "../actions/signUpAction";
import { AccountVerificationAction } from "../actions/AccountVerificationAction";
import ForgetPasswordAction from "../actions/RequestResetPasswordCodeAction";
import VerifyRoute from "./VerifyRoute";
import PublicRoute from "./PublicRoute";
import { rootLoader } from "../loaders/Rootloader";
import Root from "../layouts/Root";
import VerifyResetCodeAction from "../actions/VerifyResetCodeAction";

// Lazy loaded pages
const HomePage = Loadable(lazy(() => import("../pages/HomePage.jsx")));
const LoginPage = Loadable(lazy(() => import("../pages/Login.jsx")));
const SignUpPage = Loadable(lazy(() => import("../pages/SignUp.jsx")));
const VerifyAccountPage = Loadable(
  lazy(() => import("../pages/VerifyAccountPage.jsx")),
);
const ForgetPasswordPage = Loadable(
  lazy(() => import("../pages/RequestResetPasswordPage.jsx")),
);
const VerifyResetCodePage = Loadable(
  lazy(() => import("../pages/VerifyResetCodePage.jsx")),
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/ResetPasswordPage.jsx")),
);

/**
 * Router Configuration - Phase 3 Complete
 *
 * Route Protection Logic:
 *
 * 1. Root Layout (/)
 *    - Has rootLoader to verify authentication on app load
 *    - Shows LoadingIndicator during verification
 *
 * 2. PublicRoute (Login, SignUp)
 *    - If authenticated → Redirect to home
 *    - If NOT authenticated → Allow access
 *
 * 3. VerifyRoute (Verify Account)
 *    - If authenticated → Redirect to home
 *    - If NOT authenticated + has verification email → Allow access
 *    - If NOT authenticated + no verification email → Redirect to signup
 *
 * 4. Normal Routes (Home, etc.)
 *    - No special protection (accessible to all)
 *    - Can add ProtectedRoute later if needed
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Root />,
    loader: rootLoader, // Verify auth on initial load
    children: [
      {
        element: <App />,
        children: [
          // Public Routes (Login, SignUp, Verify)
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
                action: signUpAction,
              },
              {
                path: ROUTES.FORGOT_PASSWORD,
                element: <ForgetPasswordPage />,
                action: ForgetPasswordAction,
              },
              //TODO: Delete VerifyResetCodePage from here it just for test actual place is VerifyRoute
              {
                path: ROUTES.VERIFY_RESET,
                element: <VerifyResetCodePage />,
                action: VerifyResetCodeAction,
              },
              //TODO: Delete ResetPasswordPage from here it just for test actual place is ResetPasswordRoute will be add later
              {
                path: ROUTES.RESET_PASSWORD,
                element: <ResetPasswordPage />,
              },
            ],
          },
          {
            path: ROUTES.LOGOUT,
            action: logoutAction,
          },

          // Verify Route (Special Protection)
          {
            element: <VerifyRoute />,
            children: [
              {
                path: ROUTES.VERIFY_ACCOUNT,
                element: <VerifyAccountPage />,
                action: AccountVerificationAction,
              },
            ],
          },

          // Normal Routes (No protection - accessible to all)
          {
            index: true,
            element: <HomePage />,
          },

          // Add more normal routes here as needed
          // { path: ROUTES.FLEET, element: <FleetPage /> },
          // { path: ROUTES.ABOUT, element: <AboutPage /> },
          // etc.
        ],
      },
    ],
  },
]);
