import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Sprout,
  Users,
  ClipboardList,
  BarChart2,
  LogOut,
  Settings,
} from "lucide-react";
import { useTranslatedText } from "../../hooks/useTranslatedText";

function T({ text }) {
  const translated = useTranslatedText(text);
  return <>{translated}</>;
}

const AdminSideBar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fb_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    if (setSidebarOpen) setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <aside className="flex flex-col h-screen w-64 bg-green-900">
      <div className="flex items-center gap-2 px-2 py-2">
        <div className="w-15 h-15 rounded-lg flex items-center justify-center flex-shrink-0">
          <img
            src="/images/logo3.png"
            alt="Gona logo"
            className="w-full h-full"
          />
        </div>
        <h1 className="text-[30px] font-bold italic text-[#d4840a]">Gona</h1>
      </div>

      <nav className="flex-1 px-3 py-2 overflow-y-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase px-3 mb-2">
          <T text="Main" />
        </p>
        <ul className="flex flex-col gap-1 mb-5">
          <li>
            <NavLink
              to="/admin"
              end
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <LayoutDashboard size={20} /> <T text="Dashboard" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/farms"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Map size={20} /> <T text="Farms" />
            </NavLink>
          </li>
        </ul>

        <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase px-3 mb-2">
          <T text="Manage" />
        </p>
        <ul className="flex flex-col gap-1 mb-5">
          <li>
            <NavLink
              to="/admin/crops"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Sprout size={20} /> <T text="Crops" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/employees"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Users size={20} /> <T text="Employees" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/activities"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <ClipboardList size={20} /> <T text="Activities" />
            </NavLink>
          </li>
        </ul>

        <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase px-3 mb-2">
          <T text="Insights" />
        </p>
        <ul className="flex flex-col gap-1 mb-5">
          <li>
            <NavLink
              to="/admin/reports"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <BarChart2 size={20} /> <T text="Reports" />
            </NavLink>
          </li>
        </ul>

        <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase px-3 mb-2">
          <T text="Profile" />
        </p>
        <ul className="flex flex-col gap-1 mb-5">
          <li>
            <NavLink
              to="/admin/settings"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-150
                ${isActive ? "bg-[#d4840a] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Settings size={20} /> <T text="Settings" />
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-red-400 hover:bg-white/10 hover:text-red-300 w-full transition-all duration-150"
        >
          <LogOut size={20} />
          <T text="Logout" />
        </button>
      </div>
    </aside>
  );
};

export default AdminSideBar;