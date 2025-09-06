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
    <fieldset>
      <legend className="font-bold">Footer (optional)</legend>

      <div className="rounded bg-foreground/5 w-full p-2">
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
