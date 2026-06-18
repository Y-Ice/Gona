import { useState, useEffect } from "react";
import {
  Search, Settings, Plus, Trash2, X, Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token") || localStorage.getItem("fb_token");

function AddActivityModal({ onClose, onSave, farms, employees }) {
  const [form, setForm] = useState({
    farmId: farms[0]?._id || "",
    employeeId: employees[0]?._id || "",
    date: new Date().toISOString().split("T")[0],
    type: "Planting",
    description: "",
    inputName: "",
    inputQty: "",
    inputUnit: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.description) { setError("Description is required."); return; }
    if (!form.farmId) { setError("Please select a farm."); return; }
    setLoading(true);
    setError("");

    const inputs = form.inputName
      ? [{ name: form.inputName, qty: Number(form.inputQty), unit: form.inputUnit }]
      : [];

    try {
      const res = await fetch(`${API}/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          farmId:     form.farmId,
          employeeId: form.employeeId,
          date:       form.date,
          type:       form.type,
          description: form.description,
          inputs,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save activity");
      onSave(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl font-serif overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Log Activity</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">Date</label>
            <input name="date" value={form.date} onChange={handleChange} type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">Activity Type</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Planting</option>
              <option>Fertilizing</option>
              <option>Weeding</option>
              <option>Irrigation</option>
              <option>Pest Control</option>
              <option>Feeding</option>
              <option>Harvesting</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">Farm</label>
            <select name="farmId" value={form.farmId} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              {farms.length === 0 ? (
                <option value="">No farms available</option>
              ) : (
                farms.map((f) => <option key={f._id} value={f._id}>{f.name}</option>)
              )}
            </select>
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">Employee</label>
            <select name="employeeId" value={form.employeeId} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              {employees.length === 0 ? (
                <option value="">No employees available</option>
              ) : (
                employees.map((e) => <option key={e._id} value={e._id}>{e.name}</option>)
              )}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Describe the activity carried out..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Input Used <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input name="inputName" value={form.inputName} onChange={handleChange}
                type="text" placeholder="e.g. NPK Fertilizer"
                className="col-span-1 px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
              <input name="inputQty" value={form.inputQty} onChange={handleChange}
                type="number" placeholder="Qty"
                className="px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
              <input name="inputUnit" value={form.inputUnit} onChange={handleChange}
                type="text" placeholder="Unit (kg, L)"
                className="px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
            </div>
          </div>
        </div>

        {error && <p className="px-6 pb-2 text-sm text-red-500 font-sans">{error}</p>}

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="text-sm font-sans font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex items-center gap-2 text-sm font-sans font-medium px-5 py-2.5 rounded-lg bg-[#1e1a14] text-white hover:bg-[#2a241c] disabled:opacity-50">
            <Check size={16} />
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

const typeColor = (type) => {
  const map = {
    Planting:     "bg-green-100 text-green-700",
    Fertilizing:  "bg-yellow-100 text-yellow-700",
    Weeding:      "bg-orange-100 text-orange-700",
    Irrigation:   "bg-blue-100 text-blue-700",
    "Pest Control": "bg-red-100 text-red-700",
    Feeding:      "bg-purple-100 text-purple-700",
    Harvesting:   "bg-emerald-100 text-emerald-700",
    Other:        "bg-gray-100 text-gray-600",
  };
  return map[type] || "bg-gray-100 text-gray-600";
};

const AdminActivities = () => {
  const [showModal, setShowModal]           = useState(false);
  const [activities, setActivities]         = useState([]);
  const [farms, setFarms]                   = useState([]);
  const [employees, setEmployees]           = useState([]);
  const [loadingActivities, setLoading]     = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actRes, farmRes, empRes] = await Promise.all([
          fetch(`${API}/activities`, { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API}/farms`,      { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API}/employees`,  { headers: { Authorization: `Bearer ${getToken()}` } }),
        ]);
        const actData  = await actRes.json();
        const farmData = await farmRes.json();
        const empData  = await empRes.json();
        if (Array.isArray(actData))  setActivities(actData);
        if (Array.isArray(farmData)) setFarms(farmData);
        if (Array.isArray(empData))  setEmployees(empData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = (newActivity) => setActivities((prev) => [...prev, newActivity]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this activity log?")) return;
    try {
      await fetch(`${API}/activities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Failed to delete activity:", err);
    }
  };

  const getFarmName = (id) => farms.find((f) => f._id === id)?.name || "—";
  const getEmpName  = (id) => employees.find((e) => e._id === id)?.name || "—";

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Daily Activity Logs</h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search activities..."
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

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Activity Records</h2>
          <button onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto flex-shrink-0">
            <Plus size={18} />
            Log Activity
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden lg:grid grid-cols-[1fr_1.2fr_1fr_2fr_1.2fr_1.2fr_0.6fr] gap-4 px-6 py-3 bg-[#f7f4ee] border-b border-gray-100">
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">Date</span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">Farm</span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">Type</span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">Description</span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">Employee</span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">Inputs</span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase text-right">Actions</span>
          </div>

          {loadingActivities ? (
            <div className="px-6 py-16 text-center text-gray-400 font-sans text-sm">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-500 font-sans text-sm">
              No activity logs yet. Use "Log Activity" to add your first record.
            </div>
          ) : (
            activities.map((act, i) => (
              <div key={act._id}
                className={`grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr_2fr_1.2fr_1.2fr_0.6fr] gap-2 lg:gap-4 px-6 py-4 lg:items-center
                  ${i !== activities.length - 1 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm font-sans text-gray-700">
                  <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">Date:</span>
                  {act.date ? new Date(act.date).toLocaleDateString() : "—"}
                </span>
                <span className="text-sm font-sans text-gray-700">
                  <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">Farm:</span>
                  {getFarmName(act.farmId)}
                </span>
                <div>
                  <span className={`text-xs font-sans font-semibold px-3 py-1 rounded-full ${typeColor(act.type)}`}>
                    {act.type}
                  </span>
                </div>
                <span className="text-sm font-sans text-gray-700">
                  <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2 block">Description:</span>
                  {act.description || "—"}
                </span>
                <span className="text-sm font-sans text-gray-700">
                  <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">Employee:</span>
                  {getEmpName(act.employeeId)}
                </span>
                <span className="text-sm font-sans text-gray-700">
                  <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">Inputs:</span>
                  {act.inputs?.length > 0
                    ? `${act.inputs[0].name} (${act.inputs[0].qty} ${act.inputs[0].unit})`
                    : "None"}
                </span>
                <div className="lg:text-right">
                  <button onClick={() => handleDelete(act._id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <AddActivityModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          farms={farms}
          employees={employees}
        />
      )}
    </div>
  );
};

export default AdminActivities;