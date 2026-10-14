type Props = { commitMessage: string; children?: React.ReactNode };

export default function PreviewPanel({ commitMessage, children }: Props) {
  return (
    <section>
      <h2 className="font-bold">Preview</h2>
      <div className="rounded bg-gray-800/50 p-2">
        <pre className="break-words whitespace-pre-wrap">{commitMessage}</pre>
        <div className="flex justify-end">{children}</div>
      </div>
    </section>
  );
}
