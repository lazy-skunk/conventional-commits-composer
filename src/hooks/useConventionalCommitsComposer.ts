import { useMemo, useState } from "react";
import type { BreakingChangeStyle } from "../domain/breakingChange";
import { composeConventionalCommit } from "../domain/composeConventionalCommit";
import type { CommitType } from "../domain/commitType";

export function useConventionalCommitsComposer() {
  const [commitType, setCommitType] = useState<CommitType>("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [breakingChangeStyle, setBreakingChangeStyle] = useState<BreakingChangeStyle>("none");
  const [breakingChangeDescription, setBreakingChangeDescription] = useState("");
  const [footer, setFooter] = useState("");

  const commitPreview = useMemo(() => {
    return composeConventionalCommit({
      commitType,
      scope,
      description,
      body,
      breakingChangeStyle,
      breakingChangeDescription,
      footer,
    });
  }, [
    commitType,
    scope,
    description,
    body,
    breakingChangeStyle,
    breakingChangeDescription,
    footer,
  ]);

  return {
    commitType,
    scope,
    description,
    body,
    breakingChangeStyle,
    breakingChangeDescription,
    footer,

    setCommitType,
    setScope,
    setDescription,
    setBody,
    setBreakingChangeStyle,
    setBreakingChangeDescription,
    setFooter,

    commitPreview,
  };
}
