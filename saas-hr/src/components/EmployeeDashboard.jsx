import React from "react";
import LeaveForm from "./LeaveForm";

export default function EmployeeDashboard({ user }) {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <LeaveForm user={user} />
    </div>
  );
}
