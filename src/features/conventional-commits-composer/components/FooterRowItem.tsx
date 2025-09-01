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
      className="grid gap-2 pb-1"
      style={{ gridTemplateColumns: "1fr 1.618fr auto" }}
    >
      <input
        name="footer_token"
        value={row.token}
        onChange={(event) => onChangeRow({ token: event.target.value })}
        placeholder="Token"
        className={`border rounded w-full p-1 ${
          isTokenInvalid(row.token) ? "border-red-500" : ""
        }`}
      />

      <input
        name="footer_value"
        value={row.value}
        onChange={(event) => onChangeRow({ value: event.target.value })}
        placeholder="Value"
        className="border rounded w-full p-1"
      />

      <div className="flex gap-1 items-center">
        <button
          type="button"
          onClick={onAddRowAfter}
          className="border rounded-full h-7 w-7 hover:bg-foreground/10"
        >
          +
        </button>
        <button
          type="button"
          onClick={onRemoveRow}
          className="border rounded-full h-7 w-7 hover:bg-foreground/10 disabled:opacity-50 disabled:hover:bg-transparent"
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
