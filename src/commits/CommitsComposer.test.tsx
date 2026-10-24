// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

import { CommitsComposer } from "./CommitsComposer";

afterEach(cleanup);

test("requires commit description, breaking change details, and complete footers before copying", () => {
  render(<CommitsComposer />);
  const copy = () => screen.getByRole("button", { name: "Copy" }) as HTMLButtonElement;
  expect(copy().disabled).toBe(true);
  fireEvent.change(screen.getByRole("combobox", { name: "Type" }), { target: { value: "fix" } });
  const description = screen.getByRole("textbox", { name: "Description" });
  fireEvent.change(description, { target: { value: "   " } });
  expect(copy().disabled).toBe(true);
  fireEvent.change(description, { target: { value: "add login" } });
  expect(copy().disabled).toBe(false);
  fireEvent.change(screen.getByRole("combobox", { name: "Breaking change" }), {
    target: { value: "footer" },
  });
  expect(copy().disabled).toBe(true);
  fireEvent.change(
    screen.getByPlaceholderText("use JavaScript features not available in Node 6."),
    { target: { value: "change configuration precedence" } },
  );
  expect(copy().disabled).toBe(false);
  fireEvent.change(screen.getByLabelText("Footer token"), { target: { value: "Refs" } });
  expect(copy().disabled).toBe(true);
  fireEvent.change(screen.getByLabelText("Footer value"), { target: { value: "#123" } });
  expect(copy().disabled).toBe(false);
  fireEvent.change(screen.getByLabelText("Footer token"), { target: { value: "invalid token" } });
  expect(copy().disabled).toBe(true);
  fireEvent.change(screen.getByLabelText("Footer token"), { target: { value: "Reviewed-by:" } });
  expect(copy().disabled).toBe(true);
});

test("shows required errors after blur and clears them as input is corrected", () => {
  render(<CommitsComposer />);
  const description = screen.getByRole("textbox", { name: "Description" });
  expect(description.getAttribute("aria-invalid")).toBe("false");
  expect(screen.queryByText("Description is required.")).toBeNull();
  fireEvent.blur(description);
  const error = screen.getByText("Description is required.");
  expect(description.getAttribute("aria-describedby")).toBe(error.id);
  fireEvent.change(description, { target: { value: "add login" } });
  expect(screen.queryByText("Description is required.")).toBeNull();
  expect(description.getAttribute("aria-invalid")).toBe("false");

  fireEvent.change(screen.getByRole("combobox", { name: "Breaking change" }), {
    target: { value: "footer" },
  });
  const breaking = screen.getByLabelText("Breaking change description");
  expect(screen.queryByText("Breaking change description is required.")).toBeNull();
  fireEvent.blur(breaking);
  expect(breaking.getAttribute("aria-describedby")).toBe(
    screen.getByText("Breaking change description is required.").id,
  );
  fireEvent.change(breaking, { target: { value: "remove old API" } });
  expect(screen.queryByText("Breaking change description is required.")).toBeNull();
  expect((screen.getByRole("button", { name: "Copy" }) as HTMLButtonElement).disabled).toBe(false);
});
