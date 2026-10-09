export type FooterEntry = { token: string; value: string };

import { trimOrEmpty } from "./text";

const BREAKING_CHANGE_TOKENS = new Set(["BREAKING CHANGE", "BREAKING-CHANGE"]);

function isWhitespaceAllowedForBreakingChangeToken(token: string): boolean {
  const normalizedToken = trimOrEmpty(token);
  return BREAKING_CHANGE_TOKENS.has(normalizedToken);
}

export function isTokenInvalid(token: string): boolean {
  if (isWhitespaceAllowedForBreakingChangeToken(token)) return false;
  const normalizedToken = trimOrEmpty(token);
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

  const validRows = rows.filter((row) => {
    const normalizedToken = trimOrEmpty(row.token);
    const normalizedValue = trimOrEmpty(row.value);
    if (!normalizedToken || !normalizedValue) return false;
    if (isTokenInvalid(normalizedToken)) return false;
    return true;
  });

  if (!validRows.length) return "";

  return validRows.map((row) => `${trimOrEmpty(row.token)}: ${trimOrEmpty(row.value)}`).join("\n");
}
