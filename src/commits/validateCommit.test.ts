import { expect, test } from "vite-plus/test";

import { validateCommit } from "./validateCommit";

const input = {
  commitType: "feat",
  description: "add login",
  breakingChangeStyle: "none" as const,
  breakingChangeDescription: "",
  footers: [{ token: "", value: "" }],
};

test("accepts empty optional footers and requires a description", () => {
  expect(validateCommit(input).valid).toBe(true);
  const result = validateCommit({ ...input, description: " " });
  expect(result.valid).toBe(false);
  expect(result.errors.description).toBe("Description is required.");
});

test("requires breaking details only for styles that use them", () => {
  expect(validateCommit({ ...input, breakingChangeStyle: "footer" }).valid).toBe(false);
  expect(
    validateCommit({
      ...input,
      breakingChangeStyle: "footer",
      breakingChangeDescription: "remove old API",
    }).valid,
  ).toBe(true);
});

test.each([
  [{ token: "Refs", value: "" }],
  [{ token: "", value: "#123" }],
  [{ token: "invalid token", value: "#123" }],
])("rejects incomplete or malformed footers %j", (footer) => {
  expect(validateCommit({ ...input, footers: [footer] }).valid).toBe(false);
});
