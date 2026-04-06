import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); //desktop
  const [isOpen, setIsOpen] = useState(false); //mobile
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar collapsed={collapsed} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden z-30 bg-black/40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar setCollapsed={setCollapsed} setIsOpen={setIsOpen} />
        <main className="p-4 sm:p-6 flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
