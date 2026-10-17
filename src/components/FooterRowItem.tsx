import type { FooterEditorRow } from "../hooks/useFooterEditor";
import { isFooterTokenInvalid, type FooterEntry } from "../lib/footer";

type Props = {
  row: FooterEditorRow;
  canRemove: boolean;
  onChangeRow: (rowUpdate: Partial<FooterEntry>) => void;
  onRemoveRow: () => void;
};

export default function FooterRowItem({ row, canRemove, onChangeRow, onRemoveRow }: Props) {
  const tokenMissing = !row.token.trim() && !!row.value.trim();
  const valueMissing = !!row.token.trim() && !row.value.trim();
  const tokenInvalid = isFooterTokenInvalid(row.token);

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1.618fr auto" }}>
      <input
        name="footer_token"
        value={row.token}
        onChange={(event) => onChangeRow({ token: event.target.value })}
        placeholder="Token"
        className={`bg-foreground/3 w-full rounded p-2 ${tokenInvalid ? "border border-red-500" : ""}`}
      />

      <input
        name="footer_value"
        value={row.value}
        onChange={(event) => onChangeRow({ value: event.target.value })}
        placeholder="Value"
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

      {(tokenMissing || valueMissing || tokenInvalid) && (
        <div className="col-span-3">
          {tokenMissing && <p className="text-red-500">Token is required</p>}
          {valueMissing && <p className="text-red-500">Value is required</p>}
          {tokenInvalid && (
            <p className="text-red-500">
              A footer’s token MUST use - in place of whitespace characters
            </p>
          )}
        </div>
      )}
    </div>
  );
}
