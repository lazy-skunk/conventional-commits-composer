export function normalize(input?: string): string {
  return (input ?? "").trim();
}

export function joinNonEmpty(
  parts: Array<string | undefined>,
  separator: string,
): string {
  return parts.filter(Boolean).join(separator);
}
