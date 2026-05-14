import React, { useMemo, useState, useCallback } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types/task";

const CompletedTasksPage: React.FC = () => {
  const { state, updateTask, deleteTask } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const completedTasks = useMemo(() => {
    return state.tasks
      .filter((task) => task.status === "Completed")
      .sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
      );
  }, [state.tasks]);

  const handleOpenEditModal = useCallback((task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  }, []);

  const handleSubmitTask = useCallback(
    (taskData: Omit<Task, "id" | "createdAt"> | Task) => {
      if ("id" in taskData) {
        updateTask(taskData as Task);
      }
      handleCloseModal();
    },
    [updateTask, handleCloseModal],
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Completed Tasks</h1>
        <p className="text-gray-600 mt-1">Review your finished work.</p>
      </header>

      {completedTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleOpenEditModal}
              onDelete={deleteTask}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No completed tasks found." />
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit Task"
      >
        {useMemo(
          () => (
            <TaskForm
              initialData={editingTask}
              onSubmit={handleSubmitTask}
              onCancel={handleCloseModal}
            />
          ),
          [editingTask, handleSubmitTask, handleCloseModal],
        )}
      </TaskModal>
    </div>
  );
};

export default CompletedTasksPage;
