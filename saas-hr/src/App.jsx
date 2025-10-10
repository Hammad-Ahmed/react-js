import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import Navbar from "./components/Navbar";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);

  // Load saved user (mock persistence)
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function handleLogin(selectedUser) {
    setUser(selectedUser);
    localStorage.setItem("user", JSON.stringify(selectedUser));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto py-10 px-6 space-y-6">
        <Navbar user={user} onLogout={handleLogout} />

        {!user ? (
          <Login onLogin={handleLogin} />
        ) : user.role === "Employee" ? (
          <EmployeeDashboard user={user} />
        ) : (
          <ManagerDashboard user={user} />
        )}
      </div>
    </div>
  );
}
