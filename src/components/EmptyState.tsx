import React from "react";

interface EmptyStateProps {
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No tasks found.",
  onAction,
  actionLabel = "Add Task",
}) => {
  return (
    <div className="py-12 px-4 text-center bg-white border border-dashed border-gray-300 rounded-lg shadow-sm">
      <div className="text-gray-400 mb-3">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{message}</h3>
      {onAction && (
        <>
          <p className="text-gray-500 text-sm mb-4">
            Get started by creating a new task.
          </p>
          <button
            onClick={onAction}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            {actionLabel}
          </button>
        </>
      )}
    </div>
  );
};

export default EmptyState;
