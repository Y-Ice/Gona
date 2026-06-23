import React, { useState, useEffect } from "react";
import {
  Settings, Search, BarChart2, Leaf,
  User, Mountain, Building2, FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import { useTranslatedText } from "../../hooks/useTranslatedText";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getToken = () => localStorage.getItem("token") || localStorage.getItem("fb_token");

function T({ text }) {
  const translated = useTranslatedText(text);
  return <>{translated}</>;
}

const COLORS = ["#1e3a2f", "#c47a0a", "#3a8a5a", "#7a6a50", "#8a8a8a", "#f5a623"];

const AdminReports = () => {
  const [farms, setFarms]           = useState([]);
  const [crops, setCrops]           = useState([]);
  const [employees, setEmployees]   = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [exporting, setExporting]   = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [farmRes, cropRes, empRes, actRes] = await Promise.all([
          fetch(`${API_URL}/api/farms`,      { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API_URL}/api/crops`,      { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API_URL}/api/employees`,  { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API_URL}/api/activities`, { headers: { Authorization: `Bearer ${getToken()}` } }),
        ]);
        const [farmData, cropData, empData, actData] = await Promise.all([
          farmRes.json(), cropRes.json(), empRes.json(), actRes.json(),
        ]);
        if (Array.isArray(farmData)) setFarms(farmData);
        if (Array.isArray(cropData)) setCrops(cropData);
        if (Array.isArray(empData))  setEmployees(empData);
        if (Array.isArray(actData))  setActivities(actData);
      } catch (err) {
        console.error("Reports fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const getFarmName = (id) => farms.find((f) => f._id === id)?.name || "—";
  const getEmpName  = (id) => employees.find((e) => e._id === id)?.name || "—";

  const totalYield     = crops.filter((c) => c.status === "Harvested").reduce((sum, c) => sum + (c.actualYield || c.expectedYield || 0), 0);
  const growingCrops   = crops.filter((c) => c.status === "Growing").length;
  const harvestedCrops = crops.filter((c) => c.status === "Harvested").length;
  const failedCrops    = crops.filter((c) => c.status === "Failed").length;
  const activeFarms    = farms.filter((f) => f.status === "Active").length;
  const activeEmps     = employees.filter((e) => e.status === "Active").length;

  const cropStatusData = [
    { name: "Growing",   value: growingCrops },
    { name: "Harvested", value: harvestedCrops },
    { name: "Failed",    value: failedCrops },
  ].filter((d) => d.value > 0);

  const yieldPerFarm = farms.map((farm) => {
    const farmCrops = crops.filter((c) => c.farmId === farm._id);
    const yield_ = farmCrops.reduce((sum, c) => sum + (c.actualYield || c.expectedYield || 0), 0);
    return { name: farm.name?.split(" ")[0] || "Farm", yield: yield_ };
  });

  const activityTypes = activities.reduce((acc, act) => {
    acc[act.type] = (acc[act.type] || 0) + 1;
    return acc;
  }, {});
  const activityData = Object.entries(activityTypes).map(([name, value]) => ({ name, value }));

  const monthlyData = () => {
    const months = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", { month: "short" });
      months[key] = 0;
    }
    activities.forEach((act) => {
      const d = new Date(act.date);
      const key = d.toLocaleString("default", { month: "short" });
      if (months[key] !== undefined) months[key]++;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  };

  const farmPerformance = farms.map((farm) => {
    const farmCrops      = crops.filter((c) => c.farmId === farm._id);
    const farmActivities = activities.filter((a) => a.farmId === farm._id);
    const farmEmployees  = employees.filter((e) => e.farmId === farm._id);
    const farmYield      = farmCrops.reduce((sum, c) => sum + (c.actualYield || c.expectedYield || 0), 0);
    const successRate    = farmCrops.length > 0
      ? Math.round((farmCrops.filter((c) => c.status === "Harvested").length / farmCrops.length) * 100)
      : 0;
    return { ...farm, cropCount: farmCrops.length, activityCount: farmActivities.length, employeeCount: farmEmployees.length, totalYield: farmYield, successRate };
  });

  const exportPDF = () => {
    setExporting(true);
    try {
      const doc = new jsPDF();
      const date = new Date().toLocaleDateString();

      // Header
      doc.setFillColor(30, 58, 47);
      doc.rect(0, 0, 210, 28, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Gona Farm Report", 14, 17);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${date}`, 150, 17);

      // Summary stats
      doc.setTextColor(30, 58, 47);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Summary", 14, 38);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      const stats = [
        `Active Farms: ${activeFarms}`,
        `Total Crops: ${crops.length}`,
        `Active Staff: ${activeEmps}`,
        `Total Yield: ${totalYield} kg`,
        `Activities Logged: ${activities.length}`,
      ];
      stats.forEach((s, i) => doc.text(s, 14 + (i % 3) * 65, 46 + Math.floor(i / 3) * 7));

      // Farm Performance table
      autoTable(doc, {
        startY: 62,
        head: [["Farm", "Status", "Crops", "Staff", "Activities", "Success Rate"]],
        body: farmPerformance.map((f) => [
          f.name, f.status, f.cropCount, f.employeeCount, f.activityCount, `${f.successRate}%`,
        ]),
        headStyles: { fillColor: [30, 58, 47], fontSize: 8 },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [247, 244, 238] },
        margin: { left: 14, right: 14 },
      });

      // Crops table
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Crop", "Farm", "Expected (kg)", "Actual (kg)", "Status"]],
        body: crops.map((c) => [
          c.name, getFarmName(c.farmId),
          c.expectedYield || "—", c.actualYield || "—", c.status,
        ]),
        headStyles: { fillColor: [196, 122, 10], fontSize: 8 },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [247, 244, 238] },
        margin: { left: 14, right: 14 },
      });

      // Employees table
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Name", "Role", "Farm", "Phone", "Status"]],
        body: employees.map((e) => [
          e.name, e.role || "—", getFarmName(e.farmId), e.phone || "—", e.status,
        ]),
        headStyles: { fillColor: [30, 58, 47], fontSize: 8 },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [247, 244, 238] },
        margin: { left: 14, right: 14 },
      });

      // Activities table
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Date", "Farm", "Type", "Employee", "Description"]],
        body: activities.map((a) => [
          a.date ? new Date(a.date).toLocaleDateString() : "—",
          getFarmName(a.farmId), a.type, getEmpName(a.employeeId),
          a.description?.slice(0, 40) + (a.description?.length > 40 ? "..." : ""),
        ]),
        headStyles: { fillColor: [196, 122, 10], fontSize: 8 },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [247, 244, 238] },
        margin: { left: 14, right: 14 },
      });

      // Footer on every page
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(`Gona Farm Management  •  Page ${i} of ${pageCount}`, 14, 290);
      }

      doc.save(`Gona_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center">
        <p className="text-gray-400 font-sans text-sm"><T text="Loading reports..." /></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800"><T text="Reports & Analytics" /></h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search reports..."
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

      <div className="p-4 sm:p-6 flex flex-col gap-6">

        {/* Export Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
          <div>
            <h3 className="text-sm font-semibold text-gray-800"><T text="Export Report" /></h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5"><T text="Download your full farm data as a PDF report" /></p>
          </div>
          <button onClick={exportPDF} disabled={exporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e3a2f] text-white text-sm font-sans font-medium hover:bg-[#2a4f3f] disabled:opacity-50 transition-colors">
            <FileText size={16} />
            {exporting ? <T text="Generating PDF..." /> : <T text="Download PDF Report" />}
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Farms",     value: activeFarms,  icon: <Mountain size={20} className="text-[#7a6a50]" />, bg: "bg-[#f0e8da]" },
            { label: "Total Crops",      value: crops.length, icon: <Leaf size={20} className="text-[#3a8a5a]" />,    bg: "bg-[#d8f0e0]" },
            { label: "Active Staff",     value: activeEmps,   icon: <User size={20} className="text-[#8a8a8a]" />,    bg: "bg-[#e8e8e8]" },
            { label: "Total Yield (kg)", value: totalYield,   icon: <BarChart2 size={20} className="text-[#c47a0a]" />, bg: "bg-[#fdefd0]" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}>
                {s.icon}
              </div>
              <p className="text-xs text-gray-400 font-sans uppercase tracking-wide mb-1"><T text={s.label} /></p>
              <p className="text-2xl font-semibold text-gray-800">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-1"><T text="Activity Trend" /></h3>
            <p className="text-xs text-gray-400 font-sans mb-5"><T text="Activities logged over the last 6 months" /></p>
            {activities.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm font-sans"><T text="No activity data yet" /></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "sans-serif" }} />
                  <YAxis tick={{ fontSize: 12, fontFamily: "sans-serif" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#1e3a2f" strokeWidth={2} dot={{ fill: "#c47a0a" }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-1"><T text="Crop Status Breakdown" /></h3>
            <p className="text-xs text-gray-400 font-sans mb-5"><T text="Distribution of crop lifecycle stages" /></p>
            {cropStatusData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm font-sans"><T text="No crop data yet" /></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={cropStatusData} cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {cropStatusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-1"><T text="Yield Per Farm" /></h3>
            <p className="text-xs text-gray-400 font-sans mb-5"><T text="Total yield (kg) across all farms" /></p>
            {yieldPerFarm.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm font-sans"><T text="No farm data yet" /></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={yieldPerFarm}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "sans-serif" }} />
                  <YAxis tick={{ fontSize: 12, fontFamily: "sans-serif" }} />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#1e3a2f" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-1"><T text="Activity Breakdown" /></h3>
            <p className="text-xs text-gray-400 font-sans mb-5"><T text="Types of activities logged across all farms" /></p>
            {activityData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm font-sans"><T text="No activity data yet" /></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                  <XAxis type="number" tick={{ fontSize: 12, fontFamily: "sans-serif" }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontFamily: "sans-serif" }} width={90} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#c47a0a" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Farm Performance Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 bg-[#f0ece0]">
            <h3 className="text-base font-semibold text-gray-800"><T text="Farm Performance Summary" /></h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5"><T text="Overview of each farm's output and activity" /></p>
          </div>

          <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-gray-100">
            {["Farm", "Status", "Crops", "Employees", "Activities", "Success Rate"].map((h) => (
              <span key={h} className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
                <T text={h} />
              </span>
            ))}
          </div>

          {farmPerformance.length === 0 ? (
            <div className="p-8 text-center text-gray-400 font-sans text-sm"><T text="No farms registered yet." /></div>
          ) : (
            farmPerformance.map((farm, i) => (
              <div key={farm._id}
                className={`grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-3 lg:gap-4 px-6 py-4 lg:items-center
                  ${i !== farmPerformance.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#f0e8da] flex items-center justify-center flex-shrink-0">
                    <Building2 size={16} className="text-[#7a6a50]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{farm.name}</p>
                    <p className="text-xs text-gray-400 font-sans">{farm.location || "—"}</p>
                  </div>
                </div>
                <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full w-fit
                  ${farm.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  <T text={farm.status} />
                </span>
                <span className="text-sm font-sans text-gray-700">{farm.cropCount} <T text="crops" /></span>
                <span className="text-sm font-sans text-gray-700">{farm.employeeCount} <T text="staff" /></span>
                <span className="text-sm font-sans text-gray-700">{farm.activityCount} <T text="logs" /></span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e3a2f] rounded-full" style={{ width: `${farm.successRate}%` }} />
                  </div>
                  <span className="text-xs font-sans font-semibold text-gray-700 w-8">{farm.successRate}%</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Crop Details Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 bg-[#f0ece0]">
            <h3 className="text-base font-semibold text-gray-800"><T text="Crop Yield Details" /></h3>
            <p className="text-xs text-gray-400 font-sans mt-0.5"><T text="Expected vs actual yield for all crops" /></p>
          </div>

          <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-gray-100">
            {["Crop", "Farm", "Expected (kg)", "Actual (kg)", "Status"].map((h) => (
              <span key={h} className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
                <T text={h} />
              </span>
            ))}
          </div>

          {crops.length === 0 ? (
            <div className="p-8 text-center text-gray-400 font-sans text-sm"><T text="No crops added yet." /></div>
          ) : (
            crops.map((crop, i) => {
              const farm = farms.find((f) => f._id === crop.farmId);
              return (
                <div key={crop._id}
                  className={`grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_1fr_1fr_1fr] gap-3 lg:gap-4 px-6 py-4 lg:items-center
                    ${i !== crops.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌱</span>
                    <p className="text-sm font-semibold text-gray-800"><T text={crop.name} /></p>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">{farm?.name || "—"}</p>
                  <p className="text-sm text-gray-700 font-sans">{crop.expectedYield || "—"}</p>
                  <p className="text-sm text-gray-700 font-sans">{crop.actualYield || "—"}</p>
                  <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full w-fit
                    ${crop.status === "Growing"   ? "bg-green-100 text-green-700"  :
                      crop.status === "Harvested" ? "bg-blue-100 text-blue-700"   :
                      "bg-red-100 text-red-600"}`}>
                    <T text={crop.status} />
                  </span>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminReports;