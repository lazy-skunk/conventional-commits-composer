"use client";

type Props = {
  body: string;
  onChangeBody: (body: string) => void;
};

export default function BodyInput({ body, onChangeBody }: Props) {
  return (
    <div>
      <label htmlFor="body" className="block font-bold">
        Body (optional)
      </label>

      <textarea
        id="body"
        value={body}
        onChange={(event) => onChangeBody(event.target.value)}
        className="border rounded w-full p-1"
        rows={3}
        placeholder="Additional contextual information about the code changes"
      />
    </div>
  );
}
