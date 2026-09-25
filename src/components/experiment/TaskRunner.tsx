import { useEffect, useRef, useState } from "react";
import { MAX_MARKS, type Condition } from "@/lib/study";
import type { TaskRecorder } from "@/lib/research/recorder";
import { ConventionalTask } from "./ConventionalTask";
import { DocumentPanel } from "./DocumentPanel";
import { QuietTask } from "./QuietTask";
import { TaskConfirmation } from "./TaskConfirmation";
import { NotePanel, ReviewPanel } from "./TaskPanels";
import { taskSteps, type TaskController } from "./taskTypes";

/**
 * Owns the task state for one condition and renders it through the assigned
 * condition frame. The task itself — document, marks, note, steps, submission
 * — is identical in both conditions; only the surrounding interface changes.
 *
 * Research recording is threaded through the same transitions, silently:
 * participants never see timing, counts or scores during the task.
 */
export function TaskRunner({
  recorder,
  condition,
  continueLabel,
  onExit,
  onConditionFinished,
}: {
  recorder: TaskRecorder;
  condition: Condition;
  /** Label for the confirmation's primary action, set by the session flow. */
  continueLabel: string;
  onExit: () => void;
  onConditionFinished: (condition: Condition) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [marks, setMarks] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const conditionStartRecordedRef = useRef(false);
  const noteEntryRecordedRef = useRef(false);
  const reviewEntryRecordedRef = useRef(false);

  useEffect(() => {
    if (conditionStartRecordedRef.current) return;
    conditionStartRecordedRef.current = true;
    recorder.conditionStarted(condition);
  }, [condition, recorder]);

  const hasNote = note.trim().length > 0;
  const marksComplete = marks.length === MAX_MARKS;
  const step = taskSteps[stepIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stepIndex, submitted]);

  function isReachable(index: number) {
    if (index === 0) return true;
    if (index === 1) return marksComplete;
    return marksComplete && hasNote;
  }

  const canContinue = marksComplete && (stepIndex === 0 || hasNote);

  const continueHint = !marksComplete
    ? `Mark ${MAX_MARKS} statements to continue.`
    : stepIndex === 0
      ? "Three statements marked."
      : !hasNote
        ? "Add a short note to continue."
        : stepIndex === 1
          ? "Note ready."
          : "Ready to submit.";

  const primaryLabel =
    stepIndex === taskSteps.length - 1 ? "Submit task" : "Continue";

  function toggleMark(id: string) {
    const isMarked = marks.includes(id);
    if (!isMarked && !marksComplete) {
      setMarks([...marks, id]);
      setNotice(null);
      recorder.statementToggled(condition, id, true);
      return;
    }
    if (!isMarked && marksComplete) {
      setNotice(
        "Only three statements can be marked — clear one before marking another.",
      );
      recorder.selectionBlocked(condition);
      return;
    }
    setMarks(marks.filter((value) => value !== id));
    setNotice(null);
    recorder.statementToggled(condition, id, false);
  }

  function clearMarks() {
    setMarks([]);
    setNotice(null);
    recorder.documentCleared(condition);
  }

  function handleNoteChange(value: string) {
    setNote(value);
    recorder.noteUpdated(condition, value.length);
  }

  /** Close out the recording timeline for a step being left. */
  function leaveStepRecording(index: number) {
    const id = taskSteps[index].id;
    if (id === "document") {
      recorder.documentCompleted(condition);
    } else if (id === "note") {
      recorder.noteCompleted(condition);
    } else {
      recorder.reviewCompleted(condition);
    }
  }

  /** Open the recording timeline for a step being entered. */
  function enterStepRecording(index: number) {
    const id = taskSteps[index].id;
    recorder.setStep(id);
    if (id === "note") {
      if (!noteEntryRecordedRef.current) {
        noteEntryRecordedRef.current = true;
        recorder.noteStarted(condition, note.length);
      }
    } else if (id === "review") {
      if (!reviewEntryRecordedRef.current) {
        reviewEntryRecordedRef.current = true;
        recorder.reviewOpened(condition);
      }
    }
  }

  function goToStep(index: number) {
    if (!isReachable(index)) return;
    leaveStepRecording(stepIndex);
    setStepIndex(index);
    setNotice(null);
    enterStepRecording(index);
  }

  function goNext() {
    if (!canContinue) return;
    recorder.navigation(condition, "next");
    if (stepIndex === taskSteps.length - 1) {
      leaveStepRecording(stepIndex);
      recorder.taskSubmitted(condition);
      recorder.conditionCompleted(condition);
      setSubmitted(true);
      return;
    }
    leaveStepRecording(stepIndex);
    setStepIndex(stepIndex + 1);
    setNotice(null);
    enterStepRecording(stepIndex + 1);
  }

  function goBack() {
    if (stepIndex === 0) return;
    recorder.navigation(condition, "previous");
    leaveStepRecording(stepIndex);
    setStepIndex(stepIndex - 1);
    setNotice(null);
    enterStepRecording(stepIndex - 1);
  }

  if (submitted) {
    return (
      <TaskConfirmation
        condition={condition}
        marks={marks}
        note={note}
        continueLabel={continueLabel}
        onContinue={() => onConditionFinished(condition)}
      />
    );
  }

  const task: TaskController = {
    condition,
    steps: taskSteps,
    stepIndex,
    marks,
    note,
    notice,
    canContinue,
    continueHint,
    primaryLabel,
    isReachable,
    toggleMark,
    clearMarks,
    setNote: handleNoteChange,
    goToStep,
    goNext,
    goBack,
    exit: onExit,
  };

  const content =
    step.id === "document" ? (
      <DocumentPanel
        marks={marks}
        notice={notice}
        onToggle={toggleMark}
        onClear={clearMarks}
      />
    ) : step.id === "note" ? (
      <NotePanel marks={marks} note={note} onNoteChange={handleNoteChange} />
    ) : (
      <ReviewPanel
        marks={marks}
        note={note}
        onChangeMarks={() => goToStep(0)}
        onChangeNote={() => goToStep(1)}
      />
    );

  if (condition === "conventional") {
    return <ConventionalTask task={task}>{content}</ConventionalTask>;
  }

  return <QuietTask task={task}>{content}</QuietTask>;
}
