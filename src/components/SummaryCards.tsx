import React, { useMemo } from "react";
import type { Task } from "../types/task";

interface SummaryCardsProps {
  tasks: Task[];
}

const SummaryCards: React.FC<SummaryCardsProps> = React.memo(({ tasks }) => {
  const summary = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc.total += 1;
        if (task.status === "Pending") acc.pending += 1;
        else if (task.status === "In Progress") acc.inProgress += 1;
        else if (task.status === "Completed") acc.completed += 1;
        return acc;
      },
      { total: 0, pending: 0, inProgress: 0, completed: 0 },
    );
  }, [tasks]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center">
        <span className="text-gray-500 text-sm font-medium mb-1">
          Total Tasks
        </span>
        <span className="text-2xl font-bold text-gray-800">
          {summary?.total}
        </span>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-100 flex flex-col items-center justify-center">
        <span className="text-yellow-700 text-sm font-medium mb-1">
          Pending
        </span>
        <span className="text-2xl font-bold text-yellow-800">
          {summary?.pending}
        </span>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100 flex flex-col items-center justify-center">
        <span className="text-blue-700 text-sm font-medium mb-1">
          In Progress
        </span>
        <span className="text-2xl font-bold text-blue-800">
          {summary?.inProgress}
        </span>
      </div>
      <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100 flex flex-col items-center justify-center">
        <span className="text-green-700 text-sm font-medium mb-1">
          Completed
        </span>
        <span className="text-2xl font-bold text-green-800">
          {summary?.completed}
        </span>
      </div>
    </div>
  );
});

export default SummaryCards;
