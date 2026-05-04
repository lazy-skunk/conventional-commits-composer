import { describe, expect, it } from "vitest";
import { joinNonEmpty, normalize } from "./text";

describe("text utilities", () => {
  it("normalizes text", () => {
    expect(normalize()).toBe("");
    expect(normalize("  test text  ")).toBe("test text");
  });

  it("joins text", () => {
    expect(joinNonEmpty(["feat: add test", "", undefined, "Refs: #123"], "\n\n")).toBe(
      "feat: add test\n\nRefs: #123",
    );
  });
});
