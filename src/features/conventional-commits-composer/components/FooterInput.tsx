"use client";

import { useFooterEditor } from "../hooks/useFooterEditor";
import FooterRowItem from "./FooterRowItem";

type Props = {
  footer: string;
  onChangeFooter: (footer: string) => void;
};

export default function FooterInput({ footer, onChangeFooter }: Props) {
  const { rows, addRowAfter, removeRow, updateRow } = useFooterEditor(
    footer,
    onChangeFooter
  );

  return (
    <fieldset className="border rounded px-2 pb-1">
      <legend className="font-bold px-1">Footer (optional)</legend>

      <div className="space-y-1">
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
