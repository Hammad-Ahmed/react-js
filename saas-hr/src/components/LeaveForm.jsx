import React, { useState } from "react";
import API from "../api";

export default function LeaveForm({ user, onApplied }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setMessage(null);

    if (new Date(fromDate) < new Date()) {
      setMessage({ type: "error", text: "From date cannot be in the past" });
      return;
    }
    if (new Date(toDate) < new Date(fromDate)) {
      setMessage({ type: "error", text: "To date cannot be before from date" });
      return;
    }

    try {
      const res = await API.post("/leave/apply", {
        userId: user.id,
        fromDate,
        toDate,
        reason,
      });
      setMessage({ type: "success", text: "Leave applied successfully!" });
      setFromDate("");
      setToDate("");
      setReason("");
      onApplied && onApplied(res.data.request);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to apply leave",
      });
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded-lg shadow space-y-4 mt-4"
    >
      <h3 className="text-lg font-semibold text-indigo-600">
        Apply for Leave
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional"
          className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
      >
        Submit
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
