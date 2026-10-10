import { generateId } from "../lib/id";
import { useState } from "react";
import { serializeFooters, type FooterEntry } from "../lib/footer";

export type FooterEditorRow = FooterEntry & { id: string };

function createEmptyFooterRow(): FooterEditorRow {
  return { id: generateId(), token: "", value: "" };
}

export function useFooterEditor() {
  const [rows, setRows] = useState<FooterEditorRow[]>(() => [createEmptyFooterRow()]);

  const addRow = () => setRows((currentRows) => [...currentRows, createEmptyFooterRow()]);

  const removeRow = (rowId: string) =>
    setRows((currentRows) =>
      currentRows.length <= 1 ? currentRows : currentRows.filter((row) => row.id !== rowId),
    );

  const updateRow = (rowId: string, updatedFields: Partial<FooterEntry>) =>
    setRows((currentRows) =>
      currentRows.map((row) => (row.id === rowId ? { ...row, ...updatedFields } : row)),
    );

  return {
    rows,
    footer: serializeFooters(rows),
    addRow,
    removeRow,
    updateRow,
  };
}
