import { Container } from "./Container";
import { SectionLink } from "./SectionLink";

const studyLinks = [
  { label: "Research question", to: "/#research" },
  { label: "Hypothesis", to: "/#hypothesis" },
  { label: "Conditions", to: "/#conditions" },
  { label: "Method", to: "/#method" },
  { label: "Prototype preview", to: "/#preview" },
];

const statusLines = [
  "Stage 1 — Foundation",
  "Intro / study overview",
  "No participant data",
];

/** About block + study index. Doubles as the `About` anchor of the page. */
export function SiteFooter() {
  return (
    <footer id="about" className="scroll-mt-14 bg-paper sm:scroll-mt-16">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-x-12 md:py-20">
          <div className="md:col-span-4">
            <p className="font-mono text-[13px] font-medium uppercase leading-none tracking-[0.34em] text-ink">
              Focus
            </p>
            <p className="mt-3 font-serif text-xl leading-tight text-ink">
              Quiet Interface
            </p>
            <p className="mt-5 max-w-sm text-[14px] leading-[1.75] text-ash">
              An HCI / interaction-design research prototype examining how
              interface complexity shapes focused digital work. This first
              version establishes the study foundation only.
            </p>
          </div>

          <nav
            aria-labelledby="footer-study"
            className="md:col-span-3 md:col-start-6"
          >
            <h2
              id="footer-study"
              className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-ash"
            >
              Study
            </h2>
            <ul className="mt-5 space-y-3">
              {studyLinks.map((link) => (
                <li key={link.to}>
                  <SectionLink
                    to={link.to}
                    className="text-[14px] text-ink underline-offset-4 transition-colors hover:text-ash hover:underline hover:decoration-line"
                  >
                    {link.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h2 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-ash">
              Status
            </h2>
            <ul className="mt-5 space-y-3">
              {statusLines.map((line) => (
                <li
                  key={line}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>FOCUS — Quiet Interface</span>
          <span>Interaction design study · {new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer>
  );
}
