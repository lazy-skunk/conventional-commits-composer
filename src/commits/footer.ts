import { trimOrEmpty } from "./text";

export type FooterEntry = { token: string; value: string };

const BREAKING_CHANGE_TOKENS = new Set(["BREAKING CHANGE", "BREAKING-CHANGE"]);

export function isFooterTokenInvalid(token: string): boolean {
  const normalizedToken = trimOrEmpty(token);
  if (BREAKING_CHANGE_TOKENS.has(normalizedToken)) return false;
  return normalizedToken !== "" && !/^[\p{L}\p{N}_-]+$/u.test(normalizedToken);
}

export function serializeFooters(rows: FooterEntry[]): string {
  if (!rows?.length) return "";

  return rows
    .map(({ token, value }) => ({
      token: trimOrEmpty(token),
      value: trimOrEmpty(value),
    }))
    .filter(({ token, value }) => token && value && !isFooterTokenInvalid(token))
    .map(({ token, value }) => `${token}: ${value}`)
    .join("\n");
}

export function validateFooter({ token, value }: FooterEntry) {
  const errors = {
    token:
      !token.trim() && !!value.trim()
        ? "Token is required."
        : isFooterTokenInvalid(token)
          ? "Use a word token with hyphens instead of spaces, or BREAKING CHANGE. Do not include the separator."
          : undefined,
    value: !!token.trim() && !value.trim() ? "Value is required." : undefined,
  };
  return { errors, valid: Object.values(errors).every((error) => !error) };
}
