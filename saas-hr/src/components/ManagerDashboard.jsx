import React, { useState, useEffect } from "react";
import API from "../api";

export default function ManagerDashboard({ user }) {
  const [pending, setPending] = useState([]);
  const [message, setMessage] = useState(null);
  const [summary, setSummary] = useState(null);

  async function fetchPending() {
    try {
      const res = await API.get("/leave/pending", {
        headers: { "x-user-role": user.role },
      });
      setPending(res.data.pending);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to fetch requests",
      });
    }
  }

  async function handleDecision(id, approve) {
    try {
      await API.post(
        `/leave/approve/${id}`,
        { approve, managerId: user.id },
        { headers: { "x-user-role": user.role } }
      );
      setMessage({
        type: "success",
        text: `Request ${approve ? "approved" : "rejected"}`,
      });
      fetchPending();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to update request",
      });
    }
  }

    async function fetchSummary() {
        const res = await API.get("/leave/summary", {
            headers: { "x-user-role": user.role },
        });
        console.log(res.data.summary);
        setSummary(res.data.summary);
    }


  useEffect(() => {
    fetchPending();
    fetchSummary();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Manager Dashboard</h2>

      {message && (
        <p
          className={`text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        onClick={fetchPending}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Refresh
      </button>

      <div className="grid gap-4">
        {pending.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          pending.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-medium text-gray-800">
                <strong>User:</strong> {r.userId}
              </p>
              <p>
                <strong>Dates:</strong> {r.fromDate} → {r.toDate} ({r.days} days)
              </p>
              <p>
                <strong>Reason:</strong> {r.reason || "-"}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleDecision(r.id, true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(r.id, false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {summary && (
        <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h3 className="text-lg font-semibold mb-2">Monthly Summary</h3>
            <ul className="space-y-2">
            {Object.entries(summary).map(([userId, months]) => (
                <li key={userId}>
                <strong>{userId}</strong>:{" "}
                {Object.entries(months).map(([month, days]) => (
                    <span key={month} className="mr-2">
                    {month} → {days} days
                    </span>
                ))}
                </li>
            ))}
            </ul>
        </div>
        )}

    </div>
  );
}
