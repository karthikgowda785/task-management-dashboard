import type { Task } from "../types/task";

export type TaskState = {
  tasks: Task[];
};

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_TASKS"; payload: Task[] };

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
