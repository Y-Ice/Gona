import React from "react";
import {
  Droplets,
  Package,
  AlertTriangle,
  Mountain,
  Leaf,
  User,
  BarChart2,
  Building2,
  MoreVertical,
  Plus,
  Settings,
  Moon,
  Search

} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Total Farms",
    value: "48",
    change: "+12%",
    positive: true,
    icon: <Mountain size={22} className="text-[#7a6a50]" />,
    iconBg: "bg-[#f0e8da]",
  },
  {
    label: "Total Crops",
    value: "2,410",
    change: "+8%",
    positive: true,
    icon: <Leaf size={22} className="text-[#3a8a5a]" />,
    iconBg: "bg-[#d8f0e0]",
  },
  {
    label: "Employees",
    value: "156",
    change: "-2%",
    positive: false,
    icon: <User size={22} className="text-[#8a8a8a]" />,
    iconBg: "bg-[#e8e8e8]",
  },
  {
    label: "Total Yield (tons)",
    value: "12,840",
    change: "+24%",
    positive: true,
    icon: <BarChart2 size={22} className="text-[#c47a0a]" />,
    iconBg: "bg-[#fdefd0]",
  },
];

const activities = [
  {
    icon: <Droplets size={18} />,
    title: "Irrigation scheduled for North Valley Vineyard",
    meta: "2 HOURS AGO • MARCUS AURELIUS",
    color: "border-gray-800",
  },
  {
    icon: <Package size={18} />,
    title: "Stock delivery: Fertilizer B-12 received",
    meta: "5 HOURS AGO • SARAH JENKINS",
    color: "border-[#c47a0a]",
  },
  {
    icon: <AlertTriangle size={18} />,
    title: "Soil moisture alert at East Orchard",
    meta: "YESTERDAY • SYSTEM AUTOMATED",
    color: "border-[#c47a0a]",
    warn: true,
  },
];
const farms = [
  {
    name: "Highland Creeke",
    location: "Bokkos",
    specialization: "YAM",
    size: "124.5",
    status: "ACTIVE",
    iconBg: "bg-[#fdefd0]",
    iconColor: "text-[#c47a0a]",
  },
  {
    name: "Sunstone Meadows",
    location: "Mangu",
    specialization: "RICE",
    size: "310.0",
    status: "ACTIVE",
    iconBg: "bg-[#fdefd0]",
    iconColor: "text-[#c47a0a]",
  },
  {
    name: "Echo Peak",
    location: "Bassa",
    specialization: "POTATO",
    size: "88.2",
    status: "DORMANT",
    iconBg: "bg-[#fbe4e4]",
    iconColor: "text-[#c0504d]",
  },
];

const AdminDashBoardHome = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-3xl font-bold text-gray-700">Dashboard Overview</h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-sans text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0">
            <Moon size={18} />
          </button>
          <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 relative flex-shrink-0">
            <Settings size={18} />
          </button>
          <div className="w-10 h-10 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
            JT
          </div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-500 pb-4"></div>
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                >
                  {stat.icon}
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full font-sans
                ${stat.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-sans mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Activities
              </h3>
              <button className="text-sm text-[#c47a0a] font-sans hover:underline">
                View all →
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {activities.map((act, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${act.warn ? "border-[#c47a0a] text-[#c47a0a]" : "border-gray-800 text-gray-800"}`}
                  >
                    {act.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 font-sans">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-gray-400 font-sans mt-0.5 tracking-wide">
                      {act.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
          <div className="flex items-center justify-between px-6 py-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Farm Overview
            </h3>
            <div className="flex items-center gap-3">
              <Link to="/admin/farms">
                <button className="flex text-sm font-sans font-medium px-3 py-2 rounded-lg bg-[#1e1a14] text-white hover:bg-[#2a241c]">
                  <Plus size={18} className="mr-2" />
                  Add Farm
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_0.5fr] gap-4 px-6 py-3 bg-[#f7f4ee] border-y border-gray-100">
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Farm Name
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Location
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Specialization
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Size (Acres)
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Status
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase text-right">
              Actions
            </span>
          </div>
          {farms.map((farm, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 items-center
                      ${i !== farms.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${farm.iconBg}`}
                >
                  <Building2 size={18} className={farm.iconColor} />
                </div>
                <span className="font-semibold text-gray-800 font-sans text-sm">
                  {farm.name}
                </span>
              </div>
              <span className="text-sm text-gray-600 font-sans">
                {farm.location}
              </span>
              <div>
                <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-md bg-[#f0ece0] text-gray-600 uppercase tracking-wide">
                  {farm.specialization}
                </span>
              </div>
              <span className="text-sm text-gray-600 font-sans">
                {farm.size}
              </span>
              <div>
                <span
                  className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide
                        ${farm.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}
                >
                  {farm.status}
                </span>
              </div>
              <div className="text-right">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoardHome;
