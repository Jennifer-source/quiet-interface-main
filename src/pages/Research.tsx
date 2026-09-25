import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Container } from "@/components/focus/Container";
import { SiteNav } from "@/components/focus/SiteNav";
import { getSessions, resetSessions } from "@/lib/research/store";
import { conditionNames, type Condition } from "@/lib/study";
import type { ResearchSession } from "@/lib/research/types";

function duration(from: number | null, to: number | null): string {
  if (from === null || to === null || to < from) return "—";
  const seconds = Math.round((to - from) / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function stepTimings(
  session: ResearchSession,
  condition: Condition,
  now: number,
) {
  const step = session.conditionSteps[condition];
  return {
    document: duration(step.documentStartedAt, step.documentCompletedAt),
    note: duration(step.noteStartedAt, step.noteCompletedAt),
    review: duration(step.reviewStartedAt, step.reviewCompletedAt),
    overall: duration(step.startedAt, step.completedAt ?? now),
  };
}

function conditionBlock(
  session: ResearchSession,
  condition: Condition,
  now: number,
) {
  const step = session.conditionSteps[condition];
  const timings = stepTimings(session, condition, now);
  const score = step.score;

  return (
    <div className="border-b border-line py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl leading-none text-ink">
          {conditionNames[condition]}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash tabular-nums">
          Started {step.startedAt ? new Date(step.startedAt).toLocaleTimeString() : "—"}
          {" · "}Completed{" "}
          {step.completedAt ? new Date(step.completedAt).toLocaleTimeString() : "—"}
        </p>
      </div>

      <dl className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { term: "Overall duration", value: timings.overall },
          { term: "Document duration", value: timings.document },
          { term: "Note duration", value: timings.note },
          { term: "Review duration", value: timings.review },
          {
            term: "Correct selections",
            value: score ? String(score.correctCount) : "—",
          },
          {
            term: "Incorrect selections",
            value: score ? String(score.incorrectCount) : "—",
          },
          {
            term: "Missed targets",
            value: score ? String(score.missedCount) : "—",
          },
          {
            term: "Total selected",
            value: String(step.selectedStatementIds.length),
          },
          { term: "Interaction count", value: String(step.interactionCount) },
          { term: "Navigation count", value: String(step.navigationCount) },
          { term: "Error count", value: String(step.errorCount) },
          {
            term: "Note length (chars)",
            value: String(step.noteLength),
          },
        ].map((item) => (
          <div key={item.term}>
            <dt className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.2em] text-ash">
              {item.term}
            </dt>
            <dd className="mt-2 font-serif text-xl leading-none text-ink tabular-nums">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Researcher development view. Not participant-facing and deliberately absent
 * from the study navigation — it exists so the instrumentation can be
 * inspected while the study is being built.
 */
export default function Research() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const sessions = getSessions();

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteNav />

      <main className="flex-1">
        <section aria-labelledby="researcher-heading">
          <Container>
            <div className="grid gap-7 py-14 md:grid-cols-12 md:gap-12 md:py-24">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                  Not participant-facing
                </p>
              </div>

              <div className="md:col-span-9">
                <h1
                  id="researcher-heading"
                  className="font-serif text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-ink"
                >
                  Researcher development view
                </h1>
                <p className="mt-7 max-w-2xl text-[15px] leading-[1.75] text-ash">
                  Anonymous session data recorded in this browser while building
                  the study. Sessions are held in memory and tab storage only —
                  nothing is sent anywhere, and no identifying information is
                  collected.
                </p>

                {sessions.length === 0 ? (
                  <p className="mt-10 border-t border-line pt-8 font-serif text-2xl text-ink">
                    No session data yet.
                  </p>
                ) : (
                  <>
                    <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash tabular-nums">
                        {sessions.length} session{sessions.length === 1 ? "" : "s"} recorded
                      </p>
                      <button
                        type="button"
                        onClick={() => resetSessions()}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        Clear local data
                      </button>
                    </div>

                    {sessions.map((session) => {
                      const [first, second] =
                        session.conditionOrder === "A"
                          ? (["conventional", "quiet"] as Condition[])
                          : (["quiet", "conventional"] as Condition[]);
                      return (
                        <div
                          key={session.sessionId}
                          className="mt-10 border border-line bg-surface"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                              {session.sessionId}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash tabular-nums">
                              Order {session.conditionOrder} ({conditionNames[first]} →{" "}
                              {conditionNames[second]}) · Overall{" "}
                              {duration(session.startedAt, session.completedAt ?? now)}
                            </p>
                          </div>
                          <div className="px-5 sm:px-6">
                            {conditionBlock(session, first, now)}
                            {conditionBlock(session, second, now)}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                <p className="mt-10 inline-flex items-start gap-3 border border-line bg-surface px-4 py-3.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ash">
                  <span
                    className="mt-[6px] size-1.5 shrink-0 bg-sage"
                    aria-hidden="true"
                  />
                  Observations only — no comparisons or conclusions are drawn
                  here.
                </p>

                <div className="mt-10">
                  <Link
                    to="/"
                    className="text-[14px] text-ink underline-offset-4 transition-colors hover:text-ash hover:underline hover:decoration-line"
                  >
                    Return to the study overview
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
