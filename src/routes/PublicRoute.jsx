import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./paths";
import { isAuthenticated } from "../utils/authUtils";

const PublicRoute = () => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
