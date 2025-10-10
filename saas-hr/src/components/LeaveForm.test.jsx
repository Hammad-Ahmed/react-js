import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeaveForm from "./LeaveForm";
import API from "../api";
import { vi } from "vitest";

// Mock API
vi.mock("../api", () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { request: { id: "1" } } })),
  },
}));

describe("<LeaveForm />", () => {
  it("should show error if from date is in the past", async () => {
    render(<LeaveForm user={{ id: "u1" }} />);
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    fireEvent.change(screen.getByLabelText(/From/i), {
      target: { value: pastDate.toISOString().split("T")[0] },
    });
    fireEvent.change(screen.getByLabelText(/To/i), {
      target: { value: new Date().toISOString().split("T")[0] },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/From date cannot be in the past/i)).toBeInTheDocument();
    });
  });

  it("should show success message after submission", async () => {
    render(<LeaveForm user={{ id: "u1" }} />);
    const from = new Date();
    from.setDate(from.getDate() + 1);
    const to = new Date();
    to.setDate(to.getDate() + 3);

    fireEvent.change(screen.getByLabelText(/From/i), {
      target: { value: from.toISOString().split("T")[0] },
    });
    fireEvent.change(screen.getByLabelText(/To/i), {
      target: { value: to.toISOString().split("T")[0] },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Leave applied successfully/i)).toBeInTheDocument();
    });
  });
});
