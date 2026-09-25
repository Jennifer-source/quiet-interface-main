import { Section } from "./Section";

/** The study hypothesis, explicitly labelled as untested. */
export function Hypothesis() {
  return (
    <Section id="hypothesis" label="Hypothesis">
      <p className="inline-flex items-center gap-2.5 border border-line px-3 py-2 font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-ash">
        <span className="size-1.5 bg-sage" aria-hidden="true" />
        Untested proposition
      </p>

      <h2 className="mt-7 max-w-[44rem] font-serif text-[clamp(1.375rem,3vw,2.25rem)] leading-[1.35] text-ink">
        Reducing simultaneous visual information, choices and interruptions may
        improve perceived focus and reduce unnecessary interaction during focused
        tasks.
      </h2>

      <p className="mt-8 max-w-2xl border-t border-line pt-6 text-[15px] leading-[1.75] text-ash">
        Stated as a hypothesis, not as a finding. Participant data has not been
        collected, and no effect is claimed.
      </p>
    </Section>
  );
}
