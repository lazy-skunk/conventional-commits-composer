"use client";
import { isBreakingChangeDescriptionRequired } from "../domain";
import { useConventionalCommitsComposer } from "../hooks/useConventionalCommitsComposer";
import BodyInput from "./BodyInput";
import BreakingChangeDescriptionInput from "./BreakingChangeDescriptionInput";
import BreakingChangeStyleSelector from "./BreakingChangeStyleSelector";
import CommitTypeSelector from "./CommitTypeSelector";
import DescriptionInput from "./DescriptionInput";
import FooterInput from "./FooterInput";
import PreviewPanel from "./PreviewPanel";
import ScopeInput from "./ScopeInput";

export default function ConventionalCommitsComposer() {
  const composer = useConventionalCommitsComposer();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-black text-center my-2">
        Conventional Commits Composer
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <CommitTypeSelector
            commitType={composer.commitType}
            onChangeCommitType={composer.setCommitType}
          />

          <ScopeInput
            scope={composer.scope}
            onChangeScope={composer.setScope}
          />

          <DescriptionInput
            description={composer.description}
            onChangeDescription={composer.setDescription}
          />

          <BodyInput body={composer.body} onChangeBody={composer.setBody} />

          <BreakingChangeStyleSelector
            breakingChangeStyle={composer.breakingChangeStyle}
            onChangeBreakingChangeStyle={composer.setBreakingChangeStyle}
          >
            {isBreakingChangeDescriptionRequired(
              composer.breakingChangeStyle
            ) && (
              <BreakingChangeDescriptionInput
                breakingChangeDescription={composer.breakingChangeDescription}
                onChangeBreakingChangeDescription={
                  composer.setBreakingChangeDescription
                }
              />
            )}
          </BreakingChangeStyleSelector>

          <FooterInput
            footer={composer.footer}
            onChangeFooter={composer.setFooter}
          />
        </div>

        <div>
          <PreviewPanel commitMessage={composer.commitPreview} />
        </div>
      </div>
    </div>
  );
}
