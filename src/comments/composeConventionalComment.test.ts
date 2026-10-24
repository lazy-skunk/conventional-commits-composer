import { expect, test } from "vite-plus/test";

import { composeConventionalComment } from "./composeConventionalComment";

test("reproduces the official praise example without optional fields", () => {
  expect(
    composeConventionalComment({
      label: "praise",
      decorations: "",
      subject: "Beautiful test!",
      discussion: "",
    }),
  ).toBe("praise: Beautiful test!");
});

test("reproduces the official suggestion and discussion example", () => {
  expect(
    composeConventionalComment({
      label: "suggestion",
      decorations: "",
      subject: "This is not worded correctly.",
      discussion: "Can we change this to match the wording of the marketing page?",
    }),
  ).toBe(
    "suggestion: This is not worded correctly.\n\nCan we change this to match the wording of the marketing page?",
  );
});

test.each(["blocking", "non-blocking", "if-minor"])(
  "formats the supported %s decoration",
  (decorations) => {
    expect(
      composeConventionalComment({
        label: "issue",
        decorations,
        subject: "Review this.",
        discussion: "First paragraph.\n\nSecond paragraph.",
      }),
    ).toBe(`issue (${decorations}): Review this.\n\nFirst paragraph.\n\nSecond paragraph.`);
  },
);

test("keeps the label visible while the subject is empty", () => {
  expect(
    composeConventionalComment({ label: "praise", decorations: "", subject: " ", discussion: " " }),
  ).toBe("praise: ");
});
