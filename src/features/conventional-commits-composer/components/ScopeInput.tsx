"use client";

type Props = {
  scope: string;
  onChangeScope: (scope: string) => void;
};

export default function ScopeInput({ scope, onChangeScope }: Props) {
  return (
    <div>
      <label htmlFor="scope" className="font-bold">
        Scope (optional)
      </label>

      <input
        id="scope"
        value={scope}
        onChange={(event) => onChangeScope(event.target.value)}
        className="rounded bg-foreground/5 w-full p-2"
        placeholder="MUST consist of a noun describing a section of the codebase"
      />
    </div>
  );
}
