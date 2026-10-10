import {
  isOtherType,
  OTHER_TYPE_OPTIONS,
  PRIMARY_TYPE_OPTIONS,
  type CommitType,
  type OtherType,
} from "../lib/commitType";
import { useCommitTypeSelector } from "../hooks/useCommitTypeSelector";

type Props = {
  commitType: CommitType;
  onChangeCommitType: (commitType: CommitType) => void;
};

export default function CommitTypeSelector({ commitType, onChangeCommitType }: Props) {
  const { selectedOtherType, setLastSelectedOtherType } = useCommitTypeSelector(commitType);

  return (
    <fieldset>
      <legend className="font-bold">Type</legend>

      <div className="rounded bg-zinc-500/10 p-2">
        {PRIMARY_TYPE_OPTIONS.map(({ value, description }) => (
          <label
            key={value}
            className="flex gap-2 rounded cursor-pointer transition hover:bg-zinc-500/20"
          >
            <input
              type="radio"
              name="commit_type"
              className="accent-blue-500"
              value={value}
              onChange={() => onChangeCommitType(value)}
              checked={commitType === value}
            />
            {`${value}: ${description}`}
          </label>
        ))}

        <label className="flex gap-2 rounded cursor-pointer transition hover:bg-zinc-500/20">
          <input
            type="radio"
            name="commit_type"
            className="accent-blue-500"
            value="other"
            onChange={() => onChangeCommitType(selectedOtherType)}
            checked={isOtherType(commitType)}
          />
          other
        </label>

        {isOtherType(commitType) && (
          <div className="mt-2">
            <select
              name="other_type"
              value={selectedOtherType}
              onChange={(event) => {
                const nextOtherType = event.target.value as OtherType;

                setLastSelectedOtherType(nextOtherType);
                onChangeCommitType(nextOtherType);
              }}
              className="rounded bg-zinc-800 text-zinc-100 w-full p-2"
            >
              {OTHER_TYPE_OPTIONS.map(({ value, description }) => (
                <option key={value} value={value}>
                  {`${value}: ${description}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </fieldset>
  );
}
