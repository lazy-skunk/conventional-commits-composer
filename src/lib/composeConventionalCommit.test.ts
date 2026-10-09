import { describe, expect, it } from "vite-plus/test";
import { composeConventionalCommit } from "./composeConventionalCommit";

describe("Conventional Commits breaking change header", () => {
  it.each(["header", "both"] as const)(
    "places ! after the scope for %s style",
    (breakingChangeStyle) => {
      const message = composeConventionalCommit({
        commitType: "feat",
        scope: "api",
        description: "remove legacy endpoint",
        breakingChangeStyle,
        breakingChangeDescription: "use the v2 endpoint",
      });

      expect(message).toBe(
        breakingChangeStyle === "both"
          ? "feat(api)!: remove legacy endpoint\n\nBREAKING-CHANGE: use the v2 endpoint"
          : "feat(api)!: remove legacy endpoint",
      );
    },
  );
});
