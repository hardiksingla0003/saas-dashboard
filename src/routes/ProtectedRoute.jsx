import { Navigate } from "react-router-dom";
import { rolePermissions } from "../utils/permissions";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, permission }) => {
  const { auth, authLoading } = useAuth();

  if (authLoading) return null;
  if (!auth.isAuthenticated) return <Navigate to="/" />;
  if (permission) {
    const role = auth.user?.role;
    const hasAccess = rolePermissions[role]?.[permission];

    if (!hasAccess) {
      return <Navigate to="/access-denied" />;
    }
  }

  return children;
};

export default ProtectedRoute;
