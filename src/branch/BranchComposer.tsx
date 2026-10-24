import { useState } from "react";

import { CopyButton } from "../components/CopyButton";
import { PreviewPanel } from "../components/PreviewPanel";
import { References } from "../components/References";
import { useFieldError } from "../hooks/useFieldError";
import { BRANCH_TYPE_OPTIONS, composeBranch, isTrunkBranch } from "./branch";
import type { BranchType } from "./branch";
import { validateBranch } from "./branch";

export function BranchComposer() {
  const [type, setType] = useState<BranchType>("feature");
  const [description, setDescription] = useState("");
  const { name, valid } = composeBranch(type, description);
  const validation = validateBranch(type, description);
  const descriptionError = useFieldError(validation.errors.description, !!description.trim());

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="branch-type" className="text-sm font-medium">
          Type
        </label>
        <select
          id="branch-type"
          value={type}
          onChange={(event) => setType(event.target.value as BranchType)}
          className="bg-foreground/3 w-full rounded p-2"
        >
          {BRANCH_TYPE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value} className="bg-background text-foreground">
              {item.value}: {item.description}
            </option>
          ))}
        </select>
      </div>
      {!isTrunkBranch(type) && (
        <div>
          <label htmlFor="branch-description" className="text-sm font-medium">
            Description
          </label>
          <input
            id="branch-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="add-login-page"
            className="bg-foreground/3 w-full rounded p-2"
            {...descriptionError.inputProps}
          />
          {descriptionError.error && (
            <p id={descriptionError.errorId} className="text-sm text-red-500">
              {descriptionError.error}
            </p>
          )}
        </div>
      )}
      <PreviewPanel text={name}>
        <CopyButton text={name} variant="branch" disabled={!valid} />
      </PreviewPanel>
      <References
        links={[
          {
            href: "https://conventionalbranch.org/#branch-naming-prefixes",
            label: "Conventional Branch",
          },
        ]}
      />
    </div>
  );
}
