"use client";

type Props = {
  description: string;
  onChangeDescription: (description: string) => void;
};

export default function DescriptionInput({
  description,
  onChangeDescription,
}: Props) {
  return (
    <div>
      <label htmlFor="description" className="block font-bold">
        Description
      </label>

      <input
        id="description"
        value={description}
        onChange={(event) => onChangeDescription(event.target.value)}
        className="border rounded w-full p-1 bg-background text-foreground"
        placeholder="Short summary of the code changes"
        required
      />
    </div>
  );
}
