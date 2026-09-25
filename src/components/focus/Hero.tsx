import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";

const studyMeta = [
  { term: "Stage", detail: "01 — Foundation" },
  { term: "Task", detail: "Read the document, mark three statements, write one note" },
  { term: "Status", detail: "Pre-data — no results yet" },
];

/** Opening masthead of the study overview. */
export function Hero() {
  return (
    <section className="border-b border-line" aria-labelledby="hero-title">
      <Container>
        <div className="flex flex-col pb-14 pt-12 md:pb-20 md:pt-24">
          <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash">
              HCI / Interaction Design Study
            </p>
            <p className="font-mono text-[11px] uppercase leading-[1.6] tracking-[0.18em] text-ash">
              Stage 01 — Foundation
            </p>
          </div>

          <h1
            id="hero-title"
            className="mt-10 font-serif text-[clamp(3rem,13vw,10.5rem)] font-normal uppercase leading-[0.86] tracking-[-0.025em] text-ink"
          >
            Quiet
            <br />
            Interface
          </h1>

          <div className="mt-10 grid gap-7 border-t border-line pt-8 md:grid-cols-12 md:gap-12">
            <p className="font-serif text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.35] text-ink md:col-span-6">
              Investigating how interface complexity affects focused digital
              work.
            </p>
            <p className="text-[15px] leading-[1.75] text-ash md:col-span-5 md:col-start-8">
              An experimental interaction-design study exploring whether
              reducing visual competition, simultaneous choices and unnecessary
              interaction can change the experience of focused work.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em]"
            >
              <SectionLink to="/#research">Explore the study</SectionLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-none px-7 font-mono text-[11px] uppercase tracking-[0.2em] shadow-none"
            >
              <SectionLink to="/experiment">Start prototype</SectionLink>
            </Button>
          </div>

          <dl className="mt-14 grid gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-10">
            {studyMeta.map((item) => (
              <div key={item.term}>
                <dt className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
                  {item.term}
                </dt>
                <dd className="mt-3 text-[14px] leading-[1.6] text-ink">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
