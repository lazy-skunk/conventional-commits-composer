import { useId, useState } from "react";

import { validateFooter, type FooterEntry } from "./footer";
import type { FooterEditorRow } from "./useFooterEditor";

type Props = {
  row: FooterEditorRow;
  canRemove: boolean;
  onChangeRow: (rowUpdate: Partial<FooterEntry>) => void;
  onRemoveRow: () => void;
};

export function FooterRowItem({ row, canRemove, onChangeRow, onRemoveRow }: Props) {
  const errorId = useId();
  const [rowTouched, setRowTouched] = useState(false);
  const { errors } = validateFooter(row);
  const tokenError = rowTouched || row.token.trim() ? errors.token : undefined;
  const valueError = rowTouched ? errors.value : undefined;

  const updateRow = (update: Partial<FooterEntry>) => {
    if (validateFooter({ ...row, ...update }).valid) setRowTouched(false);
    onChangeRow(update);
  };

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: "1fr 1.618fr auto" }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setRowTouched(!validateFooter(row).valid);
        }
      }}
    >
      <input
        name="footer_token"
        aria-label="Footer token"
        aria-invalid={!!tokenError}
        aria-describedby={tokenError ? `${errorId}-token` : undefined}
        value={row.token}
        onChange={(event) => updateRow({ token: event.target.value })}
        placeholder="Refs"
        className="bg-foreground/3 w-full rounded p-2"
      />

      <input
        name="footer_value"
        aria-label="Footer value"
        aria-invalid={!!valueError}
        aria-describedby={valueError ? `${errorId}-value` : undefined}
        value={row.value}
        onChange={(event) => updateRow({ value: event.target.value })}
        placeholder="#123"
        className="bg-foreground/3 w-full rounded p-2"
      />

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onRemoveRow}
          className="disabled:bg-foreground/3 disabled:text-foreground/50 dark:disabled:bg-foreground/3 dark:disabled:text-foreground/50 cursor-pointer rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-900 disabled:cursor-not-allowed disabled:active:translate-y-0 motion-safe:transition motion-safe:active:translate-y-px dark:bg-red-900 dark:text-red-100"
          disabled={!canRemove}
        >
          Remove
        </button>
      </div>

      {(tokenError || valueError) && (
        <div className="col-span-full">
          {tokenError && (
            <p id={`${errorId}-token`} className="text-sm text-red-500">
              {tokenError}
            </p>
          )}
          {valueError && (
            <p id={`${errorId}-value`} className="text-sm text-red-500">
              {valueError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
