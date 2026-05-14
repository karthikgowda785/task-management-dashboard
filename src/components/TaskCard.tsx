import React, { useState } from "react";
import type { Task } from "../types/task";
import { getStatusColor } from "../utils/taskHelpers";
import TaskModal from "./TaskModal";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onEdit, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    onDelete(task.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col h-full hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-lg font-semibold text-gray-800 line-clamp-1 max-w-[150px]"
            title={task?.title}
          >
            {task?.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}
          >
            {task?.status}
          </span>
        </div>
        <p
          className="text-gray-600 text-sm mb-4 grow line-clamp-3"
          title={task?.description}
        >
          {task?.description || "No description provided."}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Due: <span className="font-medium">{task?.dueDate}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Task"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete the task{" "}
            <strong>"{task?.title}"</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </TaskModal>
    </>
  );
});

export default TaskCard;
