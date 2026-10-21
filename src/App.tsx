import BodyInput from "./components/BodyInput";
import BreakingChangeDescriptionInput from "./components/BreakingChangeDescriptionInput";
import BreakingChangeStyleSelector from "./components/BreakingChangeStyleSelector";
import CommitTypeSelector from "./components/CommitTypeSelector";
import CopyButton from "./components/CopyButton";
import DescriptionInput from "./components/DescriptionInput";
import FooterInput from "./components/FooterInput";
import PreviewPanel from "./components/PreviewPanel";
import ScopeInput from "./components/ScopeInput";
import { useConventionalCommitsComposer } from "./hooks/useConventionalCommitsComposer";
import { isBreakingChangeDescriptionRequired } from "./lib/breakingChange";

export function App() {
  const composer = useConventionalCommitsComposer();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <header>
          <h1 className="text-center text-lg font-semibold">
            <a href="#">Conventional Commits Composer</a>
          </h1>
        </header>
        <main className="space-y-4">
          <div className="space-y-4">
            <CommitTypeSelector
              commitType={composer.commitType}
              onChangeCommitType={composer.setCommitType}
            />

            <ScopeInput scope={composer.scope} onChangeScope={composer.setScope} />

            <DescriptionInput
              description={composer.description}
              onChangeDescription={composer.setDescription}
            />

            <BodyInput body={composer.body} onChangeBody={composer.setBody} />

            <BreakingChangeStyleSelector
              breakingChangeStyle={composer.breakingChangeStyle}
              onChangeBreakingChangeStyle={composer.setBreakingChangeStyle}
            >
              {isBreakingChangeDescriptionRequired(composer.breakingChangeStyle) && (
                <div className="mt-2">
                  <BreakingChangeDescriptionInput
                    breakingChangeDescription={composer.breakingChangeDescription}
                    onChangeBreakingChangeDescription={composer.setBreakingChangeDescription}
                  />
                </div>
              )}
            </BreakingChangeStyleSelector>

            <FooterInput
              rows={composer.footerEditor.rows}
              addRow={composer.footerEditor.addRow}
              removeRow={composer.footerEditor.removeRow}
              updateRow={composer.footerEditor.updateRow}
            />
          </div>

          <PreviewPanel commitMessage={composer.commitPreview}>
            <CopyButton text={composer.commitPreview} />
          </PreviewPanel>

          <section>
            <h2>References</h2>
            <ul className="list-inside list-disc">
              <li>
                <a
                  href="https://www.conventionalcommits.org/en/v1.0.0/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-blue-500 visited:text-purple-500 hover:underline"
                >
                  Conventional Commits 1.0.0
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
