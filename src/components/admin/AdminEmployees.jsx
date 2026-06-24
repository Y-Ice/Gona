import { useState, useEffect } from "react";
import {
  Search, Settings, UserPlus, Phone, Building2,
  Pencil, Trash2, X, Check, Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getToken = () => localStorage.getItem("token") || localStorage.getItem("fb_token");

function T({ text }) {
  const translated = useTranslatedText(text);
  return <>{translated}</>;
}

function EmployeeModal({ onClose, onSave, farms, existingEmployee }) {
  const isEditing = !!existingEmployee;
  const [form, setForm] = useState({
    name: existingEmployee?.name || "",
    role: existingEmployee?.role || "",
    phone: existingEmployee?.phone || "",
    email: existingEmployee?.email || "",
    farmId: existingEmployee?.farmId || farms[0]?._id || "",
    status: existingEmployee?.status || "Active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.name) { setError("Employee name is required."); return; }
    setLoading(true);
    setError("");
    try {
      const url = isEditing ? `${API_URL}/api/employees/${existingEmployee._id}` : `${API_URL}/api/employees`;
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save employee");
      onSave(data, isEditing);
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
          <h2 className="text-xl font-semibold text-gray-800">
            <T text={isEditing ? "Edit Employee" : "Add Employee"} />
          </h2>
          <button onClick={onClose} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Full Name" />
            </label>
            <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Employee full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Role" />
            </label>
            <input name="role" value={form.role} onChange={handleChange} type="text" placeholder="e.g. Field Worker, Supervisor"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Phone" />
            </label>
            <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder="08012345678"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Email" />
            </label>
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="employee@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200" />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Farm" />
            </label>
            <select name="farmId" value={form.farmId} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              {farms.length === 0 ? (
                <option value="">No farms available</option>
              ) : (
                farms.map((f) => (
                  <option key={f._id} value={f._id}>{f.name}</option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Status" />
            </label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {error && <p className="px-6 pb-2 text-sm text-red-500 font-sans">{error}</p>}

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="text-sm font-sans font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
            <T text="Cancel" />
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex items-center gap-2 text-sm font-sans font-medium px-5 py-2.5 rounded-lg bg-[#1e1a14] text-white hover:bg-[#2a241c] disabled:opacity-50">
            <Check size={16} />
            {loading ? <T text="Saving..." /> : isEditing ? <T text="Update" /> : <T text="Save" />}
          </button>
        </div>
      </div>
    </div>
  );
}

const statusColor = (status) => {
  if (status === "Active")   return "bg-green-100 text-green-700";
  if (status === "On Leave") return "bg-yellow-100 text-yellow-700";
  if (status === "Inactive") return "bg-gray-100 text-gray-500";
  return "bg-gray-100 text-gray-500";
};

const getInitials = (name) =>
  name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "??";

const AdminEmployees = () => {
  const [showModal, setShowModal]           = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees]           = useState([]);
  const [farms, setFarms]                   = useState([]);
  const [loadingEmps, setLoadingEmps]       = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, farmRes] = await Promise.all([
          fetch(`${API_URL}/api/employees`, { headers: { Authorization: `Bearer ${getToken()}` } }),
          fetch(`${API_URL}/api/farms`,     { headers: { Authorization: `Bearer ${getToken()}` } }),
        ]);
        const empData  = await empRes.json();
        const farmData = await farmRes.json();
        if (Array.isArray(empData))  setEmployees(empData);
        if (Array.isArray(farmData)) setFarms(farmData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoadingEmps(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = (emp, isEditing) => {
    if (isEditing) {
      setEmployees((prev) => prev.map((e) => e._id === emp._id ? emp : e));
    } else {
      setEmployees((prev) => [...prev, emp]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this employee?")) return;
    try {
      await fetch(`${API_URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  const getFarmName = (farmId) => farms.find((f) => f._id === farmId)?.name || "No Farm";

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-3xl text-gray-700 font-sans font-bold tracking-tight">
          <T text="Employee Management" />
        </h1>
        <div className="flex items-center gap-3">
          <Link to="/admin/settings">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <Settings size={18} />
            </button>
          </Link>
          <div className="w-10 h-10 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0"></div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-500 pb-4"></div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              <T text="Team Directory" />
            </h2>
            <p className="text-sm text-gray-500 font-sans">
              <T text="Manage workforce allocation across all farm sectors." />
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto flex-shrink-0"
          >
            <UserPlus size={18} />
            <T text="Add Employee" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loadingEmps ? (
            <div className="col-span-full text-center text-gray-400 py-16 font-sans text-sm">
              <T text="Loading employees..." />
            </div>
          ) : employees.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
              <T text='No employees added yet. Use "Add Employee" to build your team.' />
            </div>
          ) : (
            employees.map((emp) => (
              <div
                key={emp._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
                    {getInitials(emp.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                      {emp.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-sans italic truncate">
                      {emp.role ? (
                        <T text={emp.role} />
                      ) : (
                        <T text="No role set" />
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <Phone size={15} className="text-gray-400 flex-shrink-0" />
                    {emp.phone || <T text="No phone" />}
                  </div>
                  {emp.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                      <Mail size={15} className="text-gray-400 flex-shrink-0" />
                      {emp.email}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <Building2
                      size={15}
                      className="text-gray-400 flex-shrink-0"
                    />
                    {getFarmName(emp.farmId)}
                  </div>
                </div>

                <hr className="border-gray-100 mb-4" />

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full ${statusColor(emp.status)}`}
                  >
                    <T text={emp.status} />
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <EmployeeModal
          onClose={handleCloseModal}
          onSave={handleSave}
          farms={farms}
          existingEmployee={editingEmployee}
        />
      )}
    </div>
  );
};

export default AdminEmployees;