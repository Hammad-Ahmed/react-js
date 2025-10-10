import React from "react";

const mockUsers = [
  { id: "u1", name: "Alice Employee", role: "Employee" },
  { id: "u2", name: "Bob Manager", role: "Manager" },
];

export default function Login({ onLogin }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow text-center max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-indigo-700">Mock Login</h2>
      <div className="flex flex-col gap-3">
        {mockUsers.map((u) => (
          <button
            key={u.id}
            onClick={() => onLogin(u)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          >
            {u.name} ({u.role})
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-4">
        Choose a mock user to view role-based dashboard.
      </p>
    </div>
  );
}
