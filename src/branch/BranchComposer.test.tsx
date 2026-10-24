// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

import { BranchComposer } from "./BranchComposer";

afterEach(cleanup);

test("explains an empty branch description after blur and hides the error for trunk branches", () => {
  render(<BranchComposer />);
  const description = screen.getByRole("textbox", { name: "Description" });
  expect(screen.queryByText("Description is required.")).toBeNull();
  fireEvent.blur(description);
  expect(description.getAttribute("aria-describedby")).toBe(
    screen.getByText("Description is required.").id,
  );
  fireEvent.change(screen.getByRole("combobox", { name: "Type" }), { target: { value: "main" } });
  expect(screen.queryByText("Description is required.")).toBeNull();
  expect((screen.getByRole("button", { name: "Copy" }) as HTMLButtonElement).disabled).toBe(false);
});
