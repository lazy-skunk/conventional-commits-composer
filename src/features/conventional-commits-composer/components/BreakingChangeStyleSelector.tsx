"use client";

import { BREAKING_CHANGE_OPTIONS, type BreakingChangeStyle } from "../domain";

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

      <div className="rounded bg-foreground/5 p-2">
        {BREAKING_CHANGE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex gap-2 rounded cursor-pointer transition hover:bg-foreground/10"
          >
            <input
              type="radio"
              name="breaking_change_style"
              value={option.value}
              onChange={() => onChangeBreakingChangeStyle(option.value)}
              checked={breakingChangeStyle === option.value}
              className="accent-brand-color"
            />
            {`${option.value}: ${option.description}`}
          </label>
        ))}
        {children}
      </div>
    </fieldset>
  );
}
