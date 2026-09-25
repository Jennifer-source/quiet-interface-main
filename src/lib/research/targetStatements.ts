/**
 * Predetermined target statements — the answer key.
 *
 * Kept apart from participant-facing content (`src/lib/study.ts`): the task
 * UI never reads this file, and no component receives target membership as a
 * prop. Participants are never told which statements are targets.
 */
export const targetStatementIds: string[] = [
  "s3",
  "s5",
  "s7",
];
