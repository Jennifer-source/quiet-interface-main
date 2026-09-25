import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export type SectionTone = "paper" | "surface" | "ink";

/**
 * Shared section shell: a mono eyebrow in the left three columns, content in
 * the right nine, so every section of the study aligns to the same grid.
 */
export function Section({
  id,
  label,
  tone = "paper",
  className,
  contentClassName,
  children,
}: {
  id: string;
  label: string;
  tone?: SectionTone;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={cn(
        "scroll-mt-14 border-b border-line sm:scroll-mt-16",
        tone === "surface" && "bg-surface",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
    >
      <Container>
        <div className="grid gap-7 py-14 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-3">
            <p
              id={`${id}-label`}
              className={cn(
                "font-mono text-[11px] font-medium uppercase leading-[1.6] tracking-[0.28em] text-ash",
                tone === "ink" && "text-paper/60",
              )}
            >
              {label}
            </p>
          </div>
          <div className={cn("md:col-span-9", contentClassName)}>{children}</div>
        </div>
      </Container>
    </section>
  );
}
