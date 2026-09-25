import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { TaskRunner } from "@/components/experiment/TaskRunner";
import { Container } from "@/components/focus/Container";
import { SectionLink } from "@/components/focus/SectionLink";
import { SiteFooter } from "@/components/focus/SiteFooter";
import { SiteNav } from "@/components/focus/SiteNav";
import { cn } from "@/lib/utils";
import {
  conditionLetters,
  conditionNames,
  conditionSummaries,
  isCondition,
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

const conditions: Condition[] = ["conventional", "quiet"];

/**
 * The experiment route: a brief that explains and configures the task, the
 * task itself in the chosen condition, and a confirmation after submission.
 */
export default function Experiment() {
  const location = useLocation();
  const [phase, setPhase] = useState<"brief" | "task">("brief");
  const [condition, setCondition] = useState<Condition>(() => {
    const requested = new URLSearchParams(location.search).get("condition");
    return isCondition(requested) ? requested : "conventional";
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [phase]);

  if (phase === "task") {
    return (
      <TaskRunner
        initialCondition={condition}
        onExit={() => setPhase("brief")}
      />
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
                  Only the interface around the task changes.
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

                <fieldset className="mt-12">
                  <legend className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                    Choose an interface condition
                  </legend>

                  <div className="mt-5 grid divide-y divide-line border-y border-line">
                    {conditions.map((value) => {
                      const isSelected = condition === value;
                      return (
                        <label
                          key={value}
                          className={cn(
                            "flex cursor-pointer items-start gap-4 px-4 py-5 transition-colors",
                            isSelected
                              ? "bg-surface"
                              : "hover:bg-surface/70",
                          )}
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={value}
                            checked={isSelected}
                            onChange={() => setCondition(value)}
                            className="mt-1 size-4 shrink-0 accent-sage"
                          />
                          <span className="block">
                            <span className="flex items-baseline gap-3">
                              <span className="font-mono text-[11px] leading-none tracking-[0.2em] text-ash">
                                {conditionLetters[value]}
                              </span>
                              <span className="font-serif text-xl uppercase leading-none tracking-[-0.01em] text-ink">
                                {conditionNames[value]}
                              </span>
                            </span>
                            <span className="mt-3 block max-w-xl text-[15px] leading-[1.7] text-ash">
                              {conditionSummaries[value]}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <p className="mt-5 max-w-2xl text-[14px] leading-[1.7] text-ash">
                    The document, the steps and the required responses are
                    identical in both conditions. Completing each condition
                    once gives the comparison.
                  </p>
                </fieldset>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    onClick={() => setPhase("task")}
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
                  Responses stay in this session — nothing is stored or sent.
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
