import { NavLink } from "react-router-dom";
import { rolePermissions } from "../utils/permissions";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ collapsed, isOpen, setIsOpen }) => {
  const { auth } = useAuth();
  const permissions = rolePermissions[auth.user?.role];
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
      show: permissions?.canViewUsers,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      show: true,
    },
  ];
  return (
    <div
      className={`
        fixed md:static top-0 left-0 min-h-screen z-40 flex flex-col bg-gray-900 dark:bg-gray-950 text-white p-4 transition-all duration-300 w-64
        ${collapsed ? " md:w-20 " : "md:w-64"} 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <h1 className="text-xl font-bold mb-6">
        {collapsed ? "AP" : "Admin Panel"}
      </h1>
      <nav className="flex flex-col gap-2">
        {menuItems
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                className={({ isActive }) =>
                  `flex gap-5 p-2 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-800 dark:hover:bg-gray-700"}`
                }
                to={item.path}
                onClick={() => setIsOpen(false)}
                title={collapsed ? item.name : ""}
              >
                <Icon size={20} /> {!collapsed && item.name}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
};

export default Sidebar;
