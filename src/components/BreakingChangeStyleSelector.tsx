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
      <legend className="font-bold">Breaking Change</legend>

      <div className="rounded bg-zinc-500/10 p-2">
        {BREAKING_CHANGE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex gap-2 rounded cursor-pointer transition hover:bg-zinc-500/20"
          >
            <input
              type="radio"
              name="breaking_change_style"
              value={option.value}
              onChange={() => onChangeBreakingChangeStyle(option.value)}
              checked={breakingChangeStyle === option.value}
              className="accent-rose-500"
            />
            {`${option.value}: ${option.description}`}
          </label>
        ))}
        {children}
      </div>
    </fieldset>
  );
}
