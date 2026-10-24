import { CopyButton } from "../components/CopyButton";
import { PreviewPanel } from "../components/PreviewPanel";
import { References } from "../components/References";
import { useFieldError } from "../hooks/useFieldError";
import {
  BREAKING_CHANGE_OPTIONS,
  isBreakingChangeDescriptionRequired,
  type BreakingChangeStyle,
} from "./breakingChange";
import { COMMIT_TYPE_OPTIONS, type CommitType } from "./commitType";
import { FooterInput } from "./FooterInput";
import { useConventionalCommitsComposer } from "./useConventionalCommitsComposer";

export function CommitsComposer() {
  const composer = useConventionalCommitsComposer();
  const descriptionError = useFieldError(composer.errors.description);
  const breakingChangeError = useFieldError(composer.errors.breakingChangeDescription);
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="commit-type" className="text-sm font-medium">
            Type
          </label>
          <select
            id="commit-type"
            value={composer.commitType}
            onChange={(event) => composer.setCommitType(event.target.value as CommitType)}
            className="bg-foreground/3 w-full rounded p-2"
          >
            {COMMIT_TYPE_OPTIONS.map(({ value, description }) => (
              <option key={value} value={value} className="bg-background text-foreground">
                {description ? `${value}: ${description}` : value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="scope" className="text-sm font-medium">
            Scope (optional)
          </label>

          <input
            id="scope"
            value={composer.scope}
            onChange={(event) => composer.setScope(event.target.value)}
            className="bg-foreground/3 w-full rounded p-2"
            placeholder="lang"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>

          <input
            id="description"
            {...descriptionError.inputProps}
            value={composer.description}
            onChange={(event) => composer.setDescription(event.target.value)}
            className="bg-foreground/3 w-full rounded p-2"
            placeholder="add Polish language"
          />
          {descriptionError.error && (
            <p id={descriptionError.errorId} className="text-sm text-red-500">
              {descriptionError.error}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="text-sm font-medium">
            Body (optional)
          </label>

          <textarea
            id="body"
            value={composer.body}
            onChange={(event) => composer.setBody(event.target.value)}
            className="bg-foreground/3 w-full rounded p-2"
            rows={3}
            placeholder="Introduce a request id and a reference to latest request."
          />
        </div>

        <div>
          <label htmlFor="breaking-change-style" className="text-sm font-medium">
            Breaking change
          </label>
          <select
            id="breaking-change-style"
            value={composer.breakingChangeStyle}
            onChange={(event) =>
              composer.setBreakingChangeStyle(event.target.value as BreakingChangeStyle)
            }
            className="bg-foreground/3 w-full rounded p-2"
          >
            {BREAKING_CHANGE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-background text-foreground"
              >
                {`${option.value}: ${option.description}`}
              </option>
            ))}
          </select>

          {isBreakingChangeDescriptionRequired(composer.breakingChangeStyle) && (
            <div className="mt-2">
              <label htmlFor="breaking-change-description" className="text-sm font-medium">
                Breaking change description
              </label>
              <textarea
                id="breaking-change-description"
                {...breakingChangeError.inputProps}
                value={composer.breakingChangeDescription}
                name="breaking_change_description"
                onChange={(event) => composer.setBreakingChangeDescription(event.target.value)}
                className="bg-foreground/3 w-full rounded p-2"
                rows={2}
                placeholder="use JavaScript features not available in Node 6."
              />
              {breakingChangeError.error && (
                <p id={breakingChangeError.errorId} className="text-sm text-red-500">
                  {breakingChangeError.error}
                </p>
              )}
            </div>
          )}
        </div>

        <FooterInput
          rows={composer.footerEditor.rows}
          addRow={composer.footerEditor.addRow}
          removeRow={composer.footerEditor.removeRow}
          updateRow={composer.footerEditor.updateRow}
        />
      </div>

      <PreviewPanel text={composer.commitPreview}>
        <CopyButton variant="commits" text={composer.commitPreview} disabled={!composer.canCopy} />
      </PreviewPanel>

      <References
        links={[
          {
            href: "https://www.conventionalcommits.org/en/v1.0.0/",
            label: "Conventional Commits 1.0.0",
          },
          {
            href: "https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/src/index.ts",
            label: "commitlint config-conventional",
          },
        ]}
      />
    </div>
  );
}
