import { generateId } from "../lib/id";
import { useState } from "react";
import { serializeFooters, type FooterEntry } from "../lib/footer";

export type FooterEditorRow = FooterEntry & { id: string };

function createEmptyFooterRow(): FooterEditorRow {
  return { id: generateId(), token: "", value: "" };
}

export function useFooterEditor() {
  const [rows, setRows] = useState<FooterEditorRow[]>(() => [createEmptyFooterRow()]);

  const replaceRows = (nextRows: FooterEditorRow[]) => setRows(nextRows);

  const addRowAfter = (referenceRowId?: string) => {
    const nextRows = [...rows];

    if (!referenceRowId) {
      nextRows.push(createEmptyFooterRow());
      replaceRows(nextRows);
      return;
    }

    const targetIndex = nextRows.findIndex((row) => row.id === referenceRowId);
    if (targetIndex === -1) return;

    nextRows.splice(targetIndex + 1, 0, createEmptyFooterRow());
    replaceRows(nextRows);
  };

  const removeRow = (rowId: string) =>
    replaceRows(rows.length <= 1 ? rows : rows.filter((row) => row.id !== rowId));

  const updateRow = (rowId: string, updatedFields: Partial<FooterEntry>) =>
    replaceRows(rows.map((row) => (row.id === rowId ? { ...row, ...updatedFields } : row)));

  return {
    rows,
    footer: serializeFooters(rows),
    addRowAfter,
    removeRow,
    updateRow,
  };
}
