import type { FooterEditorRow } from "../hooks/useFooterEditor";
import type { FooterEntry } from "../lib/footer";
import FooterRowItem from "./FooterRowItem";

type Props = {
  rows: FooterEditorRow[];
  addRowAfter: (referenceRowId?: string) => void;
  removeRow: (rowId: string) => void;
  updateRow: (rowId: string, updatedFields: Partial<FooterEntry>) => void;
};

export default function FooterInput({ rows, addRowAfter, removeRow, updateRow }: Props) {
  return (
    <fieldset>
      <legend className="font-bold">Footer (optional)</legend>

      <div className="rounded bg-zinc-500/10 w-full p-2 space-y-2">
        {rows.map((row) => (
          <FooterRowItem
            key={row.id}
            row={row}
            canRemove={rows.length > 1}
            onChangeRow={(rowUpdate) => updateRow(row.id, rowUpdate)}
            onAddRowAfter={() => addRowAfter(row.id)}
            onRemoveRow={() => removeRow(row.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
