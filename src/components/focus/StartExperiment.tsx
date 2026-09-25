import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { SectionLink } from "./SectionLink";

/** Closing call to the placeholder experiment route. */
export function StartExperiment() {
  return (
    <Section id="experiment" label="Start experiment" tone="ink">
      <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal uppercase leading-[1] tracking-[-0.02em] text-paper">
        Ready to explore?
      </h2>
      <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-paper/70">
        Experience both interface conditions using the same task.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button
          asChild
          size="lg"
          className="h-12 rounded-none bg-paper px-7 font-mono text-[11px] uppercase tracking-[0.2em] text-ink hover:bg-paper/90 hover:text-ink"
        >
          <SectionLink to="/experiment">Start experiment</SectionLink>
        </Button>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">
          Stage 1 · placeholder route
        </p>
      </div>
    </Section>
  );
}
