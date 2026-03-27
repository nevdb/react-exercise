import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import App from "./App";

describe("App Component", () => {
  test("renders the app title", () => {
    render(<App />);
    const titleElement = screen.getByText(/app title/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders a button", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("button click updates state", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    buttonElement.click();
    const updatedElement = screen.getByText(/updated text/i);
    expect(updatedElement).toBeInTheDocument();
  });
});
