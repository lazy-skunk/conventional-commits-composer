export function generateId(): string {
  const g = typeof globalThis !== "undefined" ? globalThis : undefined;
  const uuid = g?.crypto?.randomUUID?.();
  if (uuid) return uuid;
  return Math.random().toString(36).slice(2, 10);
}
