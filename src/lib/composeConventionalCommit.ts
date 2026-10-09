import { joinNonEmpty, trimOrEmpty } from "./text";
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

function formatCommitHeader(
  commitType: CommitType,
  breakingChangeStyle: BreakingChangeStyle,
  scope: string,
  description: string,
): string {
  const scopeToken = scope ? `(${scope})` : "";
  const breakingChangeMark = isBreakingChangeHeaderMarkRequired(breakingChangeStyle) ? "!" : "";
  return `${commitType}${scopeToken}${breakingChangeMark}: ${description}`;
}

function formatFooterSection(
  breakingChangeStyle: BreakingChangeStyle,
  breakingChangeDescription: string,
  footer: string,
): string {
  const breakingChangeFooter =
    isBreakingChangeDescriptionRequired(breakingChangeStyle) && breakingChangeDescription
      ? `BREAKING-CHANGE: ${breakingChangeDescription}`
      : "";
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
  const normalizedScope = trimOrEmpty(scope);
  const normalizedDescription = trimOrEmpty(description);
  const normalizedBody = trimOrEmpty(body);
  const normalizedBreakingChangeDescription = trimOrEmpty(breakingChangeDescription);
  const normalizedFooter = trimOrEmpty(footer);

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
