export const COMMIT_TYPE_OPTIONS = [
  { value: "feat", description: "introduces a new feature to the codebase" },
  { value: "fix", description: "patches a bug in your codebase" },
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

export type CommitType = string;

export function isCommitTypeInvalid(type: string): boolean {
  return !/^[\p{L}\p{N}_-]+$/u.test(type.trim());
}
