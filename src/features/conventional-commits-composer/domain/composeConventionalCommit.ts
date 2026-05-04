import { joinNonEmpty, normalize } from "@/lib/text";
import type { BreakingChangeStyle } from "./breakingChange";
import {
  isBreakingChangeDescriptionRequired,
  isBreakingChangeHeaderMarkRequired,
} from "./breakingChange";
import type { CommitType } from "./commitType";

type ComposeConventionalCommitParams = {
  commitType: CommitType;
  scope?: string;
  description: string;
  body?: string;
  breakingChangeStyle: BreakingChangeStyle;
  breakingChangeDescription?: string;
  footer?: string;
};

function formatCommitTypeToken(commitType: CommitType, breakingChangeStyle: BreakingChangeStyle) {
  return isBreakingChangeHeaderMarkRequired(breakingChangeStyle) ? `${commitType}!` : commitType;
}

function formatCommitHeader(
  commitType: CommitType,
  breakingChangeStyle: BreakingChangeStyle,
  scope: string,
  description: string,
): string {
  const commitTypeToken = formatCommitTypeToken(commitType, breakingChangeStyle);
  return `${commitTypeToken}${scope ? `(${scope})` : ""}: ${description}`;
}

function formatBreakingChangeFooter(
  breakingChangeStyle: BreakingChangeStyle,
  breakingChangeDescription: string,
) {
  if (isBreakingChangeDescriptionRequired(breakingChangeStyle) && breakingChangeDescription) {
    return `BREAKING-CHANGE: ${breakingChangeDescription}`;
  }
  return "";
}

function formatFooterSection(
  breakingChangeStyle: BreakingChangeStyle,
  breakingChangeDescription: string,
  footer: string,
): string {
  const breakingChangeFooter = formatBreakingChangeFooter(
    breakingChangeStyle,
    breakingChangeDescription,
  );
  return joinNonEmpty([breakingChangeFooter, footer], "\n");
}

export function composeConventionalCommit({
  commitType,
  scope,
  description,
  body,
  breakingChangeStyle,
  breakingChangeDescription,
  footer,
}: ComposeConventionalCommitParams) {
  const normalizedScope = normalize(scope);
  const normalizedDescription = normalize(description);
  const normalizedBody = normalize(body);
  const normalizedBreakingChangeDescription = normalize(breakingChangeDescription);
  const normalizedFooter = normalize(footer);

  const commitHeader = formatCommitHeader(
    commitType,
    breakingChangeStyle,
    normalizedScope,
    normalizedDescription,
  );
  const commitFooter = formatFooterSection(
    breakingChangeStyle,
    normalizedBreakingChangeDescription,
    normalizedFooter,
  );

  return joinNonEmpty([commitHeader, normalizedBody, commitFooter], "\n\n");
}
