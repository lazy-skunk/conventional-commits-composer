export const PRIMARY_TYPE_OPTIONS = [
  { value: "feat", description: "A new feature" },
  { value: "fix", description: "A bug fix" },
] as const;

export const OTHER_TYPE_OPTIONS = [
  { value: "docs", description: "Documentation only changes" },
  {
    value: "style",
    description: "Changes that do not affect the meaning of the code",
  },
  {
    value: "refactor",
    description: "A code change that neither fixes a bug nor adds a feature",
  },
  { value: "perf", description: "A code change that improves performance" },
  {
    value: "test",
    description: "Adding missing tests or correcting existing tests",
  },
  {
    value: "build",
    description: "Changes that affect the build system or external dependencies",
  },
  {
    value: "ci",
    description: "Changes to our CI configuration files and scripts",
  },
  {
    value: "chore",
    description: "Other changes that don't modify src or test files",
  },
  { value: "revert", description: "Reverts a previous commit" },
] as const;

export const DEFAULT_OTHER_TYPE = OTHER_TYPE_OPTIONS[0].value;

export type PrimaryType = (typeof PRIMARY_TYPE_OPTIONS)[number]["value"];
export type OtherType = (typeof OTHER_TYPE_OPTIONS)[number]["value"];
export type CommitType = PrimaryType | OtherType;

export function isOtherType(commitType: CommitType): commitType is OtherType {
  return OTHER_TYPE_OPTIONS.some((option) => option.value === commitType);
}
