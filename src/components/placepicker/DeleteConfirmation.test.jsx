import { render, screen, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import DeleteConfirmation from "./DeleteConfirmation";

describe("DeleteConfirmation", () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders confirmation dialog with correct text and buttons", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("Do you really want to remove this place?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /No/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Yes/i })).toBeInTheDocument();
  });

  it("calls onCancel when 'No' button is clicked", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    const noButton = screen.getByRole("button", { name: /No/i });
    noButton.click();

    expect(mockOnCancel).toHaveBeenCalledOnce();
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("calls onConfirm when 'Yes' button is clicked", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    const yesButton = screen.getByRole("button", { name: /Yes/i });
    yesButton.click();

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("calls onConfirm automatically after 3000ms", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    expect(mockOnConfirm).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it("does not call onConfirm before 3000ms", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    act(() => {
      vi.advanceTimersByTime(2999);
    });

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("clears timeout on unmount", () => {
    const { unmount } = render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    unmount();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("renders ProgressBar component", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("max", "3000");
  });

  it("clicking 'Yes' button calls onConfirm immediately", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    const yesButton = screen.getByRole("button", { name: /Yes/i });
    yesButton.click();

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("clicking 'No' button does not prevent automatic confirm", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    screen.getByRole("button", { name: /No/i }).click();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnConfirm).toHaveBeenCalledOnce();
    expect(mockOnCancel).toHaveBeenCalledOnce();
  });

  it("renders with correct container ID", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    expect(document.getElementById("delete-confirmation")).toBeInTheDocument();
  });

  it("renders buttons with correct CSS classes", () => {
    render(
      <DeleteConfirmation onConfirm={mockOnConfirm} onCancel={mockOnCancel} />,
    );

    const noButton = screen.getByRole("button", { name: /No/i });
    const yesButton = screen.getByRole("button", { name: /Yes/i });

    expect(noButton).toHaveClass("button-text");
    expect(yesButton).toHaveClass("button");
  });
});
