import React from "react";
import type { Task } from "../types/task";

interface FilterBarProps {
  statusFilter: Task["status"] | "All";
  setStatusFilter: (status: Task["status"] | "All") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  onAddTask: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
  onAddTask,
}) => {
  return (
    <div className="sticky top-18 z-10 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Filter Status:
          </p>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as Task["status"] | "All")
            }
            className="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by Due Date:
          </p>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="p-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="asc">Earliest First</option>
            <option value="desc">Latest First</option>
          </select>
        </div>
      </div>

      <button
        onClick={onAddTask}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        + Add New Task
      </button>
    </div>
  );
};

export default FilterBar;
