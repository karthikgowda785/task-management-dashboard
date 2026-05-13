import React, { useState, useMemo } from "react";
import { useTaskContext } from "../context/TaskContext";
import SummaryCards from "../components/SummaryCards";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import EmptyState from "../components/EmptyState";
import type { Task } from "../types/task";

const AllTasksPage: React.FC = () => {
  const { state, addTask, updateTask, deleteTask } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "All">(
    "All",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleOpenAddModal = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleSubmitTask = (
    taskData: Omit<Task, "id" | "createdAt"> | Task,
  ) => {
    if ("id" in taskData) {
      updateTask(taskData as Task);
    } else {
      addTask(taskData);
    }
    handleCloseModal();
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = state.tasks;

    // Filter
    if (statusFilter !== "All") {
      result = result.filter((task) => task.status === statusFilter);
    }

    // Sort
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return result;
  }, [state.tasks, statusFilter, sortOrder]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <p className="text-gray-600 mt-1">
          Manage your tasks simply and effectively.
        </p>
      </header>

      <SummaryCards tasks={state.tasks} />

      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onAddTask={handleOpenAddModal}
      />

      {filteredAndSortedTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleOpenEditModal}
              onDelete={deleteTask}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          message={
            state.tasks.length === 0
              ? "You don't have any tasks yet."
              : "No tasks match your filter."
          }
          onAction={state.tasks.length === 0 ? handleOpenAddModal : undefined}
        />
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={handleCloseModal}
        />
      </TaskModal>
    </div>
  );
};

export default AllTasksPage;
