import { isBreakingChangeDescriptionRequired, type BreakingChangeStyle } from "./breakingChange";
import { isCommitTypeInvalid, type CommitType } from "./commitType";
import { validateFooter, type FooterEntry } from "./footer";

export function validateCommit(input: {
  commitType: CommitType;
  description: string;
  breakingChangeStyle: BreakingChangeStyle;
  breakingChangeDescription: string;
  footers: FooterEntry[];
}) {
  const errors = {
    commitType: isCommitTypeInvalid(input.commitType)
      ? "Use a word type without spaces or separators."
      : undefined,
    description: !input.description.trim() ? "Description is required." : undefined,
    breakingChangeDescription:
      isBreakingChangeDescriptionRequired(input.breakingChangeStyle) &&
      !input.breakingChangeDescription.trim()
        ? "Breaking change description is required."
        : undefined,
  };
  return {
    errors,
    valid:
      Object.values(errors).every((error) => !error) &&
      input.footers.every((row) => validateFooter(row).valid),
  };
}
