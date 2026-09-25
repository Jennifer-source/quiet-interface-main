import { Section } from "./Section";

type Step = {
  index: string;
  title: string;
  body?: string;
  items?: string[];
};

const steps: Step[] = [
  {
    index: "01",
    title: "Participants",
    body: "A small exploratory usability study.",
  },
  {
    index: "02",
    title: "Task",
    body: "Participants read a short research document, mark the three statements they consider most important, add one short note and submit. The same task is performed in both interface conditions.",
  },
  {
    index: "03",
    title: "Measures",
    items: [
      "Task completion time",
      "Errors",
      "Interaction count",
      "Perceived workload",
      "Perceived focus",
      "Usability feedback",
    ],
  },
  {
    index: "04",
    title: "Analysis",
    body: "Compare quantitative observations and qualitative feedback. Observations are recorded per condition; no condition is designated in advance as the better one.",
  },
];

/** Methodology structure for the exploratory study. */
export function Method() {
  return (
    <Section id="method" label="Method">
      <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-ink">
        How the study is structured.
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-ash">
        Four parts: who takes part, what they do, what is recorded, and how the
        two conditions are compared.
      </p>

      <ol className="mt-10 grid border-t border-line lg:grid-cols-2">
        {steps.map((step) => (
          <li
            key={step.index}
            className="border-b border-line py-8 lg:odd:pr-10 lg:even:border-l lg:even:border-line lg:even:pl-10 lg:py-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[12px] leading-none tracking-[0.2em] text-ash tabular-nums">
                {step.index}
              </span>
              <h3 className="font-serif text-2xl leading-none text-ink">
                {step.title}
              </h3>
            </div>

            {step.body ? (
              <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-ash">
                {step.body}
              </p>
            ) : null}

            {step.items ? (
              <ul className="mt-5 max-w-md divide-y divide-line border-t border-line">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 py-2.5 text-[14px] text-ash"
                  >
                    <span aria-hidden="true" className="text-mist">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="mt-8 inline-flex items-start gap-3 border border-line bg-surface px-4 py-3.5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ash">
        <span className="mt-[6px] size-1.5 shrink-0 bg-sage" aria-hidden="true" />
        Participant data has not yet been collected.
      </p>
    </Section>
  );
}
