"use client";

import { useEffect, useState } from "react";
import { isTokenInvalid } from "../domain";
import type { FooterEditorRow } from "../hooks/useFooterEditor";

type Props = {
  row: FooterEditorRow;
  canRemove: boolean;
  onChangeRow: (rowUpdate: Partial<FooterEditorRow>) => void;
  onAddRowAfter: () => void;
  onRemoveRow: () => void;
  isEnterAnimationDisabled?: boolean;
};

export default function FooterRowItem({
  row,
  canRemove,
  onChangeRow,
  onAddRowAfter,
  onRemoveRow,
  isEnterAnimationDisabled = false,
}: Props) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setHasMounted(true);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRemoveClick = () => {
    if (!canRemove) return;
    setIsRemoving(true);
  };

  const baseClass = "grid gap-2 transition duration-200";

  const isInitialEnterFrame =
    !isEnterAnimationDisabled && !isRemoving && !hasMounted;
  let motionClass = "";
  if (isRemoving) {
    motionClass = "opacity-0 -translate-y-1";
  } else if (isEnterAnimationDisabled) {
    motionClass = "opacity-100";
  } else if (hasMounted) {
    motionClass = "opacity-100 translate-y-0";
  } else if (isInitialEnterFrame) {
    motionClass = "opacity-0 -translate-y-1";
  }

  return (
    <div
      className={[baseClass, motionClass].filter(Boolean).join(" ")}
      style={{ gridTemplateColumns: "1fr 1.618fr auto" }}
      onTransitionEnd={() => {
        if (isRemoving) onRemoveRow();
      }}
    >
      <input
        name="footer_token"
        value={row.token}
        onChange={(event) => onChangeRow({ token: event.target.value })}
        placeholder="Token"
        className={`rounded bg-background text-foreground w-full p-2 ${
          isTokenInvalid(row.token) ? "border-red-500" : ""
        }`}
      />

      <input
        name="footer_value"
        value={row.value}
        onChange={(event) => onChangeRow({ value: event.target.value })}
        placeholder="Value"
        className="rounded bg-background text-foreground w-full p-2"
      />

      <div className="flex gap-1 items-center">
        <button
          type="button"
          onClick={onAddRowAfter}
          className="rounded-full h-7 w-7 cursor-pointer transition hover:bg-green-500/50 active:scale-95"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleRemoveClick}
          className={[
            "rounded-full h-7 w-7 transition",
            canRemove
              ? "cursor-pointer hover:bg-red-500/50 active:scale-95"
              : "opacity-50 cursor-not-allowed pointer-events-none",
          ].join(" ")}
          disabled={!canRemove}
        >
          ×
        </button>
      </div>

      {isTokenInvalid(row.token) && (
        <div className="col-span-3">
          <p className="text-red-500">
            A footer’s token MUST use - in place of whitespace characters
          </p>
        </div>
      )}
    </div>
  );
}
