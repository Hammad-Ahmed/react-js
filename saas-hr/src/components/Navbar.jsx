// src/components/Navbar.jsx
import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="flex justify-between items-center bg-indigo-700 text-white p-4 rounded-lg shadow">
      <h1 className="text-lg font-semibold">SaaS Leave Manager</h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="font-medium">
            {user.name} <span
            className={`px-2 py-1 text-xs rounded ${
                user.role === "Manager"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
            >
            {user.role}
            </span>
          </span>
          <button
            onClick={onLogout}
            className="bg-white text-indigo-700 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
