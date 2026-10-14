import type { FooterEditorRow } from "../hooks/useFooterEditor";
import type { FooterEntry } from "../lib/footer";
import FooterRowItem from "./FooterRowItem";

type Props = {
  rows: FooterEditorRow[];
  addRow: () => void;
  removeRow: (rowId: string) => void;
  updateRow: (rowId: string, updatedFields: Partial<FooterEntry>) => void;
};

export default function FooterInput({ rows, addRow, removeRow, updateRow }: Props) {
  return (
    <fieldset>
      <legend className="font-bold">Footer (optional)</legend>

      <div className="w-full space-y-2 rounded bg-gray-800/50 p-2">
        {rows.map((row) => (
          <FooterRowItem
            key={row.id}
            row={row}
            canRemove={rows.length > 1}
            onChangeRow={(rowUpdate) => updateRow(row.id, rowUpdate)}
            onRemoveRow={() => removeRow(row.id)}
          />
        ))}

        <button
          type="button"
          onClick={addRow}
          className="cursor-pointer rounded bg-green-900/50 px-3 py-1.5 transition hover:bg-green-900 active:scale-95"
        >
          Add footer
        </button>
      </div>
    </fieldset>
  );
}
