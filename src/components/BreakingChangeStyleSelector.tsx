import { BREAKING_CHANGE_OPTIONS, type BreakingChangeStyle } from "../lib/breakingChange";

type Props = {
  breakingChangeStyle: BreakingChangeStyle;
  onChangeBreakingChangeStyle: (style: BreakingChangeStyle) => void;
  children?: React.ReactNode;
};

export default function BreakingChangeStyleSelector({
  breakingChangeStyle,
  onChangeBreakingChangeStyle,
  children,
}: Props) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Breaking Change</legend>

      <div className="bg-foreground/3 rounded p-2">
        {BREAKING_CHANGE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="hover:bg-foreground/3 flex cursor-pointer gap-2 rounded motion-safe:transition"
          >
            <input
              type="radio"
              name="breaking_change_style"
              value={option.value}
              onChange={() => onChangeBreakingChangeStyle(option.value)}
              checked={breakingChangeStyle === option.value}
              className="accent-blue-500"
            />
            {`${option.value}: ${option.description}`}
          </label>
        ))}
        {children}
      </div>
    </fieldset>
  );
}
