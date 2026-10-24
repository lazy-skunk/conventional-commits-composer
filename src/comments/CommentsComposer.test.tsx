// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

import { CommentsComposer } from "./CommentsComposer";

afterEach(cleanup);

test("shows subject errors after blur and clears them as input is corrected", () => {
  render(<CommentsComposer />);
  const subject = screen.getByLabelText("Subject");
  expect(screen.queryByText("Subject is required.")).toBeNull();
  fireEvent.blur(subject);
  expect(subject.getAttribute("aria-describedby")).toBe(
    screen.getByText("Subject is required.").id,
  );
  fireEvent.change(subject, { target: { value: "Clear naming." } });
  expect(screen.queryByText("Subject is required.")).toBeNull();
});
