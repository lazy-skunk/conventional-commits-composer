import { generateId } from "../lib/id";
import { useState } from "react";
import { parseFooters, serializeFooters } from "../domain/footer";

export type FooterEditorRow = { id: string; token: string; value: string };

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

function serializeFooterRows(rows: FooterEditorRow[]): string {
  return serializeFooters(rows.map(({ token, value }) => ({ token, value })));
}

export function useFooterEditor(
  initialFooterString: string,
  onChangeFooterString: (footerString: string) => void,
) {
  const [rows, setRows] = useState<FooterEditorRow[]>(() => createFooterRows(initialFooterString));

  const replaceRows = (nextRows: FooterEditorRow[]) => {
    setRows(nextRows);
    onChangeFooterString(serializeFooterRows(nextRows));
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

  const updateRow = (rowId: string, updatedFields: Partial<FooterEditorRow>) =>
    replaceRows(rows.map((row) => (row.id === rowId ? { ...row, ...updatedFields } : row)));

  return {
    rows,
    addRowAfter,
    removeRow,
    updateRow,
  };
}
