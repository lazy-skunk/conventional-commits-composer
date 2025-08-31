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
        className={`border rounded w-full p-1 bg-background text-foreground
          ${isTokenInvalid(row.token) ? "border-red-500" : ""}`}
      />

      <input
        name="footer_value"
        value={row.value}
        onChange={(event) => onChangeRow({ value: event.target.value })}
        placeholder="Value"
        className="border rounded w-full p-1 bg-background text-foreground"
      />

      <div className="flex gap-1">
        <button
          type="button"
          onClick={onAddRowAfter}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 text-center"
        >
          +
        </button>
        <button
          type="button"
          onClick={onRemoveRow}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 text-center"
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
