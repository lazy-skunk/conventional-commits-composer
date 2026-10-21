import { useCommitTypeSelector } from "../hooks/useCommitTypeSelector";
import {
  isOtherType,
  OTHER_TYPE_OPTIONS,
  PRIMARY_TYPE_OPTIONS,
  type CommitType,
  type OtherType,
} from "../lib/commitType";

type Props = {
  commitType: CommitType;
  onChangeCommitType: (commitType: CommitType) => void;
};

export default function CommitTypeSelector({ commitType, onChangeCommitType }: Props) {
  const { selectedOtherType, setLastSelectedOtherType } = useCommitTypeSelector(commitType);

  return (
    <fieldset>
      <legend className="text-sm font-medium">Type</legend>

      <div className="bg-foreground/3 rounded p-2">
        {PRIMARY_TYPE_OPTIONS.map(({ value, description }) => (
          <label
            key={value}
            className="hover:bg-foreground/3 flex cursor-pointer gap-2 rounded motion-safe:transition"
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

        <label className="hover:bg-foreground/3 flex cursor-pointer gap-2 rounded motion-safe:transition">
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
            {/* Native option popups do not inherit the page background, so translucent colors are unreliable. */}
            <select
              name="other_type"
              value={selectedOtherType}
              onChange={(event) => {
                const nextOtherType = event.target.value as OtherType;

                setLastSelectedOtherType(nextOtherType);
                onChangeCommitType(nextOtherType);
              }}
              className="bg-foreground/3 w-full rounded p-2"
            >
              {OTHER_TYPE_OPTIONS.map(({ value, description }) => (
                <option key={value} value={value} className="bg-background text-foreground">
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
