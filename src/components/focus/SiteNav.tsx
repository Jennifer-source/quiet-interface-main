import { Link, useLocation } from "react-router";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";

const navLinks = [
  { label: "Research", to: "/#research" },
  { label: "Experiment", to: "/experiment" },
  { label: "About", to: "/#about" },
] as const;

/** Minimal study navigation: wordmark left, three links right. */
export function SiteNav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Link
            to="/"
            className="font-mono text-[13px] font-medium uppercase leading-none tracking-[0.34em] text-ink transition-colors hover:text-ash"
          >
            Focus
            <span className="ml-3 hidden font-normal tracking-[0.2em] text-ash sm:inline">
              Quiet Interface
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 sm:gap-8">
              {navLinks.map((link) =>
                link.to.startsWith("/#") ? (
                  <li key={link.to}>
                    <SectionLink
                      to={link.to}
                      className="font-mono text-[11px] uppercase leading-none tracking-[0.16em] text-ash underline-offset-[6px] transition-colors hover:text-ink hover:underline hover:decoration-line sm:text-[12px]"
                    >
                      {link.label}
                    </SectionLink>
                  </li>
                ) : (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      aria-current={
                        pathname === link.to ? "page" : undefined
                      }
                      className="font-mono text-[11px] uppercase leading-none tracking-[0.16em] text-ash underline-offset-[6px] transition-colors hover:text-ink hover:underline hover:decoration-line sm:text-[12px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
