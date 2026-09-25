import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The single global content container used by every screen in the study.
 * Desktop caps at 1240px; horizontal padding contracts on small viewports
 * (20px on mobile) so line lengths stay comfortable at 390px.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
