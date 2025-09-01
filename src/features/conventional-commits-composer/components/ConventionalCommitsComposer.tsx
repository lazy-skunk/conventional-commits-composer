"use client";
import { isBreakingChangeDescriptionRequired } from "../domain";
import { useConventionalCommitsComposer } from "../hooks/useConventionalCommitsComposer";
import BodyInput from "./BodyInput";
import BreakingChangeDescriptionInput from "./BreakingChangeDescriptionInput";
import BreakingChangeStyleSelector from "./BreakingChangeStyleSelector";
import CommitTypeSelector from "./CommitTypeSelector";
import CopyButton from "./CopyButton";
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

        <div className="space-y-3">
          <PreviewPanel commitMessage={composer.commitPreview}>
            <CopyButton text={composer.commitPreview} />
          </PreviewPanel>

          <div>
            <p>References</p>
            <ul className="list-disc list-inside">
              <li>
                <a
                  href="https://www.conventionalcommits.org/en/v1.0.0/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-500 underline"
                >
                  Conventional Commits 1.0.0
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-500 underline"
                >
                  @commitlint/config-conventional
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-500 underline"
                >
                  Angular convention
                </a>
              </li>
              <li>
                <a
                  href="https://git-scm.com/docs/git-interpret-trailers"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-500 underline"
                >
                  git trailer format
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
