"use client";

type Props = { commitMessage: string; children?: React.ReactNode };

export default function PreviewPanel({ commitMessage, children }: Props) {
  return (
    <section>
      <h2 className="font-bold">Preview</h2>
      <div className="bg-foreground/5 rounded p-2">
        <pre className="whitespace-pre-wrap break-words">{commitMessage}</pre>
        <div className="flex justify-end">{children}</div>
      </div>
    </section>
  );
}
