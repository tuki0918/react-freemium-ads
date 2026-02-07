import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sample } from "./Sample";

describe("Sample", () => {
  it("renders default title and description", () => {
    render(<Sample />);

    expect(
      screen.getByRole("heading", { name: "Sample Component" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Use this component as a starting point for your package.",
      ),
    ).toBeInTheDocument();
  });

  it("renders custom title and child content", () => {
    render(
      <Sample title="Custom title" description="Custom description">
        <button type="button">Click me</button>
      </Sample>,
    );

    expect(
      screen.getByRole("heading", { name: "Custom title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });
});
