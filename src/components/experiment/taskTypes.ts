import type { ReactNode } from "react";
import type { Condition } from "@/lib/study";

export type TaskStepId = "document" | "note" | "review";

export type TaskStep = {
  id: TaskStepId;
  index: string;
  label: string;
};

export const taskSteps: TaskStep[] = [
  { id: "document", index: "01", label: "Document" },
  { id: "note", index: "02", label: "Note" },
  { id: "review", index: "03", label: "Review" },
];

/**
 * Everything a condition frame needs to render the task. Both frames receive
 * the identical controller, so the task itself never differs between
 * conditions — only the interface wrapped around it.
 */
export type TaskController = {
  condition: Condition;
  steps: TaskStep[];
  stepIndex: number;
  marks: string[];
  note: string;
  notice: string | null;
  canContinue: boolean;
  continueHint: string;
  primaryLabel: string;
  isReachable: (index: number) => boolean;
  toggleMark: (id: string) => void;
  clearMarks: () => void;
  setNote: (value: string) => void;
  goToStep: (index: number) => void;
  goNext: () => void;
  goBack: () => void;
  exit: () => void;
};

export type TaskFrameProps = {
  task: TaskController;
  children: ReactNode;
};
