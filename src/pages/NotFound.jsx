import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotFound = () => {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-8xl font-bold mb-3 text-red-500">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-5">Page not found</p>
      {auth.isAuthenticated && (
        <NavLink
          to="/dashboard"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go to Dashboard
        </NavLink>
      )}
    </div>
  );
};

export default NotFound;
