import { joinNonEmpty, normalize } from "./text";
describe("normalize", () => {
  it("trims whitespace", () => {
    expect(normalize("  feat(ui): add button  ")).toBe("feat(ui): add button");
  });

  it("handles undefined", () => {
    expect(normalize()).toBe("");
  });
});

describe("joinNonEmpty", () => {
  it("joins parts", () => {
    expect(joinNonEmpty(["feat(ui): add button", "Refs: #42"], "\n\n")).toBe(
      "feat(ui): add button\n\nRefs: #42",
    );
  });

  it("skips empty parts", () => {
    expect(
      joinNonEmpty(
        ["feat(ui): add button", undefined, "", "Refs: #42"],
        "\n\n",
      ),
    ).toBe("feat(ui): add button\n\nRefs: #42");
  });
});
