import { useState } from "react";
import {
  Search,
  Settings,
  HelpCircle,
  Plus,
  Sprout,
  TrendingUp,
  Calendar,
  Scale,
  MapPin,
  X,
  SlidersHorizontal,
  Download,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const crops = [];

function AddEmployeeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl font-serif overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Add Employee</h2>
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
              Crop Name
            </label>
            <input
              type="text"
              placeholder="e.g. Maize"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Farm
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Green Valley Farm</option>
              <option>Sunrise Poultry</option>
              <option>North Orchard</option>
              <option>West Plateau</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Plant Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Harvest Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Expected Yield (kg)
            </label>
            <input
              type="number"
              placeholder="500"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Status
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Growing</option>
              <option>Harvested</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-sm font-sans font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 text-sm font-sans font-medium px-5 py-2.5 rounded-lg bg-[#1e1a14] text-white hover:bg-[#2a241c]">
            <Check size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminCrops = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Crop Management
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search heritage seeds..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-sans text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <Link to="/admin/settings">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 relative flex-shrink-0">
              <Settings size={18} />
            </button>
          </Link>
          <div className="w-10 h-10 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
            
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-gray-500 font-sans">
            Monitoring and tracking heritage crop cycles.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto flex-shrink-0"
          >
            <Plus size={18} />
            Add New Crop
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 bg-[#f0ece0]">
            <h3 className="text-lg font-semibold text-gray-800">
              Crop Registry
            </h3>
          </div>

          <div className="hidden lg:grid grid-cols-[2fr_1.3fr_2fr_1.2fr_1fr_0.8fr] gap-4 px-6 py-3 border-b border-gray-100">
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Crop Detail
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Location
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Growth Cycle
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Status
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Yield (Est)
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase text-right">
              Actions
            </span>
          </div>

          {crops.map((crop, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-[2fr_1.3fr_2fr_1.2fr_1fr_0.8fr] gap-3 lg:gap-4 px-6 py-5 lg:items-center
                ${i !== crops.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#f0ece0] flex items-center justify-center text-2xl flex-shrink-0">
                  {crop.icon}
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {crop.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-600 font-sans">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                {crop.location}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-sans font-medium text-gray-700">
                    {crop.stage}
                  </span>
                  <span className="text-sm font-sans font-semibold text-gray-700">
                    {crop.pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full ${crop.barColor}`}
                    style={{ width: `${crop.pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  {crop.harvest}
                </p>
              </div>

              <div>
                <span
                  className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full ${crop.statusColor}`}
                >
                  {crop.status}
                </span>
              </div>

              <div className="text-base font-semibold text-gray-800">
                {crop.yield}
              </div>
              {/* Actions */}
              <div className="lg:text-right">
                <button className="text-sm font-sans text-gray-400 hover:text-gray-600">
                  •••
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminCrops;
