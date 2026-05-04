"use client";

type Props = {
  description: string;
  onChangeDescription: (description: string) => void;
};

export default function DescriptionInput({ description, onChangeDescription }: Props) {
  return (
    <div>
      <label htmlFor="description" className="font-bold">
        Description
      </label>

      <input
        id="description"
        value={description}
        onChange={(event) => onChangeDescription(event.target.value)}
        className="rounded bg-foreground/5 w-full p-2"
        placeholder="Short summary of the code changes"
        required
      />
    </div>
  );
}
