import type { Condition } from "@/lib/study";

/** The two counterbalanced presentation orders. */
export type ConditionOrder = "A" | "B";

/** Order A: Conventional → Quiet. Order B: Quiet → Conventional. */
export const conditionOrders: Record<ConditionOrder, Condition[]> = {
  A: ["conventional", "quiet"],
  B: ["quiet", "conventional"],
};

/** Scoring of the document step against the (hidden) answer key. */
export type DocumentScore = {
  correctCount: number;
  incorrectCount: number;
  missedCount: number;
  totalSelected: number;
  requirementSatisfied: boolean;
};

/** A completed or in-progress anonymous session. */
export type ResearchSession = {
  sessionId: string;
  conditionOrder: ConditionOrder;
  startedAt: number;
  completedAt: number | null;

  /** Steps, indexed by condition, for both conditions of the session. */
  conditionSteps: Record<Condition, SessionConditionStep>;
};

export type SessionConditionStep = {
  startedAt: number | null;
  completedAt: number | null;
  selectedStatementIds: string[];
  score: DocumentScore | null;

  documentStartedAt: number | null;
  documentCompletedAt: number | null;
  noteStartedAt: number | null;
  noteCompletedAt: number | null;
  reviewStartedAt: number | null;
  reviewCompletedAt: number | null;

  noteLength: number;
  interactionCount: number;
  navigationCount: number;
  errorCount: number;
};

export function emptyConditionStep(): SessionConditionStep {
  return {
    startedAt: null,
    completedAt: null,
    selectedStatementIds: [],
    score: null,
    documentStartedAt: null,
    documentCompletedAt: null,
    noteStartedAt: null,
    noteCompletedAt: null,
    reviewStartedAt: null,
    reviewCompletedAt: null,
    noteLength: 0,
    interactionCount: 0,
    navigationCount: 0,
    errorCount: 0,
  };
}

/** Anonymous measurement events. Note contents are never recorded. */
export type TaskEventType =
  | "task_started"
  | "condition_started"
  | "document_opened"
  | "statement_selected"
  | "statement_deselected"
  | "note_started"
  | "note_updated"
  | "review_opened"
  | "navigation_next"
  | "navigation_previous"
  | "task_submitted"
  | "task_completed";

export type StepId = "document" | "note" | "review";

export type TaskEvent = {
  type: TaskEventType;
  timestamp: number;
  step: StepId;
  condition: Condition;
};
