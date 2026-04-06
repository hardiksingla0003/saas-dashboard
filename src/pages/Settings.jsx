import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Settings = () => {
  const { auth } = useAuth();
  const [name, setName] = useState(
    () => localStorage.getItem("profile_name") || auth.user?.name || "",
  );
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") !== "false";
  });
  const handleSaveName = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    localStorage.setItem("profile_name", name.trim());
    toast.success("Profile updated successfully");
  };
  const handleNotifications = () => {
    const updated = !notifications;
    setNotifications(updated);
    localStorage.setItem("notifications", updated);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <h2 className="text-lg font-medium mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-1 border w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
          <button
            className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={() => handleSaveName()}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <h2 className="text-lg font-medium mb-4">Preferences</h2>
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <span>Dark Mode</span>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
        <div className="flex items-center justify-between py-3">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
