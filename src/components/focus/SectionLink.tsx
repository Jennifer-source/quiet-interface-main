import type { MouseEvent, ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

/**
 * Link to a section of the study overview (`/#research`).
 *
 * When the visitor is already on the overview the target is scrolled to in
 * place — CSS `scroll-behavior` honours `prefers-reduced-motion` — otherwise
 * the router navigates and the landing page scrolls to the hash on mount.
 */
export function SectionLink({
  to,
  className,
  children,
  onClick,
  ...props
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { pathname } = useLocation();
  const hash = to.startsWith("/#") ? to.slice(1) : null;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !hash || pathname !== "/") return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView();
  }

  return (
    <Link to={to} className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
