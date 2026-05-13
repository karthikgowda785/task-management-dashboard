import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

const AllTasksPage = lazy(() => import("./pages/AllTasksPage"));
const CompletedTasksPage = lazy(() => import("./pages/CompletedTasksPage"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center font-bold text-xl text-blue-600">
                TaskFlow
              </div>
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  All Tasks
                </NavLink>
                <NavLink
                  to="/completed"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  Completed
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading...</div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<AllTasksPage />} />
              <Route path="/completed" element={<CompletedTasksPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
