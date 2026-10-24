import { useState } from "react";

import { CopyButton } from "../components/CopyButton";
import { PreviewPanel } from "../components/PreviewPanel";
import { References } from "../components/References";
import { useFieldError } from "../hooks/useFieldError";
import { COMMENT_LABEL_OPTIONS, composeConventionalComment } from "./composeConventionalComment";
import type { CommentLabel } from "./composeConventionalComment";
import { validateComment } from "./validateComment";

export function CommentsComposer() {
  const [label, setLabel] = useState<CommentLabel>("praise");
  const [decoration, setDecoration] = useState("");
  const [subject, setSubject] = useState("");
  const [discussion, setDiscussion] = useState("");
  const validation = validateComment({ label, decorations: decoration, subject });
  const subjectError = useFieldError(validation.errors.subject);
  const preview = composeConventionalComment({
    label,
    decorations: decoration,
    subject,
    discussion,
  });

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="comment-label" className="text-sm font-medium">
          Label
        </label>
        <select
          id="comment-label"
          value={label}
          onChange={(event) => setLabel(event.target.value as CommentLabel)}
          className="bg-foreground/3 w-full rounded p-2"
        >
          {COMMENT_LABEL_OPTIONS.map((item) => (
            <option key={item.value} value={item.value} className="bg-background text-foreground">
              {item.value}: {item.description}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment-decorations" className="text-sm font-medium">
          Decorations (optional)
        </label>
        <select
          id="comment-decorations"
          value={decoration}
          onChange={(event) => setDecoration(event.target.value)}
          className="bg-foreground/3 w-full rounded p-2"
        >
          <option value="" className="bg-background text-foreground">
            none
          </option>
          <option value="blocking" className="bg-background text-foreground">
            blocking: must resolve
          </option>
          <option value="non-blocking" className="bg-background text-foreground">
            non-blocking: may follow up
          </option>
          <option value="if-minor" className="bg-background text-foreground">
            if-minor: only if the change is small
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="comment-subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="comment-subject"
          {...subjectError.inputProps}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="This is not worded correctly."
          className="bg-foreground/3 w-full rounded p-2"
        />
        {subjectError.error && (
          <p id={subjectError.errorId} className="text-sm text-red-500">
            {subjectError.error}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="comment-discussion" className="text-sm font-medium">
          Discussion (optional)
        </label>
        <textarea
          id="comment-discussion"
          value={discussion}
          onChange={(event) => setDiscussion(event.target.value)}
          placeholder="Can we change this to match the wording of the marketing page?"
          rows={3}
          className="bg-foreground/3 w-full rounded p-2"
        />
      </div>
      <PreviewPanel text={preview}>
        <CopyButton text={preview} variant="comments" disabled={!validation.valid} />
      </PreviewPanel>
      <References
        links={[{ href: "https://conventionalcomments.org/", label: "Conventional Comments" }]}
      />
    </div>
  );
}
