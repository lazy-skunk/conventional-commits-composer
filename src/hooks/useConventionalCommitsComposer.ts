import { useState } from "react";
import type { BreakingChangeStyle } from "../lib/breakingChange";
import { composeConventionalCommit } from "../lib/composeConventionalCommit";
import type { CommitType } from "../lib/commitType";
import { useFooterEditor } from "./useFooterEditor";

export function useConventionalCommitsComposer() {
  const [commitType, setCommitType] = useState<CommitType>("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [breakingChangeStyle, setBreakingChangeStyle] = useState<BreakingChangeStyle>("none");
  const [breakingChangeDescription, setBreakingChangeDescription] = useState("");
  const footerEditor = useFooterEditor();

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
  };
}
