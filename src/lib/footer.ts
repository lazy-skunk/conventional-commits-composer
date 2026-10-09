import { trimOrEmpty } from "./text";

export type FooterEntry = { token: string; value: string };

const BREAKING_CHANGE_TOKENS = new Set(["BREAKING CHANGE", "BREAKING-CHANGE"]);

export function isFooterTokenInvalid(token: string): boolean {
  const normalizedToken = trimOrEmpty(token);
  if (BREAKING_CHANGE_TOKENS.has(normalizedToken)) return false;
  return /\s/.test(normalizedToken);
}

export function parseFooters(input: string): FooterEntry[] {
  if (!input) return [];

  return input.split(/\r?\n/).map((line) => {
    const delimiterIndex = line.indexOf(": ");
    const tokenPart = delimiterIndex >= 0 ? line.slice(0, delimiterIndex) : line;
    const valuePart = delimiterIndex >= 0 ? line.slice(delimiterIndex + 2) : "";
    return { token: trimOrEmpty(tokenPart), value: trimOrEmpty(valuePart) };
  });
}

export function serializeFooters(rows: FooterEntry[]): string {
  if (!rows?.length) return "";

  return rows
    .map(({ token, value }) => ({ token: trimOrEmpty(token), value: trimOrEmpty(value) }))
    .filter(({ token, value }) => token && value && !isFooterTokenInvalid(token))
    .map(({ token, value }) => `${token}: ${value}`)
    .join("\n");
}
