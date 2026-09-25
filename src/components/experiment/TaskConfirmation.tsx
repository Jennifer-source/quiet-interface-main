import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/focus/Container";
import { SiteFooter } from "@/components/focus/SiteFooter";
import { SiteNav } from "@/components/focus/SiteNav";
import {
  MAX_MARKS,
  conditionLetters,
  conditionNames,
  otherCondition,
  sentencesByIds,
} from "@/lib/study";

/**
 * Completion confirmation. Shown after submission for either condition, with
 * the responses read back exactly as they were entered.
 */
export function TaskConfirmation({
  condition,
  marks,
  note,
  onRunOther,
}: {
  condition: "conventional" | "quiet";
  marks: string[];
  note: string;
  onRunOther: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const marked = sentencesByIds(marks);
  const other = otherCondition(condition);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteNav />

      <main className="flex-1">
        <section aria-labelledby="confirmation-heading">
          <Container>
            <div className="grid gap-7 py-14 md:grid-cols-12 md:gap-12 md:py-24">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
                  Submitted
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.16em] text-ash">
                  Condition {conditionLetters[condition]} —{" "}
                  {conditionNames[condition]}
                </p>
              </div>

              <div className="md:col-span-9">
                <h1
                  id="confirmation-heading"
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-serif text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-ink"
                >
                  Task complete.
                </h1>
                <p className="mt-7 max-w-2xl text-[15px] leading-[1.75] text-ash">
                  You read the document, marked {MAX_MARKS} statements and added
                  one note in the {conditionNames[condition]} condition. Your
                  responses are shown below exactly as you entered them.
                </p>

                <div className="mt-10 max-w-[64ch] border-t border-line">
                  <p className="border-b border-line py-4 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-ash tabular-nums">
                    Marked statements — {marked.length} of {MAX_MARKS}
                  </p>
                  <ol>
                    {marked.map((sentence, index) => (
                      <li
                        key={sentence.id}
                        className="flex gap-4 border-b border-line py-4"
                      >
                        <span className="font-mono text-[11px] leading-[1.8] text-ash tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-[16px] leading-[1.8] text-ink">
                          {sentence.text}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <p className="border-b border-line py-4 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-ash tabular-nums">
                    Your note — {note.length} characters
                  </p>
                  <p className="whitespace-pre-wrap border-b border-line py-4 font-serif text-[16px] leading-[1.8] text-ink">
                    {note}
                  </p>
                </div>

                <p className="mt-8 inline-flex items-start gap-3 border border-line bg-surface px-4 py-3.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ash">
                  <span
                    className="mt-[6px] size-1.5 shrink-0 bg-sage"
                    aria-hidden="true"
                  />
                  Responses stay in this session — nothing is stored or sent.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    onClick={onRunOther}
                    className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em]"
                  >
                    Run the {conditionNames[other]} condition
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em] shadow-none"
                  >
                    <Link to="/">Return to the study overview</Link>
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
