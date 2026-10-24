import { describe, expect, it, test } from "vite-plus/test";

import { composeConventionalCommit } from "./composeConventionalCommit";
import { serializeFooters } from "./footer";

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

const examples = [
  {
    input: {
      commitType: "feat",
      description: "allow provided config object to extend other configs",
      breakingChangeStyle: "footer",
      breakingChangeDescription:
        "`extends` key in config file is now used for extending other config files",
    },
    expected:
      "feat: allow provided config object to extend other configs\n\nBREAKING CHANGE: `extends` key in config file is now used for extending other config files",
  },
  {
    input: {
      commitType: "feat",
      description: "send an email to the customer when a product is shipped",
      breakingChangeStyle: "header",
    },
    expected: "feat!: send an email to the customer when a product is shipped",
  },
  {
    input: {
      commitType: "feat",
      scope: "api",
      description: "send an email to the customer when a product is shipped",
      breakingChangeStyle: "header",
    },
    expected: "feat(api)!: send an email to the customer when a product is shipped",
  },
  {
    input: {
      commitType: "feat",
      description: "drop support for Node 6",
      breakingChangeStyle: "both",
      breakingChangeDescription: "use JavaScript features not available in Node 6.",
    },
    expected:
      "feat!: drop support for Node 6\n\nBREAKING CHANGE: use JavaScript features not available in Node 6.",
  },
  {
    input: {
      commitType: "docs",
      description: "correct spelling of CHANGELOG",
      breakingChangeStyle: "none",
    },
    expected: "docs: correct spelling of CHANGELOG",
  },
  {
    input: {
      commitType: "feat",
      scope: "lang",
      description: "add Polish language",
      breakingChangeStyle: "none",
    },
    expected: "feat(lang): add Polish language",
  },
  {
    input: {
      commitType: "fix",
      description: "prevent racing of requests",
      breakingChangeStyle: "none",
      body: "Introduce a request id and a reference to latest request. Dismiss\nincoming responses other than from latest request.\n\nRemove timeouts which were used to mitigate the racing issue but are\nobsolete now.",
      footer: serializeFooters([
        { token: "Reviewed-by", value: "Z" },
        { token: "Refs", value: "#123" },
      ]),
    },
    expected:
      "fix: prevent racing of requests\n\nIntroduce a request id and a reference to latest request. Dismiss\nincoming responses other than from latest request.\n\nRemove timeouts which were used to mitigate the racing issue but are\nobsolete now.\n\nReviewed-by: Z\nRefs: #123",
  },
] as const;

test.each(examples)("reproduces official example: $input.description", ({ input, expected }) => {
  expect(composeConventionalCommit(input)).toBe(
    expected.replace("BREAKING CHANGE:", "BREAKING-CHANGE:"),
  );
});
