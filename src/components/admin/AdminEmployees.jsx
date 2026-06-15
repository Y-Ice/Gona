import { useState } from "react";
import {
  Search,
  Settings,
  UserPlus,
  Phone,
  Building2,
  ListChecks,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const employees = [];

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
              Full Name
            </label>
            <input
              type="text"
              placeholder="Employee full name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Role
            </label>
            <input
              type="text"
              placeholder="e.g. Field Worker, Supervisor"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Phone
            </label>
            <input
              type="text"
              placeholder="08012345678"
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

          <div className="sm:col-span-2">
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Status
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
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

const AdminEmployees = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Employee Management
        </h1>
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
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Team Directory
            </h2>
            <p className="text-sm text-gray-500 font-sans">
              Manage workforce allocation across Green Valley sectors.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto flex-shrink-0"
          >
            <UserPlus size={18} />
            Add Employee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {employees.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
              No employees have been added yet. Use "Add Employee" to build your
              team.
            </div>
          ) : (
            employees.map((emp, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1e3a2f] flex items-center justify-center text-white text-sm font-semibold font-sans flex-shrink-0">
                    {emp.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                      {emp.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-sans italic truncate">
                      {emp.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <Phone size={15} className="text-gray-400 flex-shrink-0" />
                    {emp.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <Building2
                      size={15}
                      className="text-gray-400 flex-shrink-0"
                    />
                    {emp.farm}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <ListChecks
                      size={15}
                      className="text-gray-400 flex-shrink-0"
                    />
                    {emp.activities} activities logged
                  </div>
                </div>

                <hr className="border-gray-100 mb-4" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700">
                    {emp.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                      <Pencil size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminEmployees;
