import { isTokenInvalid } from "../domain";
import type { FooterEditorRow } from "../hooks/useFooterEditor";

type Props = {
  row: FooterEditorRow;
  canRemove: boolean;
  onChangeRow: (rowUpdate: Partial<FooterEditorRow>) => void;
  onAddRowAfter: () => void;
  onRemoveRow: () => void;
};

export default function FooterRowItem({
  row,
  canRemove,
  onChangeRow,
  onAddRowAfter,
  onRemoveRow,
}: Props) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: "1fr 1.618fr auto" }}
    >
      <input
        name="footer_token"
        value={row.token}
        onChange={(event) => onChangeRow({ token: event.target.value })}
        placeholder="Token"
        className={`rounded bg-background text-foreground w-full p-2 ${
          isTokenInvalid(row.token) ? "border-red-500" : ""
        }`}
      />

      <input
        name="footer_value"
        value={row.value}
        onChange={(event) => onChangeRow({ value: event.target.value })}
        placeholder="Value"
        className="rounded bg-background text-foreground w-full p-2"
      />

      <div className="flex gap-1 items-center">
        <button
          type="button"
          onClick={onAddRowAfter}
          className="rounded-full h-7 w-7 hover:bg-green-500/50"
        >
          +
        </button>
        <button
          type="button"
          onClick={onRemoveRow}
          className="rounded-full h-7 w-7 hover:bg-red-500/50 disabled:opacity-50 disabled:hover:bg-transparent"
          disabled={!canRemove}
        >
          ×
        </button>
      </div>

      {isTokenInvalid(row.token) && (
        <div className="col-span-3">
          <p className="text-red-500">
            A footer’s token MUST use - in place of whitespace characters
          </p>
        </div>
      )}
    </div>
  );
}
