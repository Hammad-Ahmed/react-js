import { parseISO, getMonth, getYear, isBefore, differenceInCalendarDays, isEqual } from "date-fns";
import { leaveRequests, leaveBalances } from "../data/mockData.js";
import { v4 as uuid } from "uuid";

function parseDate(d) {
  return parseISO(d);
}

function hasOverlap(userId, from, to) {
  const fromD = parseDate(from);
  const toD = parseDate(to);
  return leaveRequests.some(r => {
    if (r.userId !== userId || r.status === "Rejected") return false;
    const rFrom = parseDate(r.fromDate);
    const rTo = parseDate(r.toDate);
    return !(isBefore(toD, rFrom) || isBefore(rTo, fromD)); // overlap
  });
}

function daysBetweenInclusive(from, to) {
  return differenceInCalendarDays(parseDate(to), parseDate(from)) + 1;
}

export function applyLeave({ userId, fromDate, toDate, reason }) {
  const f = parseDate(fromDate);
  const t = parseDate(toDate);
  const today = new Date();

  if (isBefore(f, today) && !isEqual(f, today)) {
    throw new Error("From date cannot be in the past");
  }
  if (isBefore(t, f)) throw new Error("To date cannot be before From date");
  if (hasOverlap(userId, fromDate, toDate)) throw new Error("Overlapping leave exists");

  const days = daysBetweenInclusive(fromDate, toDate);
  const request = {
    id: uuid(),
    userId,
    fromDate,
    toDate,
    days,
    reason,
    status: "Pending",
    createdAt: new Date().toISOString(),
    approvedBy: null
  };
  leaveRequests.push(request);
  return request;
}

export function getPending() {
  return leaveRequests.filter(r => r.status === "Pending");
}

export function approveLeave({ id, managerId, approve }) {
  const idx = leaveRequests.findIndex(r => r.id === id);
  if (idx === -1) throw new Error("Request not found");
  const req = leaveRequests[idx];
  if (req.status !== "Pending") throw new Error("Request already processed");

  const balance = leaveBalances[req.userId] ?? 0;
  if (approve && balance < req.days) throw new Error("Insufficient leave balance");

  req.status = approve ? "Approved" : "Rejected";
  req.approvedBy = managerId;
  req.processedAt = new Date().toISOString();

  if (approve) leaveBalances[req.userId] = balance - req.days;
  leaveRequests[idx] = req;
  return req;
}

export function getMonthlySummary(year = new Date().getFullYear()) {
  const summary = {};

  for (const req of leaveRequests) {
    if (req.status !== "Approved") continue;

    const reqYear = getYear(parseISO(req.fromDate));
    if (reqYear !== year) continue; // only current year's requests

    const month = getMonth(parseISO(req.fromDate)) + 1; // 1–12
    const userId = req.userId;

    if (!summary[userId]) summary[userId] = {};
    if (!summary[userId][month]) summary[userId][month] = 0;

    summary[userId][month] += req.days;
  }

  return summary;
}
