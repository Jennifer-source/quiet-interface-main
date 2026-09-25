import { Link } from "react-router";
import { ConditionPreview } from "./ConditionPreview";
import { Section } from "./Section";
import { conditionSummaries, type Condition } from "@/lib/study";

const figures: {
  variant: Condition;
  action: string;
}[] = [
  { variant: "conventional", action: "Preview Conventional" },
  { variant: "quiet", action: "Preview Quiet" },
];

/** Static previews of the two conditions, each linked into the live task. */
export function PrototypePreview() {
  return (
    <Section id="preview" label="Prototype preview" tone="surface">
      <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] tracking-[-0.01em] text-ink">
        Two interfaces, one task.
      </h2>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-ash">
        Static previews of the two conditions. The document, the steps and the
        required responses stay identical — only the interface around them
        changes. In the full task, the order of the two conditions is set in
        advance rather than chosen.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {figures.map((figure) => (
          <figure key={figure.variant} className="flex flex-col">
            <ConditionPreview variant={figure.variant} />
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.24em] text-ink">
                {figure.variant === "conventional" ? "Conventional" : "Quiet"}
              </p>
              <p className="mt-3 max-w-sm text-[14px] leading-[1.7] text-ash">
                {conditionSummaries[figure.variant]}
              </p>
              <Link
                to="/experiment"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink underline-offset-4 transition-colors hover:underline hover:decoration-line"
              >
                {figure.action}
                <span aria-hidden="true">→</span>
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-10 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
        The full task runs both conditions from the experiment brief
      </p>
    </Section>
  );
}
