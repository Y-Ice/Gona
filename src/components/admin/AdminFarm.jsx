import { useState } from "react";
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

const farms = [];

function AddFarmModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl font-serif overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Add New Farm</h2>
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
              Farm Name
            </label>
            <input
              type="text"
              placeholder="e.g. Green Valley Farm"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Ogun State, Nigeria"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Size
            </label>
            <input
              type="number"
              placeholder="50"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Unit
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>hectares</option>
              <option>acres</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Specialization
            </label>
            <input
              type="text"
              placeholder="e.g. Maize & Cassava"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Status
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Active</option>
              <option>Inactive</option>
              <option>Dormant</option>
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

const AdminFarm = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 pb-0">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search estates, assets..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-sans text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto sm:ml-4">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <Settings size={18} />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
            JS
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-sans font-semibold text-[#c47a0a] tracking-widest uppercase mb-1">
              Heritage Estate
            </p>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Farm Management
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto"
          >
            <Plus size={18} />
            Register New Farm
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {farms.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
              No farms are registered yet. Click "Register New Farm" to add your first farm.
            </div>
          ) : (
            farms.map((farm, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative h-44">
                  <img
                    src={farm.img}
                    alt={farm.name}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs font-sans font-medium px-3 py-1 rounded-full
                    ${farm.status === "Active" ? "bg-[#1e3a2f] text-white" : "bg-gray-500 text-white"}`}
                  >
                    {farm.status}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {farm.name}
                    </h3>
                    <div className="flex items-center gap-3 text-gray-400 flex-shrink-0">
                      <button className="hover:text-gray-600">
                        <Pencil size={16} />
                      </button>
                      <button className="hover:text-gray-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 font-sans mb-4">
                    <MapPin size={14} />
                    {farm.location}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 font-sans tracking-wide uppercase mb-1">
                        Farm Size
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {farm.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-sans tracking-wide uppercase mb-1">
                        Active Crops
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {farm.crops}
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-sans font-medium text-[#c47a0a] hover:underline">
                    View Farm Details →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && <AddFarmModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminFarm;
