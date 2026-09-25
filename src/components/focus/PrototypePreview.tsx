import { ConditionPreview } from "./ConditionPreview";
import { Section } from "./Section";

const figures = [
  {
    variant: "conventional" as const,
    name: "Conventional",
    description:
      "Persistent navigation, several toolbars and side panels — many controls visible at once.",
  },
  {
    variant: "quiet" as const,
    name: "Quiet",
    description:
      "A single column, one primary control and progressive disclosure — fewer competing elements.",
  },
];

/** Static previews of the two future interface conditions. */
export function PrototypePreview() {
  return (
    <Section id="preview" label="Prototype preview" tone="surface">
      <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-ink">
        Two interfaces, one task.
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-ash">
        Static previews of the two conditions, shown to communicate the
        difference in information density. Neither interface is functional yet.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {figures.map((figure) => (
          <figure key={figure.name} className="flex flex-col">
            <ConditionPreview variant={figure.variant} />
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.24em] text-ink">
                {figure.name}
              </p>
              <p className="mt-3 max-w-sm text-[14px] leading-[1.7] text-ash">
                {figure.description}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-10 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
        Stage 1 — previews only, no task interface yet
      </p>
    </Section>
  );
}
