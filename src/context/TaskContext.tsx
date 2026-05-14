import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import { taskReducer } from "./taskReducer";
import type { TaskState, TaskAction } from "./taskReducer";
import type { Task } from "../types/task";
import { getLocalDateString } from "../utils/taskHelpers";

interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "tasks_data";

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Design System Audit",
      description:
        "Review all UI components for consistency with the new brand guidelines and update the Figma library.",
      status: "Completed",
      dueDate: "2026-05-20",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "API Integration",
      description:
        "Connect the task management frontend with the backend services and implement error handling.",
      status: "In Progress",
      dueDate: "2026-05-25",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "User Interview Scripts",
      description:
        "Prepare questions for the upcoming usability testing session with the product team.",
      status: "Pending",
      dueDate: "2026-05-18",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Performance Optimization",
      description:
        "Implement React.memo and useMemo across the dashboard to ensure smooth 60fps interactions.",
      status: "Pending",
      dueDate: getLocalDateString(new Date()),
      createdAt: new Date().toISOString(),
    },
  ],
};

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

  const addTask = useCallback((taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  }, []);

  const updateTask = useCallback((task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, addTask, updateTask, deleteTask }),
    [state, addTask, updateTask, deleteTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
