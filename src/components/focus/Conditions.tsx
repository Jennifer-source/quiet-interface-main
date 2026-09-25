import { Section } from "./Section";

const conditions = [
  {
    marker: "A",
    name: "Conventional",
    description:
      "An interface with persistent navigation, multiple visible controls and competing information.",
    attributes: [
      "Persistent navigation",
      "Multiple visible controls",
      "Competing information",
    ],
  },
  {
    marker: "B",
    name: "Quiet",
    description:
      "A reduced interface using progressive disclosure, contextual controls and a single primary task.",
    attributes: [
      "Progressive disclosure",
      "Contextual controls",
      "A single primary task",
    ],
  },
];

/** Side-by-side introduction of the two interface conditions. */
export function Conditions() {
  return (
    <Section id="conditions" label="Two interface conditions" tone="surface">
      <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-ink">
        Same task, two interface conditions.
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-ash">
        Both conditions will be compared on the same task. Neither is assumed
        to be better — the purpose of the study is comparison.
      </p>

      <div className="mt-10 grid divide-y divide-line border-t border-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {conditions.map((condition, index) => (
          <div
            key={condition.marker}
            className={
              index === 0 ? "py-8 lg:py-10 lg:pr-10" : "py-8 lg:py-10 lg:pl-10"
            }
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] leading-none tracking-[0.2em] text-ash">
                {condition.marker}
              </span>
              <h3 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] uppercase leading-none tracking-[-0.01em] text-ink">
                {condition.name}
              </h3>
            </div>

            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-ash">
              {condition.description}
            </p>

            <ul className="mt-6 max-w-md border-t border-line pt-3">
              {condition.attributes.map((attribute) => (
                <li
                  key={attribute}
                  className="flex items-baseline gap-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ash"
                >
                  <span aria-hidden="true" className="text-mist">
                    —
                  </span>
                  {attribute}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
