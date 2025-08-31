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
      className="w-full border rounded mt-1 p-1 bg-background text-foreground"
      rows={2}
      placeholder="Describe the breaking change"
      required
    />
  );
}
