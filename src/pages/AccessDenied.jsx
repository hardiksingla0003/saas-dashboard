import { NavLink } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 mb-5">
          You do not have permission to view this page
        </p>
        <NavLink
          to="/dashboard"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Back
        </NavLink>
      </div>
    </div>
  );
};

export default AccessDenied;
