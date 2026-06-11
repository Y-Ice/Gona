import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/AdminSideBar";
import { Menu, X } from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f4ee]">
      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-0 md:h-screen`}
      >
        <AdminSideBar setSidebarOpen={setSidebarOpen} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Mobile menu button */}
        <div className="md:hidden bg-white shadow-sm px-6 py-4">
          <button
            className="text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
