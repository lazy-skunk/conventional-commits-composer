export function validateComment(input: { label: string; decorations: string; subject: string }) {
  const errors = {
    label: !/^[\p{L}\p{N}_-]+$/u.test(input.label.trim())
      ? "Use a word label without spaces or separators."
      : undefined,
    decorations: /[():\r\n]/.test(input.decorations)
      ? "Do not include parentheses, colons, or line breaks in decorations."
      : undefined,
    subject: !input.subject.trim() ? "Subject is required." : undefined,
  };
  return { errors, valid: Object.values(errors).every((error) => !error) };
}
