import { Navigate, Outlet } from "react-router-dom";
import { getValidVerificationEmail } from "../utils/authUtils";
import { ROUTES } from "./paths";

const VerifyRoute = () => {
  const verificationEmail = getValidVerificationEmail();

  if (!verificationEmail) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default VerifyRoute;
