import { Link, useLocation } from "react-router";
import { Container } from "./Container";
import { SectionLink } from "./SectionLink";

const navLinks = [
  { label: "Research", to: "/#research" },
  { label: "Experiment", to: "/experiment" },
  { label: "About", to: "/#about" },
] as const;

const linkClass =
  "whitespace-nowrap font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-ash underline-offset-[6px] transition-colors hover:text-ink hover:underline hover:decoration-line sm:text-[12px] sm:tracking-[0.16em]";

/** Minimal study navigation: wordmark left, three links right. */
export function SiteNav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Link
            to="/"
            className="shrink-0 whitespace-nowrap font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-ink transition-colors hover:text-ash sm:text-[13px] sm:tracking-[0.3em]"
          >
            Quiet Interface
          </Link>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 sm:gap-8">
              {navLinks.map((link) =>
                link.to.startsWith("/#") ? (
                  <li key={link.to}>
                    <SectionLink to={link.to} className={linkClass}>
                      {link.label}
                    </SectionLink>
                  </li>
                ) : (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      aria-current={pathname === link.to ? "page" : undefined}
                      className={linkClass}
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
