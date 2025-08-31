"use client";

import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../utils/clipboard";

type Props = { text: string };

export default function CopyButton({ text }: Props) {
  const [clicked, setClicked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    setClicked(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setClicked(false);
      timerRef.current = null;
    }, 300);

    void copyToClipboard(text);
  };

  return (
    <div className="rounded bg-gradient-to-r from-pink-500 to-violet-500 p-1">
      <button
        type="button"
        onClick={handleClick}
        className={`w-full rounded p-2 transition-colors duration-150 text-foreground font-black text-xl ${
          clicked ? "bg-accent" : "bg-background hover:bg-accent"
        }`}
      >
        COPY
      </button>
    </div>
  );
}
