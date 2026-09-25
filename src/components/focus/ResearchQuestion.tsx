import { Section } from "./Section";

/** The framing question of the study. */
export function ResearchQuestion() {
  return (
    <Section id="research" label="Research question" tone="surface">
      <h2 className="font-serif text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.14] tracking-[-0.015em] text-ink">
        {"“How might interface design reduce cognitive overload during focused digital tasks?”"}
      </h2>
      <p className="mt-8 max-w-2xl border-t border-line pt-6 text-[15px] leading-[1.75] text-ash">
        A framing question for stage one, open by design. The study is built to
        explore it, not to settle it.
      </p>
    </Section>
  );
}
