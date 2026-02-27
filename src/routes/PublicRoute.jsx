import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./paths";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
