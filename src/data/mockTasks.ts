import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Setup Project Repository",
    description:
      "Initialize a new React project with Vite, TypeScript, and Tailwind CSS.",
    status: "Completed",
    dueDate: "2026-05-12",
    createdAt: "2026-05-11T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Create Task Component",
    description: "Build a reusable TaskCard component to display task details.",
    status: "In Progress",
    dueDate: "2026-05-14",
    createdAt: "2026-05-12T14:30:00.000Z",
  },
  {
    id: "3",
    title: "Implement State Management",
    description:
      "Use React Context API and useReducer to manage global task state.",
    status: "Pending",
    dueDate: "2026-05-15",
    createdAt: "2026-05-13T09:15:00.000Z",
  },
];
