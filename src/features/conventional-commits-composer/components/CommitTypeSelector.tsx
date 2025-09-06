"use client";
import {
  isOtherType,
  OTHER_TYPE_OPTIONS,
  PRIMARY_TYPE_OPTIONS,
  type CommitType,
  type OtherType,
} from "../domain";
import { useCommitTypeSelector } from "../hooks/useCommitTypeSelector";

type Props = {
  commitType: CommitType;
  onChangeCommitType: (commitType: CommitType) => void;
};

export default function CommitTypeSelector({
  commitType,
  onChangeCommitType,
}: Props) {
  const { lastSelectedOtherType } = useCommitTypeSelector(commitType);

  return (
    <fieldset>
      <legend className="font-bold">Type</legend>

      <div className="rounded bg-foreground/5 p-2">
        {PRIMARY_TYPE_OPTIONS.map(({ value, description }) => (
          <label
            key={value}
            className="flex gap-2 rounded cursor-pointer transition hover:bg-foreground/10"
          >
            <input
              type="radio"
              name="commit_type"
              className="accent-brand-color"
              value={value}
              onChange={() => onChangeCommitType(value)}
              checked={commitType === value}
            />
            {`${value}: ${description}`}
          </label>
        ))}

        <label className="flex gap-2 rounded cursor-pointer transition hover:bg-foreground/10">
          <input
            type="radio"
            name="commit_type"
            className="accent-brand-color"
            value="other"
            onChange={() => onChangeCommitType(lastSelectedOtherType)}
            checked={isOtherType(commitType)}
          />
          other
        </label>

        {isOtherType(commitType) && (
          <select
            name="other_type"
            value={commitType}
            onChange={(event) =>
              onChangeCommitType(event.target.value as OtherType)
            }
            className="rounded bg-background text-foreground w-full p-2"
          >
            {OTHER_TYPE_OPTIONS.map(({ value, description }) => (
              <option key={value} value={value}>
                {`${value}: ${description}`}
              </option>
            ))}
          </select>
        )}
      </div>
    </fieldset>
  );
}
