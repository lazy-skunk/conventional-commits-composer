import { generateId } from "../lib/id";
import { useState } from "react";
import { parseFooters, serializeFooters, type FooterEntry } from "../lib/footer";

export type FooterEditorRow = FooterEntry & { id: string };

function createEmptyFooterRow(): FooterEditorRow {
  return { id: generateId(), token: "", value: "" };
}

function createFooterRows(footerString: string): FooterEditorRow[] {
  const rows = parseFooters(footerString).map((footerEntry) => ({
    id: generateId(),
    ...footerEntry,
  }));

  return rows.length ? rows : [createEmptyFooterRow()];
}

export function useFooterEditor(
  initialFooterString: string,
  onChangeFooterString: (footerString: string) => void,
) {
  const [rows, setRows] = useState<FooterEditorRow[]>(() => createFooterRows(initialFooterString));

  const replaceRows = (nextRows: FooterEditorRow[]) => {
    setRows(nextRows);
    onChangeFooterString(serializeFooters(nextRows));
  };

  const addRowAfter = (referenceRowId?: string) => {
    const nextRows = [...rows];

    if (!referenceRowId) {
      nextRows.push(createEmptyFooterRow());
      replaceRows(nextRows);
      return;
    }

    const targetIndex = nextRows.findIndex((row) => row.id === referenceRowId);
    nextRows.splice(targetIndex + 1, 0, createEmptyFooterRow());
    replaceRows(nextRows);
  };

  const removeRow = (rowId: string) =>
    replaceRows(rows.length <= 1 ? rows : rows.filter((row) => row.id !== rowId));

  const updateRow = (rowId: string, updatedFields: Partial<FooterEntry>) =>
    replaceRows(rows.map((row) => (row.id === rowId ? { ...row, ...updatedFields } : row)));

  return {
    rows,
    addRowAfter,
    removeRow,
    updateRow,
  };
}
