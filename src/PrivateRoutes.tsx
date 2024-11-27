import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "./stores/appStore";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Optional: Restrict by role
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole,
}) => {
  const loggedInUser = useStore((state) => state.loggedInUser);

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && loggedInUser.role !== requiredRole) {
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
