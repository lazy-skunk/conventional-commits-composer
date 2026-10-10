import { isFooterTokenInvalid, type FooterEntry } from "../lib/footer";
import type { FooterEditorRow } from "../hooks/useFooterEditor";

type Props = {
  row: FooterEditorRow;
  canRemove: boolean;
  onChangeRow: (rowUpdate: Partial<FooterEntry>) => void;
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
        className={`rounded bg-zinc-800 text-zinc-100 w-full p-2 ${
          tokenInvalid ? "border-red-500" : ""
        }`}
      />

      <input
        name="footer_value"
        value={row.value}
        onChange={(event) => onChangeRow({ value: event.target.value })}
        placeholder="Value"
        className="rounded bg-zinc-800 text-zinc-100 w-full p-2"
      />

      <div className="flex gap-1 items-center">
        <button
          type="button"
          onClick={onAddRowAfter}
          className="rounded-full h-7 w-7 cursor-pointer transition hover:bg-green-500/50 active:scale-95"
        >
          +
        </button>
        <button
          type="button"
          onClick={onRemoveRow}
          className={[
            "rounded-full h-7 w-7 transition",
            canRemove
              ? "cursor-pointer hover:bg-red-500/50 active:scale-95"
              : "opacity-50 cursor-not-allowed pointer-events-none",
          ].join(" ")}
          disabled={!canRemove}
        >
          ×
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
