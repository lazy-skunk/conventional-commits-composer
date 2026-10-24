export const BRANCH_TYPE_OPTIONS = [
  { value: "feature", description: "For new features" },
  { value: "feat", description: "For new features" },
  { value: "bugfix", description: "For bug fixes" },
  { value: "fix", description: "For bug fixes" },
  { value: "hotfix", description: "For urgent fixes" },
  { value: "release", description: "For branches preparing a release" },
  { value: "chore", description: "For non-code tasks like dependency, docs updates" },
  { value: "main", description: "Trunk branch" },
  { value: "master", description: "Trunk branch" },
  { value: "develop", description: "Trunk branch" },
] as const;

export type BranchType = (typeof BRANCH_TYPE_OPTIONS)[number]["value"];

export function isTrunkBranch(type: string) {
  return ["main", "master", "develop"].includes(type);
}

export function composeBranch(type: BranchType, description: string) {
  const value = description.trim();
  if (isTrunkBranch(type)) return { name: type, valid: true };
  return {
    name: `${type}/${value}`,
    valid: validateBranch(type, description).valid,
  };
}

export function validateBranch(type: BranchType, description: string) {
  const value = description.trim();
  const errors = {
    type: !BRANCH_TYPE_OPTIONS.some((option) => option.value === type)
      ? "Select a branch type."
      : undefined,
    description: isTrunkBranch(type)
      ? undefined
      : !value
        ? "Description is required."
        : !/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(value)
          ? "Use Lowercase Alphanumerics, Hyphens, and Dots. No Consecutive, Leading, or Trailing Hyphens or Dots."
          : undefined,
  };
  return { errors, valid: Object.values(errors).every((error) => !error) };
}
