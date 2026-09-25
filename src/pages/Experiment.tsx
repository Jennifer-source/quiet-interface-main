import { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/focus/Container";
import { SectionLink } from "@/components/focus/SectionLink";
import { SiteFooter } from "@/components/focus/SiteFooter";
import { SiteNav } from "@/components/focus/SiteNav";

const taskSteps = [
  "Review a short research document.",
  "Identify three important statements.",
  "Mark those three statements.",
  "Add one short research note.",
];

const sessionOutline = [
  {
    index: "01",
    title: "Brief",
    detail: "Read what participation involves before starting.",
  },
  {
    index: "02",
    title: "Condition A — Conventional",
    detail:
      "Complete the task with persistent navigation and multiple visible controls.",
  },
  {
    index: "03",
    title: "Condition B — Quiet",
    detail:
      "Complete the same task with progressive disclosure and a single primary task.",
  },
  {
    index: "04",
    title: "Debrief",
    detail:
      "Short questions on perceived workload, perceived focus and usability.",
  },
];

/**
 * Placeholder route for the comparison session (stage one). It documents the
 * task and the session outline without running the experiment yet.
 */
export default function Experiment() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteNav />

      <main className="flex-1">
        <section aria-labelledby="experiment-title">
          <Container>
            <div className="grid gap-7 py-14 md:grid-cols-12 md:gap-12 md:py-24">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                  Experiment · Placeholder
                </p>
              </div>

              <div className="md:col-span-9">
                <h1
                  id="experiment-title"
                  className="font-serif text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-ink"
                >
                  The experiment is not running yet.
                </h1>
                <p className="mt-7 max-w-2xl text-[15px] leading-[1.75] text-ash">
                  Version one establishes the study foundation. This page
                  documents what participants will do once the task interface is
                  built: the same focused task, completed in both interface
                  conditions.
                </p>

                <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-0">
                  <div className="lg:pr-10">
                    <h2 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-ash">
                      The task
                    </h2>
                    <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-ash">
                      Participants complete the same task in both conditions:
                    </p>
                    <ol className="mt-6 max-w-md border-t border-line">
                      {taskSteps.map((step, index) => (
                        <li
                          key={step}
                          className="flex items-baseline gap-4 border-b border-line py-4"
                        >
                          <span className="font-mono text-[12px] leading-none tracking-[0.18em] text-ash tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] leading-[1.6] text-ink">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="lg:border-l lg:border-line lg:pl-10">
                    <h2 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-ash">
                      Session outline
                    </h2>
                    <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-ash">
                      Planned flow for each participant:
                    </p>
                    <ul className="mt-6 border-t border-line">
                      {sessionOutline.map((item) => (
                        <li
                          key={item.index}
                          className="border-b border-line py-4"
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-[12px] leading-none tracking-[0.18em] text-ash tabular-nums">
                              {item.index}
                            </span>
                            <span className="font-serif text-lg leading-tight text-ink">
                              {item.title}
                            </span>
                          </div>
                          <p className="mt-2 pl-9 text-[14px] leading-[1.7] text-ash">
                            {item.detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-10 inline-flex items-start gap-3 border border-line bg-surface px-4 py-3.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ash">
                  <span
                    className="mt-[6px] size-1.5 shrink-0 bg-sage"
                    aria-hidden="true"
                  />
                  Participant data has not yet been collected.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em]"
                  >
                    <Link to="/">Back to study overview</Link>
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
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
