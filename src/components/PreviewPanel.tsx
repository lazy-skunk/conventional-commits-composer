type Props = { commitMessage: string; children?: React.ReactNode };

export default function PreviewPanel({ commitMessage, children }: Props) {
  return (
    <section>
      <h2 className="font-bold">Preview</h2>
      <div className="bg-foreground/3 rounded p-2">
        <pre className="break-words whitespace-pre-wrap">{commitMessage}</pre>
        <div className="flex justify-end">{children}</div>
      </div>
    </section>
  );
}
