import { useEffect, useState } from "react";
import { MAX_MARKS, type Condition } from "@/lib/study";
import { ConventionalTask } from "./ConventionalTask";
import { DocumentPanel } from "./DocumentPanel";
import { QuietTask } from "./QuietTask";
import { TaskConfirmation } from "./TaskConfirmation";
import { NotePanel, ReviewPanel } from "./TaskPanels";
import { taskSteps, type TaskController } from "./taskTypes";

/**
 * Owns the task state and renders it through the assigned condition frame.
 * The task itself — document, marks, note, steps, submission — is identical
 * in both conditions; only the surrounding interface changes.
 */
export function TaskRunner({
  initialCondition,
  onExit,
}: {
  initialCondition: Condition;
  onExit: () => void;
}) {
  const [condition, setCondition] = useState<Condition>(initialCondition);
  const [stepIndex, setStepIndex] = useState(0);
  const [marks, setMarks] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const canContinue =
    marksComplete && (stepIndex === 0 || hasNote);

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
      return;
    }
    if (!isMarked && marksComplete) {
      setNotice(
        "Only three statements can be marked — clear one before marking another.",
      );
      return;
    }
    setMarks(marks.filter((value) => value !== id));
    setNotice(null);
  }

  function clearMarks() {
    setMarks([]);
    setNotice(null);
  }

  function goToStep(index: number) {
    if (!isReachable(index)) return;
    setStepIndex(index);
    setNotice(null);
  }

  function goNext() {
    if (!canContinue) return;
    if (stepIndex === taskSteps.length - 1) {
      setSubmitted(true);
      return;
    }
    setStepIndex(stepIndex + 1);
    setNotice(null);
  }

  function goBack() {
    if (stepIndex === 0) return;
    setStepIndex(stepIndex - 1);
    setNotice(null);
  }

  function runOtherCondition() {
    setCondition(condition === "conventional" ? "quiet" : "conventional");
    setStepIndex(0);
    setMarks([]);
    setNote("");
    setNotice(null);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <TaskConfirmation
        condition={condition}
        marks={marks}
        note={note}
        onRunOther={runOtherCondition}
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
    setNote,
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
      <NotePanel marks={marks} note={note} onNoteChange={setNote} />
    ) : (
      <ReviewPanel
        marks={marks}
        note={note}
        onChangeMarks={() => setStepIndex(0)}
        onChangeNote={() => setStepIndex(1)}
      />
    );

  if (condition === "conventional") {
    return <ConventionalTask task={task}>{content}</ConventionalTask>;
  }

  return <QuietTask task={task}>{content}</QuietTask>;
}
