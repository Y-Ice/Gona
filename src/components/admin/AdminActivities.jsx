import { Search, Moon, Settings, Plus, Calendar, ChevronDown, SlidersHorizontal, Trash2 } from "lucide-react";

const activities = [
  {
    date: "2024-05-17",
    farm: "Sunrise Poultry",
    type: "Feeding",
    typeColor: "bg-green-100 text-green-700",
    description: "Routine feeding and water supply for birds",
    employee: "Tunde Adeyemi",
    inputs: "100kg Poultry Feed",
  },
  {
    date: "2024-05-18",
    farm: "Green Valley Farm",
    type: "Weeding",
    typeColor: "bg-[#fdefd0] text-[#92400e]",
    description: "Manual weeding on cassava plot",
    employee: "Aisha Bello",
    inputs: "—",
  },
  {
    date: "2024-05-20",
    farm: "Green Valley Farm",
    type: "Fertilizing",
    typeColor: "bg-[#f0e8da] text-[#7a6a50]",
    description: "Applied NPK fertilizer to maize field",
    employee: "Emeka Obi",
    inputs: "50kg NPK Fertilizer",
  },
];

const AdminActivities = () => {
  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Daily Activity Logs
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search activities..."
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

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Daily Activity Logs
          </h2>
          <button className="flex items-center justify-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c] w-full sm:w-auto flex-shrink-0">
            <Plus size={18} />
            Log Activity
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden lg:grid grid-cols-[1fr_1.2fr_1fr_2fr_1.2fr_1.2fr_0.6fr] gap-4 px-6 py-3 bg-[#f7f4ee] border-b border-gray-100">
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Date
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Farm
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Type
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Description
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Employee
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase">
              Inputs
            </span>
            <span className="text-xs font-sans font-semibold text-gray-400 tracking-wider uppercase text-right">
              Actions
            </span>
          </div>

          {activities.map((act, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr_2fr_1.2fr_1.2fr_0.6fr] gap-2 lg:gap-4 px-6 py-4 lg:items-center
                ${i !== activities.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <span className="text-sm font-sans text-gray-700">
                <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">
                  Date:
                </span>
                {act.date}
              </span>
              <span className="text-sm font-sans text-gray-700">
                <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">
                  Farm:
                </span>
                {act.farm}
              </span>
              <div>
                <span
                  className={`text-xs font-sans font-semibold px-3 py-1 rounded-full ${act.typeColor}`}
                >
                  {act.type}
                </span>
              </div>
              <span className="text-sm font-sans text-gray-700">
                <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2 block">
                  Description:
                </span>
                {act.description}
              </span>
              <span className="text-sm font-sans text-gray-700">
                <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">
                  Employee:
                </span>
                {act.employee}
              </span>
              <span className="text-sm font-sans text-gray-700">
                <span className="lg:hidden text-xs text-gray-400 font-semibold uppercase mr-2">
                  Inputs:
                </span>
                {act.inputs}
              </span>
              <div className="lg:text-right">
                <button className="text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminActivities;
