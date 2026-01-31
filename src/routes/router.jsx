import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { ROUTES } from "./paths.js";
import Loadable from "../utils/Loadable.jsx";
import { loginAction } from "../actions/loginAction.js";
import { signUpAction } from "../actions/signUpAction";
import { AccountVerificationAction } from "../actions/AccountVerificationAction";
import VerifyRoute from "./VerifyRoute";

import PublicRoute from "./PublicRoute";

const HomePage = Loadable(lazy(() => import("../pages/HomePage.jsx")));
const LoginPage = Loadable(lazy(() => import("../pages/Login.jsx")));
const SignUpPage = Loadable(lazy(() => import("../pages/SignUp.jsx")));
const VerifyAccountPage = Loadable(
  lazy(() => import("../pages/ VerifyAccountPage.jsx")),
);

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
            action: signUpAction,
          },
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
        ],
      },

      // Normal pages

      { index: true, element: <HomePage /> },
    ],
  },
]);
// export const router = createBrowserRouter([
//   {
//     path: ROUTES.HOME,
//     element: <App />,
//     children: [
//       // تم توجيه الصفحة الرئيسية مباشرة لصفحة التوثيق لأغراض الاختبار
//       {
//         index: true,
//         element: <VerifyAccountPage />,
//       },

//      // تم تعطيل المسارات الأخرى مؤقتاً
//       {
//         element: <PublicRoute />,
//         children: [
//           { path: ROUTES.LOGIN, element: <LoginPage />, action: loginAction },
//           { path: ROUTES.SIGNUP, element: <SignUpPage />, action: signUpAction },
//         ],
//       },

//       {
//         path: ROUTES.VERIFY_ACCOUNT,
//         element: <VerifyAccountPage />,
//       },
//     ],
//   },
// ]);
