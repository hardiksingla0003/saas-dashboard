import { useCallback, useContext } from "react";
import { LogOut, Menu } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Topbar = ({ setIsOpen, setCollapsed }) => {
  const { auth, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const role = auth.user?.role ?? "Guest";
  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  }, [logout, navigate]);
  return (
    <div className="h-14 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow flex items-center justify-between px-6">
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>
      <button
        className="hidden md:block cursor-pointer"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <Menu />
      </button>
      <div className="flex gap-5 items-center">
        <button
          onClick={toggleTheme}
          className="border px-3 py-1 rounded-lg cursor-pointer dark:border-gray-600"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <h2 className="font-semibold capitalize">Welcome, {role}</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
