import { expect, test } from "vite-plus/test";

import { validateComment } from "./validateComment";

test.each([
  ["praise", "", "Clear naming.", true],
  ["custom-label", "blocking,if-minor", "Review this.", true],
  ["praise", "", " ", false],
  ["invalid label", "", "Review this.", false],
  ["issue", "(blocking)", "Review this.", false],
  ["issue", "blocking\n", "Review this.", false],
])("validates label %s, decorations %s and subject %s", (label, decorations, subject, valid) => {
  expect(validateComment({ label, decorations, subject }).valid).toBe(valid);
});
