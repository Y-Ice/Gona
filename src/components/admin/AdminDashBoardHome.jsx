import React, { useState, useEffect } from "react";
import {
  Mountain, Leaf, User, BarChart2, Building2,
  MoreVertical, Plus, Settings, Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getToken = () => localStorage.getItem("token") || localStorage.getItem("fb_token");

const AdminDashBoardHome = () => {
  const [farms, setFarms]           = useState([]);
  const [crops, setCrops]           = useState([]);
  const [employees, setEmployees]   = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [farmRes, cropRes, empRes, actRes] = await Promise.all([
          fetch(`${API}/farms`,      { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API}/crops`,      { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API}/employees`,  { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API}/activities`, { headers: { Authorization: `Bearer ${getToken()}` } }),
        ]);
        const [farmData, cropData, empData, actData] = await Promise.all([
          farmRes.json(), cropRes.json(), empRes.json(), actRes.json(),
        ]);
        if (Array.isArray(farmData)) setFarms(farmData);
        if (Array.isArray(cropData)) setCrops(cropData);
        if (Array.isArray(empData))  setEmployees(empData);
        if (Array.isArray(actData))  setActivities(actData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const totalYield = crops
    .filter((c) => c.status === "Harvested")
    .reduce((sum, c) => sum + (c.actualYield || c.expectedYield || 0), 0);

  const stats = [
    {
      label: "Total Farms",
      value: loading ? "..." : farms.length,
      change: "+0%", positive: true,
      icon: <Mountain size={22} className="text-[#7a6a50]" />,
      iconBg: "bg-[#f0e8da]",
    },
    {
      label: "Total Crops",
      value: loading ? "..." : crops.length,
      change: "+0%", positive: true,
      icon: <Leaf size={22} className="text-[#3a8a5a]" />,
      iconBg: "bg-[#d8f0e0]",
    },
    {
      label: "Employees",
      value: loading ? "..." : employees.length,
      change: "+0%", positive: true,
      icon: <User size={22} className="text-[#8a8a8a]" />,
      iconBg: "bg-[#e8e8e8]",
    },
    {
      label: "Total Yield (kg)",
      value: loading ? "..." : totalYield,
      change: "+0%", positive: true,
      icon: <BarChart2 size={22} className="text-[#c47a0a]" />,
      iconBg: "bg-[#fdefd0]",
    },
  ];

  const activityTypeColor = (type) => {
    const map = {
      Planting:       "bg-green-100 text-green-700",
      Fertilizing:    "bg-yellow-100 text-yellow-700",
      Weeding:        "bg-orange-100 text-orange-700",
      Irrigation:     "bg-blue-100 text-blue-700",
      "Pest Control": "bg-red-100 text-red-700",
      Feeding:        "bg-purple-100 text-purple-700",
      Harvesting:     "bg-emerald-100 text-emerald-700",
      Other:          "bg-gray-100 text-gray-600",
    };
    return map[type] || "bg-gray-100 text-gray-600";
  };

  const getFarmName = (id) => farms.find((f) => f._id === id)?.name || "Unknown Farm";
  const getEmpName  = (id) => employees.find((e) => e._id === id)?.name || "Unknown";

  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-3xl font-bold text-gray-700">Dashboard Overview</h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search Employees..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-sans text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <Link to="/admin/settings">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <Settings size={18} />
            </button>
          </Link>
          <div className="w-10 h-10 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0"></div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-500 pb-4"></div>

      <div className="px-4 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full font-sans
                  ${stat.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-sans mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
            <Link to="/admin/activities">
              <button className="text-sm text-[#c47a0a] font-sans hover:underline">View all →</button>
            </Link>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400 font-sans text-center py-6">Loading activities...</p>
          ) : recentActivities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f9f8f5] p-8 text-center text-gray-500">
              No recent activities yet. Once you log actions, they'll appear here.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {recentActivities.map((act) => (
                <div key={act._id} className="flex items-start gap-4">
                  <span className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full flex-shrink-0 ${activityTypeColor(act.type)}`}>
                    {act.type}
                  </span>
                  <div>
                    <p className="text-sm text-gray-800 font-sans">{act.description || "No description"}</p>
                    <p className="text-[11px] text-gray-400 font-sans mt-0.5 tracking-wide">
                      {getFarmName(act.farmId)} · {getEmpName(act.employeeId)} · {act.date ? new Date(act.date).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Farm Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between px-6 py-5">
            <h3 className="text-lg font-semibold text-gray-800">Farm Overview</h3>
            <Link to="/admin/farms">
              <button className="flex items-center text-sm font-sans font-medium px-3 py-2 rounded-lg bg-[#1e1a14] text-white hover:bg-[#2a241c]">
                <Plus size={18} className="mr-2" />
                Add Farm
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 px-6 py-3 bg-[#f7f4ee] border-y border-gray-100">
            <span className="text-xs font-sans font-semibold text-gray-400">Farm Name</span>
            <span className="text-xs font-sans font-semibold text-gray-400">Location</span>
            <span className="text-xs font-sans font-semibold text-gray-400">Specialization</span>
            <span className="text-xs font-sans font-semibold text-gray-400">Size</span>
            <span className="text-xs font-sans font-semibold text-gray-400">Status</span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400 font-sans text-sm">Loading farms...</div>
          ) : farms.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-sans text-sm border border-dashed border-gray-300 rounded-2xl m-4">
              No farms registered yet. Add your first farm to see it listed here.
            </div>
          ) : (
            farms.map((farm, i) => (
              <div key={farm._id}
                className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 px-6 py-4 items-center
                  ${i !== farms.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#f0e8da] flex items-center justify-center flex-shrink-0">
                    <Building2 size={18} className="text-[#7a6a50]" />
                  </div>
                  <span className="font-semibold text-gray-800 font-sans text-sm">{farm.name}</span>
                </div>
                <span className="text-sm text-gray-600 font-sans">{farm.location || "—"}</span>
                <div>
                  <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-md bg-[#f0ece0] text-gray-600 uppercase tracking-wide">
                    {farm.specialization || "—"}
                  </span>
                </div>
                <span className="text-sm text-gray-600 font-sans">{farm.size} {farm.unit}</span>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide
                    ${farm.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
                    {farm.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoardHome;