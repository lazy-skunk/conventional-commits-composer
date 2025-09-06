"use client";

type Props = {
  breakingChangeDescription: string;
  onChangeBreakingChangeDescription: (description: string) => void;
};

export default function BreakingChangeDescriptionInput({
  breakingChangeDescription,
  onChangeBreakingChangeDescription,
}: Props) {
  return (
    <textarea
      value={breakingChangeDescription}
      name="breaking_change_description"
      onChange={(event) =>
        onChangeBreakingChangeDescription(event.target.value)
      }
      className="rounded bg-background text-foreground w-full p-2"
      rows={2}
      placeholder="Describe the breaking change"
      required
    />
  );
}
