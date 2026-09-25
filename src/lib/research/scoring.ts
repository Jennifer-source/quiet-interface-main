import { MAX_MARKS } from "@/lib/study";
import { targetStatementIds } from "./targetStatements";
import type { DocumentScore } from "./types";

/**
 * Score a set of selected statements against the predetermined targets.
 * Never surfaced to participants — used by the researcher view and the
 * future persistence layer only.
 */
export function scoreDocument(selectedIds: string[]): DocumentScore {
  const selected = new Set(selectedIds);

  let correctCount = 0;
  let incorrectCount = 0;
  for (const id of selected) {
    if (targetStatementIds.includes(id)) correctCount += 1;
    else incorrectCount += 1;
  }

  const missedCount = targetStatementIds.filter((id) => !selected.has(id))
    .length;

  const totalSelected = selected.size;
  const requirementSatisfied =
    totalSelected === MAX_MARKS &&
    correctCount === targetStatementIds.length &&
    missedCount === 0;

  return {
    correctCount,
    incorrectCount,
    missedCount,
    totalSelected,
    requirementSatisfied,
  };
}
