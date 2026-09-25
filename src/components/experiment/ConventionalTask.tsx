import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/focus/Container";
import { SiteFooter } from "@/components/focus/SiteFooter";
import { SiteNav } from "@/components/focus/SiteNav";
import { cn } from "@/lib/utils";
import {
  MAX_MARKS,
  NOTE_MAX_LENGTH,
  conditionLetters,
  conditionNames,
  paragraphs,
  taskInstructions,
} from "@/lib/study";
import type { TaskFrameProps } from "./taskTypes";

const control =
  "h-9 rounded-none px-3 font-mono text-[10px] uppercase tracking-[0.16em]";
const linkClass =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline";

/**
 * Condition A: persistent navigation, several toolbars, side panels and
 * duplicated controls. Every control is real — the difference from the quiet
 * frame is density, not capability.
 */
export function ConventionalTask({ task, children }: TaskFrameProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const isLastStep = task.stepIndex === task.steps.length - 1;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteNav />

      {/* Persistent workspace navigation */}
      <div className="border-b border-line bg-surface">
        <Container>
          <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
            <nav aria-label="Task workspace">
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
                {task.steps.map((step, index) => (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => task.goToStep(index)}
                      aria-current={
                        index === task.stepIndex ? "step" : undefined
                      }
                      aria-disabled={!task.isReachable(index)}
                      className={cn(
                        linkClass,
                        index === task.stepIndex && "text-ink",
                        !task.isReachable(index) &&
                          "cursor-not-allowed opacity-40 hover:no-underline",
                      )}
                    >
                      {step.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link to="/" className={cn(linkClass, "hidden sm:inline")}>
                    Study overview
                  </Link>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setHelpOpen((open) => !open)}
              aria-expanded={helpOpen}
              className={cn(linkClass, helpOpen && "text-ink")}
            >
              Help
            </button>
          </div>
        </Container>
      </div>

      {/* Toolbar */}
      <div className="border-b border-line bg-paper">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={control}
                disabled={task.marks.length === 0 || task.stepIndex !== 0}
                onClick={task.clearMarks}
              >
                Clear marks
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={control}
                disabled={task.stepIndex === 0}
                onClick={task.goBack}
              >
                Previous step
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={control}
                disabled={!task.canContinue}
                onClick={task.goNext}
              >
                {isLastStep ? "Submit task" : "Next step"}
              </Button>
            </div>

            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ash tabular-nums">
              <span>
                Marks {task.marks.length}/{MAX_MARKS}
              </span>
              <span>
                Note {task.note.length}/{NOTE_MAX_LENGTH}
              </span>
              <span>
                Step {task.stepIndex + 1}/{task.steps.length}
              </span>
            </div>
          </div>
        </Container>
      </div>

      {helpOpen ? (
        <div className="border-b border-line bg-surface">
          <Container>
            <div className="flex items-start justify-between gap-6 py-4">
              <p className="max-w-[72ch] text-[14px] leading-[1.7] text-ash">
                {taskInstructions} You can move between steps until you submit,
                and every response can be changed from the review step.
              </p>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className={cn(linkClass, "shrink-0")}
              >
                Close
              </button>
            </div>
          </Container>
        </div>
      ) : null}

      <div className="flex-1">
        <Container>
          <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)_13rem]">
            <aside className="hidden border-r border-line py-8 pr-6 lg:block">
              <div className="space-y-8">
                <div>
                  <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                    Steps
                  </p>
                  <ol className="mt-3 border-t border-line">
                    {task.steps.map((step, index) => (
                      <li key={step.id} className="border-b border-line">
                        <button
                          type="button"
                          onClick={() => task.goToStep(index)}
                          aria-current={
                            index === task.stepIndex ? "step" : undefined
                          }
                          aria-disabled={!task.isReachable(index)}
                          className={cn(
                            "flex w-full items-baseline gap-3 py-2.5 text-left text-[13px] transition-colors",
                            index === task.stepIndex
                              ? "text-ink"
                              : "text-ash hover:text-ink",
                            !task.isReachable(index) && "opacity-40",
                          )}
                        >
                          <span className="font-mono text-[10px] tracking-[0.16em] tabular-nums">
                            {step.index}
                          </span>
                          <span>{step.label}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                    Instructions
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.7] text-ash">
                    {taskInstructions}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                    Outline
                  </p>
                  <ul className="mt-3 border-t border-line">
                    {paragraphs.map((paragraph) => (
                      <li key={paragraph.id} className="border-b border-line">
                        <a
                          href={`#${paragraph.id}`}
                          className="block py-2.5 text-[13px] text-ash transition-colors hover:text-ink"
                        >
                          {paragraph.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <div className="py-10 lg:px-8">{children}</div>

            <aside className="hidden border-l border-line py-8 pl-6 lg:block">
              <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                Condition
              </p>
              <p className="mt-3 font-serif text-lg leading-tight text-ink">
                {conditionLetters[task.condition]} —{" "}
                {conditionNames[task.condition]}
              </p>

              <p className="mt-7 font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                Marks used
              </p>
              <div className="mt-3 flex gap-2">
                {Array.from({ length: MAX_MARKS }).map((_, index) => (
                  <span
                    key={index}
                    className={cn(
                      "size-5 border border-line",
                      index < task.marks.length ? "bg-sage/40" : "bg-surface",
                    )}
                  />
                ))}
              </div>

              <p className="mt-7 font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                Note
              </p>
              <p className="mt-3 font-mono text-[11px] text-ash tabular-nums">
                {task.note.length}/{NOTE_MAX_LENGTH}
              </p>

              <p className="mt-7 border-t border-line pt-4 text-[12px] leading-[1.6] text-ash">
                Responses are held in this browser session only.
              </p>
            </aside>
          </div>
        </Container>
      </div>

      {/* Action bar */}
      <div className="sticky bottom-0 border-t border-line bg-surface">
        <Container>
          <div className="flex items-center justify-between gap-4 py-3">
            <Button
              variant="outline"
              size="sm"
              className={control}
              disabled={task.stepIndex === 0}
              onClick={task.goBack}
            >
              Previous
            </Button>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ash sm:block">
              {task.continueHint}
            </p>
            <Button
              size="sm"
              className={control}
              disabled={!task.canContinue}
              onClick={task.goNext}
            >
              {task.primaryLabel}
            </Button>
          </div>
        </Container>
      </div>

      <SiteFooter />
    </div>
  );
}
