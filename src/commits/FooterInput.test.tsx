// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vite-plus/test";

import { FooterInput } from "./FooterInput";
import { useFooterEditor } from "./useFooterEditor";

function FooterEditor() {
  const editor = useFooterEditor();
  return <FooterInput {...editor} />;
}

afterEach(cleanup);

test("delays footer errors until blur and keeps empty optional rows valid", () => {
  render(<FooterEditor />);
  const token = screen.getByLabelText("Footer token");
  const value = screen.getByLabelText("Footer value");
  fireEvent.blur(token);
  expect(screen.queryByText("Token is required.")).toBeNull();
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Add footer" }));
  const secondToken = screen.getAllByLabelText("Footer token")[1]!;
  const secondValue = screen.getAllByLabelText("Footer value")[1]!;
  fireEvent.change(secondToken, { target: { value: "Refs" } });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.blur(secondToken, { relatedTarget: secondValue });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.blur(secondValue, { relatedTarget: token });
  expect(secondValue.getAttribute("aria-describedby")).toBe(
    screen.getByText("Value is required.").id,
  );
  fireEvent.change(secondValue, { target: { value: "#123" } });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.change(token, { target: { value: "invalid token" } });
  expect(token.getAttribute("aria-invalid")).toBe("true");
  fireEvent.change(token, { target: { value: "" } });
  expect(token.getAttribute("aria-invalid")).toBe("false");
  expect(value.getAttribute("aria-invalid")).toBe("false");
});

test("validates footer token format while typing and missing tokens on row blur", () => {
  render(<FooterEditor />);
  const token = screen.getByLabelText("Footer token");
  const value = screen.getByLabelText("Footer value");
  const add = screen.getByRole("button", { name: "Add footer" });
  fireEvent.change(value, { target: { value: "#123" } });
  fireEvent.blur(value, { relatedTarget: token });
  expect(screen.queryByText("Token is required.")).toBeNull();
  expect(token.getAttribute("aria-invalid")).toBe("false");
  fireEvent.change(token, { target: { value: "invalid token" } });
  expect(token.getAttribute("aria-invalid")).toBe("true");
  fireEvent.blur(token, { relatedTarget: value });
  expect(token.getAttribute("aria-invalid")).toBe("true");
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.change(token, { target: { value: "Refs" } });
  expect(token.getAttribute("aria-invalid")).toBe("false");
  fireEvent.change(token, { target: { value: "" } });
  expect(screen.queryByText("Token is required.")).toBeNull();
  fireEvent.blur(token, { relatedTarget: add });
  expect(token.getAttribute("aria-describedby")).toBe(screen.getByText("Token is required.").id);
  fireEvent.change(value, { target: { value: "" } });
  expect(screen.queryByText("Token is required.")).toBeNull();
});

test("preserves footer errors on focus and clears them only when input resolves them", () => {
  render(<FooterEditor />);
  const token = screen.getByLabelText("Footer token");
  const value = screen.getByLabelText("Footer value");
  const outside = screen.getByRole("button", { name: "Add footer" });
  fireEvent.change(token, { target: { value: "Refs" } });
  fireEvent.blur(token, { relatedTarget: outside });
  expect(screen.getByText("Value is required.")).toBeTruthy();
  fireEvent.focus(token, { relatedTarget: outside });
  expect(screen.getByText("Value is required.")).toBeTruthy();
  fireEvent.change(value, { target: { value: " " } });
  expect(screen.getByText("Value is required.")).toBeTruthy();
  fireEvent.change(value, { target: { value: "#123" } });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.change(value, { target: { value: "" } });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.change(token, { target: { value: "" } });
  fireEvent.change(value, { target: { value: "#123" } });
  expect(screen.queryByText("Token is required.")).toBeNull();
  fireEvent.blur(value, { relatedTarget: token });
  fireEvent.focus(token, { relatedTarget: value });
  expect(screen.queryByText("Token is required.")).toBeNull();
  fireEvent.blur(token, { relatedTarget: outside });
  expect(screen.getByText("Token is required.")).toBeTruthy();
  fireEvent.focus(token, { relatedTarget: outside });
  expect(screen.getByText("Token is required.")).toBeTruthy();
  fireEvent.change(token, { target: { value: "invalid token" } });
  expect(token.getAttribute("aria-invalid")).toBe("true");
  fireEvent.blur(token, { relatedTarget: outside });
  fireEvent.focus(token, { relatedTarget: outside });
  expect(token.getAttribute("aria-invalid")).toBe("true");
  fireEvent.change(token, { target: { value: "Refs" } });
  expect(token.getAttribute("aria-invalid")).toBe("false");
});

test("leaving an empty footer row does not trigger missing values while editing it later", () => {
  render(<FooterEditor />);
  fireEvent.click(screen.getByRole("button", { name: "Add footer" }));
  const [token, otherToken] = screen.getAllByLabelText("Footer token");
  const value = screen.getAllByLabelText("Footer value")[0]!;
  fireEvent.focus(token!);
  fireEvent.blur(token!, { relatedTarget: otherToken });
  fireEvent.focus(otherToken!, { relatedTarget: token });
  fireEvent.blur(otherToken!, { relatedTarget: token });
  fireEvent.focus(token!, { relatedTarget: otherToken });
  fireEvent.change(token!, { target: { value: "Refs" } });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.blur(token!, { relatedTarget: value });
  expect(screen.queryByText("Value is required.")).toBeNull();
  fireEvent.blur(value, { relatedTarget: otherToken });
  expect(screen.getByText("Value is required.")).toBeTruthy();
});
