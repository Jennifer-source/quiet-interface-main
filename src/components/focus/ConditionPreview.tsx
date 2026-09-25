import { cn } from "@/lib/utils";

export type ConditionVariant = "conventional" | "quiet";

const topNavItems = ["File", "Edit", "View", "Insert", "Format", "Tools", "Help"];
const toolRowOne = ["B", "I", "U", "H1", "H2", "Link", "List", "Find"];
const toolRowTwo = ["Undo", "Redo", "Share", "Comment", "Export", "Sync"];
const sideBars = ["w-5/6", "w-full", "w-4/6", "w-5/6", "w-3/6", "w-full", "w-4/6"];
const sideTags = ["w-8", "w-6", "w-7", "w-5"];
const activityRows = ["w-full", "w-5/6", "w-2/3", "w-4/5", "w-3/5", "w-11/12"];

/**
 * Static preview frame. Decorative: the surrounding <figure> caption carries
 * the meaning for assistive technology, so the mock itself is hidden from it.
 */
export function ConditionPreview({
  variant,
  className,
}: {
  variant: ConditionVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface",
        className,
      )}
    >
      {variant === "conventional" ? <ConventionalMock /> : <QuietMock />}
    </div>
  );
}

/** Dense interface: persistent navigation, several toolbars, side panels. */
function ConventionalMock() {
  return (
    <div className="flex h-full flex-col text-[8px] leading-[1.4] text-ash sm:text-[9px]">
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="size-1.5 bg-ink" />
          <span className="font-medium uppercase tracking-[0.16em] text-ink">
            Workspace
          </span>
        </div>
        <div className="hidden gap-3 sm:flex">
          {topNavItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="flex shrink-0 gap-1">
          <span className="size-2 border border-line" />
          <span className="size-2 border border-line" />
          <span className="size-2 border border-line" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[18%] shrink-0 flex-col gap-2 border-r border-line p-2 sm:w-[20%] sm:p-2.5">
          <span className="uppercase tracking-[0.14em] text-mist">Library</span>
          <div className="space-y-1.5">
            {sideBars.map((width, index) => (
              <span
                key={index}
                className={cn("block h-1.5 bg-mist/60", width)}
              />
            ))}
          </div>
          <span className="mt-1 uppercase tracking-[0.14em] text-mist">Tags</span>
          <div className="flex flex-wrap gap-1">
            {sideTags.map((width, index) => (
              <span
                key={index}
                className={cn("block h-2 border border-line", width)}
              />
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-1 border-b border-line px-2 py-1.5">
            {toolRowOne.map((tool) => (
              <span
                key={tool}
                className="flex h-4 items-center justify-center border border-line px-1 text-[7px] text-ash"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1 border-b border-line px-2 py-1.5">
            {toolRowTwo.map((tool) => (
              <span
                key={tool}
                className="flex h-4 items-center justify-center border border-line px-1 text-[7px] text-ash"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-3">
            <div className="h-2 w-1/2 bg-ink" />
            <div className="h-1.5 w-full bg-mist/70" />
            <div className="h-1.5 w-11/12 bg-mist/70" />
            <div className="h-1.5 w-10/12 bg-mist/70" />
            <div className="flex items-center gap-2">
              <span className="h-1.5 flex-1 bg-sage/50" />
              <span className="shrink-0 border border-sage px-1 py-px text-[6px] uppercase tracking-[0.1em] text-ink">
                Marked
              </span>
            </div>
            <div className="h-1.5 w-full bg-mist/70" />
            <div className="h-1.5 w-9/12 bg-mist/70" />
            <div className="h-1.5 w-11/12 bg-mist/70" />
            <div className="h-1.5 w-8/12 bg-mist/70" />
          </div>
        </div>

        <aside className="hidden w-[24%] shrink-0 flex-col gap-2 border-l border-line p-2 sm:flex sm:p-2.5">
          <span className="uppercase tracking-[0.14em] text-mist">Activity</span>
          <div className="space-y-1.5">
            {activityRows.map((width, index) => (
              <span key={index} className="flex items-center gap-1.5">
                <span className="size-1.5 shrink-0 bg-line" />
                <span className={cn("block h-1.5 bg-mist/60", width)} />
              </span>
            ))}
          </div>
          <span className="mt-1 uppercase tracking-[0.14em] text-mist">
            Outline
          </span>
          <div className="space-y-1.5">
            <span className="block h-1.5 w-full bg-mist/60" />
            <span className="block h-1.5 w-4/6 bg-mist/60" />
            <span className="block h-1.5 w-5/6 bg-mist/60" />
          </div>
        </aside>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-line px-3 py-1.5 text-[7px] uppercase tracking-[0.14em] text-mist">
        <span>Editing · Autosync · Outline · Comments · History</span>
        <span className="shrink-0">Ready</span>
      </div>
    </div>
  );
}

/** Sparse interface: one column, one primary control, generous whitespace. */
function QuietMock() {
  return (
    <div className="flex h-full flex-col text-[8px] leading-[1.4] text-ash sm:text-[9px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">          <span className="font-medium uppercase tracking-[0.24em] text-ink">
            Quiet Interface
          </span>
        <span className="size-1.5 bg-sage" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-5 sm:px-10">
        <div className="mx-auto w-full max-w-[72%] space-y-3">
          <span className="block h-px w-6 bg-sage" />
          <span className="block h-2 w-2/3 bg-ink" />
          <span className="block h-1.5 w-full bg-mist/70" />
          <span className="block h-1.5 w-11/12 bg-mist/70" />
          <span className="block h-1.5 w-full bg-sage/50" />
          <span className="block h-1.5 w-9/12 bg-mist/70" />
        </div>

        <div className="mx-auto mt-6 w-full max-w-[72%]">
          <span className="inline-flex h-5 items-center border border-line px-3 text-[7px] uppercase tracking-[0.16em] text-ink sm:text-[8px]">
            Mark statement
          </span>
        </div>
      </div>

      <div className="border-t border-line px-4 py-2 text-[7px] uppercase tracking-[0.14em] text-mist sm:text-[8px]">
        One task at a time
      </div>
    </div>
  );
}
