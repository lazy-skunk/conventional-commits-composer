"use client";

type Props = {
  scope: string;
  onChangeScope: (scope: string) => void;
};

export default function ScopeInput({ scope, onChangeScope }: Props) {
  return (
    <div>
      <label htmlFor="scope" className="block font-bold">
        Scope (optional)
      </label>

      <input
        id="scope"
        value={scope}
        onChange={(event) => onChangeScope(event.target.value)}
        className="border rounded w-full p-1 bg-background text-foreground"
        placeholder="MUST consist of a noun describing a section of the codebase"
      />
    </div>
  );
}
