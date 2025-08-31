export const BREAKING_CHANGE_OPTIONS = [
  { value: "none", description: "No breaking change" },
  { value: "header", description: '"!" only' },
  { value: "footer", description: '"BREAKING-CHANGE:" only' },
  { value: "both", description: '"!" and "BREAKING-CHANGE:"' },
] as const;

export type BreakingChangeStyle =
  (typeof BREAKING_CHANGE_OPTIONS)[number]["value"];

export const isBreakingChangeDescriptionRequired = (
  style: BreakingChangeStyle
) => style === "footer" || style === "both";

export const isBreakingChangeHeaderMarkRequired = (
  style: BreakingChangeStyle
) => style === "header" || style === "both";
