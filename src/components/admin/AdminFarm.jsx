import { useState, useEffect } from "react";
import {
  Search,
  Settings,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  X,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getToken = () =>
  localStorage.getItem("token") || localStorage.getItem("fb_token");

function T({ text }) {
  const translated = useTranslatedText(text);
  return <>{translated}</>;
}

function getUserInitials() {
  const name = localStorage.getItem("userName") || "";
  if (!name.trim()) return "";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

function FarmModal({ onClose, onSave, existingFarm }) {
  const isEditing = !!existingFarm;
  const [form, setForm] = useState({
    name: existingFarm?.name || "",
    location: existingFarm?.location || "",
    size: existingFarm?.size || "",
    unit: existingFarm?.unit || "hectares",
    specialization: existingFarm?.specialization || "",
    status: existingFarm?.status || "Active",
    coordinates: existingFarm?.coordinates || null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);
  const [locSuccess, setLocSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support location.");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const address = data.display_name || `${latitude}, ${longitude}`;
          setForm((prev) => ({
            ...prev,
            location: address,
            coordinates: { latitude, longitude },
          }));
          setLocSuccess(true);
        } catch {
          setForm((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
            coordinates: { latitude, longitude },
          }));
          setLocSuccess(true);
        }
        setLocating(false);
      },
      () => {
        setError("Couldn't get location. Please enter it manually.");
        setLocating(false);
      },
    );
  };

  const handleSave = async () => {
    if (!form.name) {
      setError("Farm name is required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = isEditing
        ? `${API_URL}/api/farms/${existingFarm._id}`
        : `${API_URL}/api/farms`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...form, size: Number(form.size) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save farm");
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
            <T text={isEditing ? "Edit Farm" : "Add New Farm"} />
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Farm Name" />
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Green Valley Farm"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Location" />
            </label>
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={locating}
              className={`w-full mb-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-sans font-medium transition-colors ${
                locSuccess
                  ? "border-green-400 bg-green-50 text-green-700"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MapPin size={15} />
              {locating ? (
                <T text="Getting location..." />
              ) : locSuccess ? (
                <T text="Location detected!" />
              ) : (
                <T text="Use My Current Location" />
              )}
            </button>
            <p className="text-xs text-gray-400 font-sans text-center mb-2">
              — or enter manually —
            </p>
            <input
              name="location"
              value={form.location}
              onChange={(e) => {
                setLocSuccess(false);
                setForm({
                  ...form,
                  location: e.target.value,
                  coordinates: null,
                });
              }}
              type="text"
              placeholder="e.g. Ogun State, Nigeria"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Size" />
            </label>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              type="number"
              placeholder="50"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Unit" />
            </label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>hectares</option>
              <option>acres</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Specialization" />
            </label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Maize & Cassava"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Status" />
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Dormant</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="px-6 pb-2 text-sm text-red-500 font-sans">{error}</p>
        )}

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-sm font-sans font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <T text="Cancel" />
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 text-sm font-sans font-medium px-5 py-2.5 rounded-lg bg-[#1e1a14] text-white hover:bg-[#2a241c] disabled:opacity-50"
          >
            <Check size={16} />
            {loading ? (
              <T text="Saving..." />
            ) : isEditing ? (
              <T text="Update" />
            ) : (
              <T text="Save" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminFarm = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);
  const [farms, setFarms] = useState([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const userInitials = getUserInitials();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await fetch(`${API_URL}/api/farms`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setFarms(data);
      } catch (err) {
        console.error("Failed to fetch farms:", err);
      } finally {
        setLoadingFarms(false);
      }
    };
    fetchFarms();
  }, []);

  const handleSave = (farm, isEditing) => {
    if (isEditing) {
      setFarms((prev) => prev.map((f) => (f._id === farm._id ? farm : f)));
    } else {
      setFarms((prev) => [...prev, farm]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this farm?")) return;
    try {
      await fetch(`${API_URL}/api/farms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setFarms((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Failed to delete farm:", err);
    }
  };

  const handleEdit = (farm) => {
    setEditingFarm(farm);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFarm(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-row items-center justify-between gap-3 p-4 sm:p-6 pb-0">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-700 font-sans tracking-tight truncate">
          <T text="Farm Overview" />
        </h2>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to="/admin/settings">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <Settings size={18} />
            </button>
          </Link>
          {/*  updated avatar with initials */}
          <div className="w-10 h-10 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
            {userInitials}
          </div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-500 pb-4"></div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 ">
              <T text="Farm Management" />
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto"
          >
            <Plus size={18} />
            <T text="Register New Farm" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loadingFarms ? (
            <div className="col-span-full text-center text-gray-400 py-16 font-sans text-sm">
              <T text="Loading farms..." />
            </div>
          ) : farms.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
              <T text='No farms registered yet. Click "Register New Farm" to add your first farm.' />
            </div>
          ) : (
            farms.map((farm) => (
              <div
                key={farm._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {farm.name}
                    </h3>
                    <div className="flex items-center gap-3 text-gray-400 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(farm)}
                        className="hover:text-gray-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(farm._id)}
                        className="hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 font-sans mb-4">
                    <MapPin size={14} />
                    {farm.location || <T text="No location set" />}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 font-sans tracking-wide uppercase mb-1">
                        <T text="Farm Size" />
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {farm.size} {farm.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-sans tracking-wide uppercase mb-1">
                        <T text="Specialization" />
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {farm.specialization ? (
                          <T text={farm.specialization} />
                        ) : (
                          "—"
                        )}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-sans font-medium px-3 py-1 rounded-full ${farm.status === "Active" ? "bg-[#1e3a2f] text-white" : "bg-gray-500 text-white"}`}
                  >
                    <T text={farm.status} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <FarmModal
          onClose={handleCloseModal}
          onSave={handleSave}
          existingFarm={editingFarm}
        />
      )}
    </div>
  );
};

export default AdminFarm;
