import { useState, useEffect } from "react";
import {
  Search,
  Settings,
  Plus,
  MapPin,
  X,
  Check,
  Pencil,
  Trash2,
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

function CropModal({ onClose, onSave, farms, existingCrop }) {
  const isEditing = !!existingCrop;
  const [form, setForm] = useState({
    name: existingCrop?.name || "",
    farmId: existingCrop?.farmId || farms[0]?._id || "",
    plantDate: existingCrop?.plantDate
      ? existingCrop.plantDate.slice(0, 10)
      : "",
    harvestDate: existingCrop?.harvestDate
      ? existingCrop.harvestDate.slice(0, 10)
      : "",
    expectedYield: existingCrop?.expectedYield || "",
    status: existingCrop?.status || "Growing",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.name) {
      setError("Crop name is required.");
      return;
    }
    if (!form.farmId) {
      setError("Please select a farm.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = isEditing
        ? `${API_URL}/api/crops/${existingCrop._id}`
        : `${API_URL}/api/crops`;
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          ...form,
          expectedYield: Number(form.expectedYield),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save crop");
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
            <T text={isEditing ? "Edit Crop" : "Add New Crop"} />
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
              <T text="Crop Name" />
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Maize"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Farm" />
            </label>
            <select
              name="farmId"
              value={form.farmId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {farms.length === 0 ? (
                <option value="">No farms available</option>
              ) : (
                farms.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Plant Date" />
            </label>
            <input
              name="plantDate"
              value={form.plantDate}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Harvest Date" />
            </label>
            <input
              name="harvestDate"
              value={form.harvestDate}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Expected Yield" />
            </label>
            <input
              name="expectedYield"
              value={form.expectedYield}
              onChange={handleChange}
              type="number"
              placeholder="500"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              <T text="Status" />
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>Growing</option>
              <option>Harvested</option>
              <option>Failed</option>
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

const statusColor = (status) => {
  if (status === "Growing") return "bg-green-100 text-green-700";
  if (status === "Harvested") return "bg-blue-100 text-blue-700";
  if (status === "Failed") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

const AdminCrops = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const userInitials = getUserInitials(); // 👈 added

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cropsRes, farmsRes] = await Promise.all([
          fetch(`${API_URL}/api/crops`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
          fetch(`${API_URL}/api/farms`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
        ]);
        const cropsData = await cropsRes.json();
        const farmsData = await farmsRes.json();
        if (Array.isArray(cropsData)) setCrops(cropsData);
        if (Array.isArray(farmsData)) setFarms(farmsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoadingCrops(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = (crop, isEditing) => {
    if (isEditing) {
      setCrops((prev) => prev.map((c) => (c._id === crop._id ? crop : c)));
    } else {
      setCrops((prev) => [...prev, crop]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this crop?")) return;
    try {
      await fetch(`${API_URL}/api/crops/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setCrops((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete crop:", err);
    }
  };

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCrop(null);
  };

  const getFarmName = (farmId) =>
    farms.find((f) => f._id === farmId)?.name || "Unknown Farm";

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-row items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-3xl text-gray-700 font-sans font-bold tracking-tight">
          <T text="Crop Management" />
        </h1>
        <div className="flex items-center gap-3">
          <Link to="/admin/settings">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <Settings size={18} />
            </button>
          </Link>
          {/* updated avatar with initials */}
          <div className="w-10 h-10 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
            {userInitials}
          </div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-500 pb-4"></div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-gray-500 font-sans">
            <T text="Monitoring and tracking farm crop cycles." />
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto flex-shrink-0"
          >
            <Plus size={18} />
            <T text="Add New Crop" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 bg-[#f0ece0]">
            <h3 className="text-lg font-semibold text-gray-800">
              <T text="Crop Registry" />
            </h3>
          </div>

          <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1fr_0.8fr] gap-4 px-6 py-3 border-b border-gray-100">
            {[
              "Crop",
              "Farm",
              "Plant Date",
              "Status",
              "Yield (kg)",
              "Actions",
            ].map((col) => (
              <span
                key={col}
                className={`text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase ${col === "Actions" ? "text-right" : ""}`}
              >
                <T text={col} />
              </span>
            ))}
          </div>

          {loadingCrops ? (
            <div className="px-6 py-16 text-center text-gray-400 font-sans text-sm">
              <T text="Loading crops..." />
            </div>
          ) : crops.length === 0 ? (
            <div className="px-6 py-16 text-center text-gray-400 font-sans text-sm">
              <T text='No crops added yet. Click "Add New Crop" to get started.' />
            </div>
          ) : (
            crops.map((crop, i) => (
              <div
                key={crop._id}
                className={`grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_1.5fr_1.2fr_1fr_0.8fr] gap-3 lg:gap-4 px-6 py-5 lg:items-center
                  ${i !== crops.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f0ece0] flex items-center justify-center text-lg flex-shrink-0">
                    🌱
                  </div>
                  <p className="text-base font-semibold text-gray-800">
                    <T text={crop.name} />
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-600 font-sans">
                  <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                  {getFarmName(crop.farmId)}
                </div>

                <div className="text-sm text-gray-600 font-sans">
                  {crop.plantDate
                    ? new Date(crop.plantDate).toLocaleDateString()
                    : "—"}
                </div>

                <div>
                  <span
                    className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full ${statusColor(crop.status)}`}
                  >
                    <T text={crop.status} />
                  </span>
                </div>

                <div className="text-base font-semibold text-gray-800">
                  {crop.expectedYield ? `${crop.expectedYield} kg` : "—"}
                </div>

                <div className="lg:text-right flex lg:justify-end items-center gap-3 text-gray-400">
                  <button
                    onClick={() => handleEdit(crop)}
                    className="hover:text-gray-600"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(crop._id)}
                    className="hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <CropModal
          onClose={handleCloseModal}
          onSave={handleSave}
          farms={farms}
          existingCrop={editingCrop}
        />
      )}
    </div>
  );
};

export default AdminCrops;
