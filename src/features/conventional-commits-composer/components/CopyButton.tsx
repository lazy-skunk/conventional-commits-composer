"use client";

import { copyToClipboard } from "../utils/clipboard";

type Props = { text: string };

export default function CopyButton({ text }: Props) {
  return (
    <button
      type="button"
      onClick={() => void copyToClipboard(text)}
      className="border rounded-full p-2 hover:bg-foreground/10 active:bg-foreground/20 active:scale-95"
    >
      COPY
    </button>
  );
}
