import { Fragment } from "react";
import { cn } from "@/lib/utils";
import {
  MAX_MARKS,
  documentSubtitle,
  documentTitle,
  paragraphs,
} from "@/lib/study";

const prose = "font-serif text-[17px] leading-[1.9] text-ink";

/**
 * The reading document. Identical in both conditions: every sentence can be
 * marked, and the task requires exactly three marks.
 */
export function DocumentPanel({
  marks,
  notice,
  onToggle,
  onClear,
}: {
  marks: string[];
  notice: string | null;
  onToggle: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <section aria-labelledby="document-heading">
      <header className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
            Research document
          </p>
          <h2
            id="document-heading"
            className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl"
          >
            {documentTitle}
          </h2>
          <p className="mt-2 text-[13px] leading-[1.6] text-ash">
            {documentSubtitle}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-ash tabular-nums">
            {marks.length} of {MAX_MARKS} marked
          </p>
          <button
            type="button"
            onClick={onClear}
            disabled={marks.length === 0}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline disabled:pointer-events-none disabled:opacity-40"
          >
            Clear marks
          </button>
        </div>
      </header>

      {notice ? (
        <p
          role="status"
          className="mt-5 border border-line bg-surface px-4 py-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-ash"
        >
          {notice}
        </p>
      ) : null}

      <p className="mt-4 max-w-[60ch] text-[13px] leading-[1.6] text-ash">
        Select a sentence to mark it — up to {MAX_MARKS} statements in total.
      </p>

      <div className="mt-8">
        {paragraphs.map((paragraph, paragraphIndex) => (
          <p
            key={paragraph.id}
            id={paragraph.id}
            className={cn(prose, "max-w-[64ch]", paragraphIndex > 0 && "mt-7")}
          >
            {paragraph.sentences.map((sentence, sentenceIndex) => {
              const isMarked = marks.includes(sentence.id);
              return (
                <Fragment key={sentence.id}>
                  {sentenceIndex > 0 ? " " : null}
                  <button
                    type="button"
                    aria-pressed={isMarked}
                    aria-label={`${isMarked ? "Unmark" : "Mark"} statement: ${sentence.text}`}
                    onClick={() => onToggle(sentence.id)}
                    className={cn(
                      "p-0 text-left align-baseline font-serif text-[17px] transition-colors duration-150",
                      isMarked
                        ? "bg-sage/25 text-ink underline decoration-sage decoration-2 underline-offset-[5px]"
                        : "bg-transparent text-ink hover:bg-sage/10 hover:underline hover:decoration-sage hover:decoration-1 hover:underline-offset-[5px]",
                    )}
                  >
                    {sentence.text}
                  </button>
                </Fragment>
              );
            })}
          </p>
        ))}
      </div>
    </section>
  );
}
