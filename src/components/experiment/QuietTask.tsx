import { useState } from "react";
import { Button } from "@/components/ui/button";
import { taskInstructions } from "@/lib/study";
import type { TaskFrameProps } from "./taskTypes";

/**
 * Condition B: a single column, one primary action at a time, and controls
 * that appear only when they are needed. Capability is identical to the
 * conventional frame — only the surrounding interface differs.
 */
export function QuietTask({ task, children }: TaskFrameProps) {
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 w-full max-w-[760px] items-center justify-between gap-4 px-5 sm:px-8">
          <span className="font-mono text-[11px] uppercase leading-none tracking-[0.3em] text-ink">
            Quiet Interface
          </span>
          <span className="font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-ash tabular-nums">
            Step {task.stepIndex + 1} of {task.steps.length}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-10 sm:px-8 md:pt-16">
        <button
          type="button"
          onClick={() => setInstructionsOpen((open) => !open)}
          aria-expanded={instructionsOpen}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          {instructionsOpen ? "Hide instructions" : "Instructions"}
        </button>
        {instructionsOpen ? (
          <p className="mt-4 max-w-[60ch] border-l border-line pl-4 text-[14px] leading-[1.75] text-ash">
            {taskInstructions} You can move between steps until you submit, and
            every response can be changed from the review step.
          </p>
        ) : null}

        <div className="mt-10">{children}</div>

        <p className="mt-10 text-[13px] leading-[1.6] text-ash sm:hidden">
          {task.continueHint}
        </p>

        <div className="mt-6 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {task.stepIndex > 0 ? (
              <button
                type="button"
                onClick={task.goBack}
                className="text-[13px] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={task.exit}
              className="text-[13px] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Leave the task
            </button>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden text-[13px] text-ash sm:block">
              {task.continueHint}
            </span>
            <Button
              onClick={task.goNext}
              disabled={!task.canContinue}
              className="h-11 shrink-0 rounded-none px-6 font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              {task.primaryLabel}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
