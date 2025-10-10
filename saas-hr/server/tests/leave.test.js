import { describe, it, expect, beforeEach } from "vitest";
import { applyLeave } from "../services/leaveService.js";
import { leaveRequests, leaveBalances } from "../data/mockData.js";

describe("applyLeave()", () => {
  beforeEach(() => {
    // Reset mock data before each test
    leaveRequests.length = 0;
    leaveBalances.u1 = 10;
  });

  it("should throw error if from date is in the past", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 2);
    expect(() =>
      applyLeave({
        userId: "u1",
        fromDate: pastDate.toISOString(),
        toDate: new Date().toISOString(),
        reason: "Vacation",
      })
    ).toThrow("From date cannot be in the past");
  });

  it("should add leave request if valid", () => {
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 2);

    const req = applyLeave({
      userId: "u1",
      fromDate: from.toISOString(),
      toDate: to.toISOString(),
      reason: "Trip",
    });

    expect(req.status).toBe("Pending");
    expect(leaveRequests.length).toBe(1);
  });
});
