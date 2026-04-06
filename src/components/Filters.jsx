import { Search, X } from "lucide-react";
const Filters = ({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative w-full md:w-87.5">
        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-200"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <select
        className="border rounded-lg px-3 py-2 w-35 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
      </select>
      <select
        className="border rounded-lg px-3 py-2 w-35 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
};

export default Filters;
