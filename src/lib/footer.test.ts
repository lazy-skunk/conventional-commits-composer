import { describe, expect, it } from "vite-plus/test";
import { isFooterTokenInvalid, serializeFooters } from "./footer";

describe("isFooterTokenInvalid", () => {
  it.each(["Reviewed by", "Co authored by"])("rejects whitespace in %s", (token) => {
    expect(isFooterTokenInvalid(token)).toBe(true);
  });

  it.each(["Reviewed-by", "BREAKING CHANGE", "BREAKING-CHANGE"])("accepts %s", (token) => {
    expect(isFooterTokenInvalid(token)).toBe(false);
  });
});

describe("serializeFooters", () => {
  it("trims and serializes valid entries", () => {
    expect(
      serializeFooters([
        { token: " Refs ", value: " #123 " },
        { token: "Reviewed-by", value: "Alice" },
      ]),
    ).toBe("Refs: #123\nReviewed-by: Alice");
  });

  it("omits incomplete and invalid entries", () => {
    expect(
      serializeFooters([
        { token: "Refs", value: "" },
        { token: "", value: "#123" },
        { token: "Reviewed by", value: "Alice" },
        { token: "Refs", value: "#456" },
      ]),
    ).toBe("Refs: #456");
  });
});
