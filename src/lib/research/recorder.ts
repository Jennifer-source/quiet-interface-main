import type { Condition } from "@/lib/study";
import { scoreDocument } from "./scoring";
import { completeSession, startSession, syncSession } from "./store";
import {
  conditionOrders,
  type ResearchSession,
  type StepId,
  type TaskEvent,
  type TaskEventType,
} from "./types";

/**
 * The recording surface used by the task runner. All methods tolerate a
 * missing session — recording is best-effort and must never break the task.
 * Note contents are never recorded, only their length.
 */
export class TaskRecorder {
  private session: ResearchSession | null = null;
  private events: TaskEvent[] = [];
  private currentStep: StepId = "document";

  /** Keep event records attributed to the step the participant is on. */
  setStep(step: StepId): void {
    this.currentStep = step;
  }

  /** Begin a new session with a fixed, researcher-controlled order. */
  begin(conditionOrder: "A" | "B"): void {
    this.events = [];
    this.session = startSession(conditionOrder);
    this.record("task_started", "document", conditionOrders[conditionOrder][0]);
  }

  /** Events are recorded for research only; they never reach the task UI. */
  private record(type: TaskEventType, step: StepId, condition: Condition) {
    this.events.push({ type, timestamp: Date.now(), step, condition });
  }

  conditionStarted(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    const now = Date.now();
    step.startedAt = now;
    step.documentStartedAt = now;

    this.record("condition_started", "document", condition);
    this.record("document_opened", "document", condition);
    syncSession(this.session);
  }

  statementToggled(
    condition: Condition,
    id: string,
    isNowSelected: boolean,
  ): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];

    const selected = step.selectedStatementIds.filter((value) => value !== id);
    if (isNowSelected) selected.push(id);
    step.selectedStatementIds = selected;
    step.interactionCount += 1;

    this.record(
      isNowSelected ? "statement_selected" : "statement_deselected",
      "document",
      condition,
    );
    syncSession(this.session);
  }

  documentCleared(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    step.selectedStatementIds = [];
    step.interactionCount += 1;
    syncSession(this.session);
  }

  /** Record a refusal to mark a fourth statement. */
  selectionBlocked(condition: Condition): void {
    if (!this.session) return;
    this.session.conditionSteps[condition].errorCount += 1;
    syncSession(this.session);
  }

  noteStarted(condition: Condition, initialLength: number): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    if (step.noteStartedAt !== null) return; // re-entries keep the first entry
    step.noteStartedAt = Date.now();
    step.noteLength = initialLength;
    step.interactionCount += 1;

    this.record("note_started", "note", condition);
    syncSession(this.session);
  }

  noteUpdated(condition: Condition, length: number): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    step.noteLength = length;
    step.interactionCount += 1;
    this.record("note_updated", "note", condition);
    syncSession(this.session);
  }

  reviewOpened(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    if (step.reviewStartedAt === null) {
      step.reviewStartedAt = Date.now();
    }
    this.record("review_opened", "review", condition);
    syncSession(this.session);
  }

  navigation(condition: Condition, direction: "next" | "previous"): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    step.navigationCount += 1;

    this.record(
      direction === "next" ? "navigation_next" : "navigation_previous",
      this.currentStep,
      condition,
    );
    syncSession(this.session);
  }

  /** Score the document step when the participant leaves it for the note. */
  documentCompleted(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    const now = Date.now();
    step.documentCompletedAt = now;
    step.score = scoreDocument(step.selectedStatementIds);
    syncSession(this.session);
  }

  noteCompleted(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    step.noteCompletedAt = Date.now();
    syncSession(this.session);
  }

  reviewCompleted(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    step.reviewCompletedAt = Date.now();
    syncSession(this.session);
  }

  /** Submit for one condition; rescore in case marks changed before submit. */
  taskSubmitted(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];

    step.score = scoreDocument(step.selectedStatementIds);
    this.record("task_submitted", "review", condition);
    syncSession(this.session);
  }

  /** Close out a condition's recording once its confirmation is dismissed. */
  conditionCompleted(condition: Condition): void {
    if (!this.session) return;
    const step = this.session.conditionSteps[condition];
    step.completedAt = Date.now();
    step.score = scoreDocument(step.selectedStatementIds);
    this.record("task_completed", "review", condition);
    syncSession(this.session);
  }

  /** Mark the whole session complete and deliver it to the sink. */
  sessionCompleted(): void {
    if (!this.session) return;
    this.session = completeSession(this.session);
  }

  /** Latest snapshot for the researcher view. */
  snapshot(): ResearchSession | null {
    return this.session;
  }

  /** Read-only event log for the researcher view. */
  getEventLog(): TaskEvent[] {
    return [...this.events];
  }

  /** The condition currently being worked on, or null when all are done. */
  get activeCondition(): Condition | null {
    if (!this.session) return null;
    const order = conditionOrders[this.session.conditionOrder];
    return (
      order.find(
        (condition) =>
          this.session!.conditionSteps[condition].completedAt === null,
      ) ?? null
    );
  }
}
