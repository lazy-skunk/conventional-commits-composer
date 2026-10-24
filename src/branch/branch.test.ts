import { expect, test } from "vite-plus/test";

import { composeBranch, type BranchType } from "./branch";

test.each([
  ["feature/add-login-page", true],
  ["feat/add-login-page", true],
  ["bugfix/fix-header-bug", true],
  ["fix/header-bug", true],
  ["hotfix/security-patch", true],
  ["release/v1.2.0", true],
  ["chore/upgrade-node-v20.11", true],
  ["chore/update-dependencies", true],
  ["feature/issue-123-new-login", true],
  ["Feature/Add-Login", false],
  ["feature/new--login", false],
  ["feature/-new-login", false],
  ["feature/new-login-", false],
  ["release/v1.-2.0", false],
  ["fix/header bug", false],
  ["fix/header_bug", false],
  ["unknown/some-task", false],
] as const)("official example %s has validity %s", (name, valid) => {
  const separator = name.indexOf("/");
  const type = name.slice(0, separator);
  const description = name.slice(separator + 1);
  expect(composeBranch(type as BranchType, description)).toEqual({ name, valid });
});

test.each(["main", "master", "develop"] as const)(
  "supports trunk %s without a description",
  (type) => {
    expect(composeBranch(type, "previous-description")).toEqual({ name: type, valid: true });
  },
);

test("trims surrounding input whitespace and rejects empty descriptions", () => {
  expect(composeBranch("feature", " issue-123-add-login ")).toEqual({
    name: "feature/issue-123-add-login",
    valid: true,
  });
  expect(composeBranch("feature", "").valid).toBe(false);
  expect(composeBranch("feature", "   ").valid).toBe(false);
});
