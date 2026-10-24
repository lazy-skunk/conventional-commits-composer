export const COMMENT_LABEL_OPTIONS = [
  { value: "praise", description: "Praises highlight something positive." },
  { value: "nitpick", description: "Nitpicks are trivial preference-based requests." },
  { value: "suggestion", description: "Suggestions propose improvements to the current subject." },
  {
    value: "issue",
    description: "Issues highlight specific problems with the subject under review.",
  },
  { value: "todo", description: "TODO’s are small, trivial, but necessary changes." },
  {
    value: "question",
    description:
      "Questions are appropriate if you have a potential concern but are not quite sure if it’s relevant or not.",
  },
  { value: "thought", description: "Thoughts represent an idea that popped up from reviewing." },
  {
    value: "chore",
    description:
      "Chores are simple tasks that must be done before the subject can be “officially” accepted.",
  },
  {
    value: "note",
    description:
      "Notes are always non-blocking and simply highlight something the reader should take note of.",
  },
] as const;

export type CommentLabel = string;

export function composeConventionalComment({
  label,
  decorations,
  subject,
  discussion,
}: {
  label: CommentLabel;
  decorations: string;
  subject: string;
  discussion: string;
}) {
  const summary = subject.trim().replace(/\s*\r?\n\s*/g, " ");
  const tags = [
    ...new Set(
      decorations
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ];
  const prefix = tags.length ? `${label.trim()} (${tags.join(",")})` : label.trim();
  return `${prefix}: ${summary}${discussion.trim() ? `\n\n${discussion.trim()}` : ""}`;
}
