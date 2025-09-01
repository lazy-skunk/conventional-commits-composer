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
    <fieldset className="border rounded px-2 pb-1">
      <legend className="font-bold px-1">Type</legend>

      {PRIMARY_TYPE_OPTIONS.map(({ value, description }) => (
        <label key={value} className="flex gap-2">
          <input
            type="radio"
            name="commit_type"
            value={value}
            onChange={() => onChangeCommitType(value)}
            checked={commitType === value}
          />
          {`${value}: ${description}`}
        </label>
      ))}

      <label className="flex gap-2">
        <input
          type="radio"
          name="commit_type"
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
          className="w-full border rounded my-1 p-1"
        >
          {OTHER_TYPE_OPTIONS.map(({ value, description }) => (
            <option key={value} value={value}>
              {`${value}: ${description}`}
            </option>
          ))}
        </select>
      )}
    </fieldset>
  );
}
