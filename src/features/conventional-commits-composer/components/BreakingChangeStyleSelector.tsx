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
    <fieldset className="border rounded px-2 pb-1">
      <legend className="font-bold px-1">Breaking Change</legend>
      {BREAKING_CHANGE_OPTIONS.map((option) => (
        <label key={option.value} className="flex gap-2">
          <input
            type="radio"
            name="breaking_change_style"
            value={option.value}
            onChange={() => onChangeBreakingChangeStyle(option.value)}
            checked={breakingChangeStyle === option.value}
          />
          {`${option.value}: ${option.description}`}
        </label>
      ))}
      {children}
    </fieldset>
  );
}
