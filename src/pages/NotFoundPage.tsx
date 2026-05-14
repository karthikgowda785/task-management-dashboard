import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
        404
      </h1>
      <div className="bg-blue-100 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-8">
        <p className="text-2xl font-semibold md:text-3xl text-gray-800">
          Oops! This page doesn't exist.
        </p>
        <p className="mt-4 mb-8 text-gray-500">
          The link might be broken or the page may have been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
