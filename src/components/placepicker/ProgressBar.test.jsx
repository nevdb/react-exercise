import { render, screen, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("renders with initial value equal to timer", () => {
    const timer = 1000;
    render(<ProgressBar timer={timer} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", timer.toString());
    expect(progress).toHaveAttribute("max", timer.toString());
  });

  it("decreases value every 10ms by 10 until reaching 0", () => {
    const timer = 100; // 1 second, decreases in 10 steps
    render(<ProgressBar timer={timer} />);
    const progress = screen.getByRole("progressbar");

    // Initial
    expect(progress).toHaveAttribute("value", "100");

    // After 10ms
    act(() => vi.advanceTimersByTime(10));
    expect(progress).toHaveAttribute("value", "90");

    // After another 10ms
    act(() => vi.advanceTimersByTime(10));
    expect(progress).toHaveAttribute("value", "80");

    // Continue until 0
    act(() => vi.advanceTimersByTime(80)); // 8 more steps: 80 - 10*8 = 0
    expect(progress).toHaveAttribute("value", "0");

    // After more time, stays at 0
    act(() => vi.advanceTimersByTime(50));
    expect(progress).toHaveAttribute("value", "0");
  });

  it("handles timer = 0 correctly", () => {
    render(<ProgressBar timer={0} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "0");
    expect(progress).toHaveAttribute("max", "0");

    // Even after time, stays 0
    act(() => vi.advanceTimersByTime(100));
    expect(progress).toHaveAttribute("value", "0");
  });

  it("handles negative timer (edge case)", () => {
    const timer = -100;
    render(<ProgressBar timer={timer} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "-100");
    expect(progress).toHaveAttribute("max", "-100");

    // Negative timers are clamped to 0 after any decrement
    act(() => vi.advanceTimersByTime(10));
    expect(progress).toHaveAttribute("value", "0");
  });

  it("handles very large timer", () => {
    const timer = 1000000;
    render(<ProgressBar timer={timer} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "1000000");

    act(() => vi.advanceTimersByTime(10));
    expect(progress).toHaveAttribute("value", "999990");
  });

  it("clears interval on unmount", () => {
    const timer = 1000;
    const { unmount } = render(<ProgressBar timer={timer} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "1000");

    // Spy on clearInterval
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");

    unmount();

    // Should have called clearInterval
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it("does not crash with non-numeric timer (failure case)", () => {
    // Even though component expects number, test robustness
    const timer = "invalid";
    expect(() => render(<ProgressBar timer={timer} />)).not.toThrow();
    const progress = screen.getByRole("progressbar");
    // value might be NaN or something, but doesn't crash
    expect(progress).toBeInTheDocument();
  });
});
