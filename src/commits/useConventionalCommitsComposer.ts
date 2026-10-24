import { useState } from "react";

import { type BreakingChangeStyle } from "./breakingChange";
import { type CommitType } from "./commitType";
import { composeConventionalCommit } from "./composeConventionalCommit";
import { useFooterEditor } from "./useFooterEditor";
import { validateCommit } from "./validateCommit";

export function useConventionalCommitsComposer() {
  const [commitType, setCommitType] = useState<CommitType>("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [breakingChangeStyle, setBreakingChangeStyle] = useState<BreakingChangeStyle>("none");
  const [breakingChangeDescription, setBreakingChangeDescription] = useState("");
  const footerEditor = useFooterEditor();
  const validation = validateCommit({
    commitType,
    description,
    breakingChangeStyle,
    breakingChangeDescription,
    footers: footerEditor.rows,
  });

  const commitPreview = composeConventionalCommit({
    commitType,
    scope,
    description,
    body,
    breakingChangeStyle,
    breakingChangeDescription,
    footer: footerEditor.footer,
  });

  return {
    commitType,
    scope,
    description,
    body,
    breakingChangeStyle,
    breakingChangeDescription,
    footerEditor,

    setCommitType,
    setScope,
    setDescription,
    setBody,
    setBreakingChangeStyle,
    setBreakingChangeDescription,
    commitPreview,
    canCopy: validation.valid,
    errors: validation.errors,
  };
}
