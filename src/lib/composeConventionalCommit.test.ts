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

describe("composeConventionalCommit", () => {
  it("composes scope, body, and footer with blank lines", () => {
    const message = composeConventionalCommit({
      commitType: "fix",
      scope: " api ",
      description: " handle timeout ",
      body: " Add a retry before returning an error. ",
      breakingChangeStyle: "none",
      footer: "Refs: #123",
    });

    expect(message).toBe(
      "fix(api): handle timeout\n\nAdd a retry before returning an error.\n\nRefs: #123",
    );
  });

  it("omits empty optional sections", () => {
    const message = composeConventionalCommit({
      commitType: "docs",
      description: " update setup guide ",
      breakingChangeStyle: "none",
    });

    expect(message).toBe("docs: update setup guide");
  });

  it("adds only the breaking change footer for footer style", () => {
    const message = composeConventionalCommit({
      commitType: "feat",
      description: "replace authentication flow",
      breakingChangeStyle: "footer",
      breakingChangeDescription: "use OAuth 2.0",
    });

    expect(message).toBe("feat: replace authentication flow\n\nBREAKING-CHANGE: use OAuth 2.0");
  });
});
