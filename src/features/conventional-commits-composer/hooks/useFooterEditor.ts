import { generateId } from "@/lib/id";
import { useEffect, useMemo, useRef, useState } from "react";
import { parseFooters, serializeFooters } from "../domain";

export type FooterEditorRow = { id: string; token: string; value: string };

function createEmptyFooterRow(): FooterEditorRow {
  return { id: generateId(), token: "", value: "" };
}

export function useFooterEditor(
  initialFooterString: string,
  onChangeFooterString: (footerString: string) => void,
) {
  const initialRows = useMemo(
    () =>
      parseFooters(initialFooterString).map((footerEntry) => ({
        id: generateId(),
        ...footerEntry,
      })),
    [initialFooterString],
  );

  const [rows, setRows] = useState<FooterEditorRow[]>(
    initialRows.length ? initialRows : [createEmptyFooterRow()],
  );

  const footerString = useMemo(
    () => serializeFooters(rows.map(({ token, value }) => ({ token, value }))),
    [rows],
  );

  const lastEmittedFooterStringRef = useRef<string>(initialFooterString);

  useEffect(() => {
    if (initialFooterString === footerString) return;
    lastEmittedFooterStringRef.current = footerString;
    onChangeFooterString(footerString);
  }, [footerString, initialFooterString, onChangeFooterString]);

  useEffect(() => {
    if (initialFooterString === lastEmittedFooterStringRef.current) return;
    const parsedFooterRows = parseFooters(initialFooterString).map(
      (footerEntry) => ({
        id: generateId(),
        ...footerEntry,
      }),
    );

    setRows((previousRows) => {
      const previousRowsContent = previousRows.map(({ token, value }) => ({
        token,
        value,
      }));
      const nextRowsContent = parsedFooterRows.map(({ token, value }) => ({
        token,
        value,
      }));
      const isSameLength =
        previousRowsContent.length === nextRowsContent.length;
      const isSameContent =
        isSameLength &&
        previousRowsContent.every(
          (row, index) =>
            row.token === nextRowsContent[index]?.token &&
            row.value === nextRowsContent[index]?.value,
        );
      if (isSameContent) return previousRows;
      return parsedFooterRows.length
        ? parsedFooterRows
        : [createEmptyFooterRow()];
    });
  }, [initialFooterString]);

  const addRowAfter = (referenceRowId?: string) =>
    setRows((previousRows) => {
      const nextRows = [...previousRows];
      if (!referenceRowId) nextRows.push(createEmptyFooterRow());
      else {
        const targetIndex = nextRows.findIndex(
          (row) => row.id === referenceRowId,
        );
        nextRows.splice(targetIndex + 1, 0, createEmptyFooterRow());
      }
      return nextRows;
    });

  const removeRow = (rowId: string) =>
    setRows((previousRows) => {
      if (previousRows.length <= 1) return previousRows;
      return previousRows.filter((row) => row.id !== rowId);
    });

  const updateRow = (rowId: string, updatedFields: Partial<FooterEditorRow>) =>
    setRows((previousRows) =>
      previousRows.map((row) =>
        row.id === rowId ? { ...row, ...updatedFields } : row,
      ),
    );

  return {
    rows,
    footerString,
    addRowAfter,
    removeRow,
    updateRow,
  };
}
