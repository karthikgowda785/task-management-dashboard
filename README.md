# Task Management Dashboard

A simple and responsive task management application built with React, TypeScript, and Vite. This project allows users to organize their daily tasks, track progress, and persist data locally.

## Features

- **Task CRUD**: Create, view, edit, and delete tasks.
- **Status Tracking**: Categorize tasks as Pending, In Progress, or Completed.
- **Filtering & Sorting**: Filter tasks by their current status and sort them by due date.
- **Data Persistence**: Tasks are saved to the browser's local storage so they remain available after a page refresh.
- **Responsive Design**: A clean, mobile-friendly interface built using Tailwind CSS.
- **State Management**: Uses React Context API and `useReducer` for consistent global state handling.

## Tech Stack

- **Frontend**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components`: Reusable UI components (Modals, Cards, Forms).
- `src/context`: State management logic using Context API.
- `src/pages`: Main view components (All Tasks, Completed Tasks).
- `src/types`: TypeScript interfaces and type definitions.
- `src/utils`: Helper functions for task management.
