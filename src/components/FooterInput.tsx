import { useFooterEditor } from "../hooks/useFooterEditor";
import FooterRowItem from "./FooterRowItem";

type Props = {
  initialFooter: string;
  onChangeFooter: (footer: string) => void;
};

export default function FooterInput({ initialFooter, onChangeFooter }: Props) {
  const { rows, addRowAfter, removeRow, updateRow } = useFooterEditor(
    initialFooter,
    onChangeFooter,
  );

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
