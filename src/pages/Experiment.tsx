import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { TaskRunner } from "@/components/experiment/TaskRunner";
import { Container } from "@/components/focus/Container";
import { SectionLink } from "@/components/focus/SectionLink";
import { SiteFooter } from "@/components/focus/SiteFooter";
import { SiteNav } from "@/components/focus/SiteNav";
import { TaskRecorder } from "@/lib/research/recorder";
import { configuredConditionOrder } from "@/lib/research/config";
import { conditionOrders, type ConditionOrder } from "@/lib/research/types";
import {
  conditionLetters,
  conditionNames,
  conditionSummaries,
  type Condition,
} from "@/lib/study";

const taskOutline = [
  {
    index: "01",
    title: "Read",
    detail:
      "Review a short research summary on a subject outside this study's question. The text is identical in both conditions.",
  },
  {
    index: "02",
    title: "Mark",
    detail:
      "Select the three statements you consider most important. A fourth is refused until you clear one.",
  },
  {
    index: "03",
    title: "Note",
    detail: "Write one short note of up to 280 characters on what you read.",
  },
  {
    index: "04",
    title: "Submit",
    detail:
      "Review both responses, submit the task and receive a confirmation.",
  },
];

type Phase =
  | { kind: "brief" }
  | { kind: "task"; condition: Condition; position: 0 | 1 }
  | { kind: "done" };

/**
 * The experiment route: a brief, the task in both conditions of a fixed
 * researcher-controlled order, and a session-completion screen. Anonymous
 * measurement runs underneath; participants choose nothing about condition.
 */
export default function Experiment() {
  const [phase, setPhase] = useState<Phase>({ kind: "brief" });
  // One recorder per session flow; created lazily on first render.
  const [recorder] = useState(() => new TaskRecorder());

  const order: ConditionOrder = configuredConditionOrder;
  const sequence = conditionOrders[order];

  useEffect(() => {
    if (phase.kind !== "brief") return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [phase.kind]);

  function beginSession() {
    recorder.begin(order);
    setPhase({ kind: "task", condition: sequence[0], position: 0 });
  }

  function handleConditionFinished(condition: Condition) {
    const position = sequence.indexOf(condition) as 0 | 1;
    if (position === 0) {
      setPhase({ kind: "task", condition: sequence[1], position: 1 });
      return;
    }
    recorder.sessionCompleted();
    setPhase({ kind: "done" });
  }

  if (phase.kind === "task") {
    return (
      <TaskRunner
        key={phase.condition}
        recorder={recorder}
        condition={phase.condition}
        continueLabel={
          phase.position === 0
            ? `Continue to the ${conditionNames[sequence[1]]} condition`
            : "Finish the session"
        }
        onExit={() => setPhase({ kind: "brief" })}
        onConditionFinished={handleConditionFinished}
      />
    );
  }

  if (phase.kind === "done") {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        <SiteNav />
        <main className="flex-1">
          <section aria-labelledby="session-complete-heading">
            <Container>
              <div className="grid gap-7 py-14 md:grid-cols-12 md:gap-12 md:py-24">
                <div className="md:col-span-3">
                  <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                    Session complete
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h1
                    id="session-complete-heading"
                    className="font-serif text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-ink"
                  >
                    Both conditions are complete.
                  </h1>
                  <p className="mt-7 max-w-2xl text-[15px] leading-[1.75] text-ash">
                    You completed the same focus task in the{" "}
                    {conditionNames[sequence[0]]} and{" "}
                    {conditionNames[sequence[1]]} conditions. Thank you — this
                    completes the session.
                  </p>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em]"
                    >
                      <Link to="/">Return to the study overview</Link>
                    </Button>
                    <Button
                      onClick={() => setPhase({ kind: "brief" })}
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em] shadow-none"
                    >
                      Start a new session
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteNav />

      <main className="flex-1">
        <section aria-labelledby="brief-heading">
          <Container>
            <div className="grid gap-7 py-14 md:grid-cols-12 md:gap-12 md:py-24">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                  Experiment · Focus task
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.16em] text-ash">
                  One task · Two conditions
                </p>
              </div>

              <div className="md:col-span-9">
                <h1
                  id="brief-heading"
                  className="font-serif text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-ink"
                >
                  Begin the focus task.
                </h1>
                <p className="mt-7 max-w-2xl text-[15px] leading-[1.75] text-ash">
                  The task is held constant across both interface conditions:
                  you read a short research document, mark the three statements
                  you consider most important, add a single note, and submit.
                  You will complete the task twice — once in each condition —
                  and the order of the conditions is set in advance.
                </p>

                <ol className="mt-10 grid border-t border-line sm:grid-cols-2">
                  {taskOutline.map((item) => (
                    <li
                      key={item.index}
                      className="border-b border-line py-7 sm:odd:pr-10 sm:even:border-l sm:even:border-line sm:even:pl-10 sm:py-9"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[12px] leading-none tracking-[0.2em] text-ash tabular-nums">
                          {item.index}
                        </span>
                        <h2 className="font-serif text-2xl leading-none text-ink">
                          {item.title}
                        </h2>
                      </div>
                      <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-ash">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-12">
                  <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                    Session order
                  </p>
                  <div className="mt-5 grid divide-y divide-line border-y border-line">
                    {sequence.map((condition, index) => (
                      <div
                        key={condition}
                        className="flex items-start gap-4 px-4 py-5"
                      >
                        <span className="mt-0.5 font-mono text-[11px] leading-none tracking-[0.2em] text-ash tabular-nums">
                          {index === 0 ? "First" : "Then"}
                        </span>
                        <span className="block">
                          <span className="flex items-baseline gap-3">
                            <span className="font-mono text-[11px] leading-none tracking-[0.2em] text-ash">
                              {conditionLetters[condition]}
                            </span>
                            <span className="font-serif text-xl uppercase leading-none tracking-[-0.01em] text-ink">
                              {conditionNames[condition]}
                            </span>
                          </span>
                          <span className="mt-3 block max-w-xl text-[15px] leading-[1.7] text-ash">
                            {conditionSummaries[condition]}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 max-w-2xl text-[14px] leading-[1.7] text-ash">
                    The document, the steps and the required responses are
                    identical in both conditions. Completing each condition
                    once gives the comparison.
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    onClick={beginSession}
                    className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em]"
                  >
                    Begin the task
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em] shadow-none"
                  >
                    <SectionLink to="/#method">Read the method</SectionLink>
                  </Button>
                </div>

                <p className="mt-8 inline-flex items-start gap-3 border border-line bg-surface px-4 py-3.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ash">
                  <span
                    className="mt-[6px] size-1.5 shrink-0 bg-sage"
                    aria-hidden="true"
                  />
                  Anonymous session · responses stay in this browser
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
