import express from "express";
import { applyLeave, getPending, approveLeave } from "../services/leaveService.js";
import { users } from "../data/mockData.js";

const router = express.Router();

// Employee applies for leave
router.post("/apply", (req, res) => {
  try {
    const { userId, fromDate, toDate, reason } = req.body;
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const reqObj = applyLeave({ userId, fromDate, toDate, reason });
    res.json({ success: true, request: reqObj });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Manager views pending
router.get("/pending", (req, res) => {
  const role = req.headers["x-user-role"];
  if (role !== "Manager") return res.status(403).json({ error: "Forbidden" });

  res.json({ success: true, pending: getPending() });
});

// Manager approves/rejects
router.post("/approve/:id", (req, res) => {
  const role = req.headers["x-user-role"];
  if (role !== "Manager") return res.status(403).json({ error: "Only Managers can approve" });

  const id = req.params.id;
  const { approve, managerId } = req.body;

  try {
    const updated = approveLeave({ id, managerId, approve });
    res.json({ success: true, request: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Monthly summary (Manager only)
router.get("/summary", (req, res) => {
  const role = req.headers["x-user-role"];
  if (role !== "Manager") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { year } = req.query; // optional query param

  try {
    const summary = getMonthlySummary(Number(year) || new Date().getFullYear());
    res.json({ success: true, summary });
  } catch (err) {
    console.error("Error in /summary:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
