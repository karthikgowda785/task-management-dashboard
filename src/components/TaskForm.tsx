import React, { useState, useEffect } from "react";
import type { Task } from "../types/task";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (task: Omit<Task, "id" | "createdAt"> | Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [status, setStatus] = useState<Task["status"]>(
    initialData?.status || "Pending",
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {},
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { title?: string; dueDate?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate,
      };

      if (initialData) {
        onSubmit({ ...initialData, ...taskData });
      } else {
        onSubmit(taskData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="title"
        >
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Task title"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Task description (optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="dueDate"
          >
            Due Date *
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
