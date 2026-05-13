import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { taskReducer } from "./taskReducer";
import type { TaskState, TaskAction } from "./taskReducer";
import type { Task } from "../types/task";

interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "tasks_data";

const initialState: TaskState = { tasks: [] };

const initializer = (initialValue: TaskState): TaskState => {
  const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTasks) {
    try {
      return { tasks: JSON.parse(savedTasks) };
    } catch (e) {
      console.error("Failed to parse tasks from local storage", e);
    }
  }
  return initialValue;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <TaskContext.Provider
      value={{ state, dispatch, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
