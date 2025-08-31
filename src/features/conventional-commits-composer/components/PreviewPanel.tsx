"use client";

type Props = { commitMessage: string };

export default function PreviewPanel({ commitMessage }: Props) {
  return (
    <section>
      <h2 className="text-lg font-bold">Preview</h2>

      <pre className="border rounded p-2 whitespace-pre-wrap break-words">
        {commitMessage}
      </pre>
    </section>
  );
}
