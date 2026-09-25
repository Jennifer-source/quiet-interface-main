import {
  MAX_MARKS,
  NOTE_MAX_LENGTH,
  sentencesByIds,
} from "@/lib/study";

/** Step two: the single research note, with the marks kept in view. */
export function NotePanel({
  marks,
  note,
  onNoteChange,
}: {
  marks: string[];
  note: string;
  onNoteChange: (value: string) => void;
}) {
  const marked = sentencesByIds(marks);

  return (
    <section aria-labelledby="note-heading">
      <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
        Step two — the note
      </p>
      <h2
        id="note-heading"
        className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl"
      >
        Write one short note on the document.
      </h2>
      <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.75] text-ash">
        A sentence or two is enough. Say what you took from the reading, or what
        you would question in it.
      </p>

      <div className="mt-8 max-w-[64ch]">
        <label
          htmlFor="task-note"
          className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-ash"
        >
          Your note
        </label>
        <textarea
          id="task-note"
          value={note}
          rows={7}
          maxLength={NOTE_MAX_LENGTH}
          placeholder="Write your note here…"
          onChange={(event) => onNoteChange(event.target.value)}
          className="mt-3 block w-full resize-y border border-line bg-surface px-4 py-3 text-[15px] leading-[1.7] text-ink placeholder:text-mist focus:border-ash"
        />
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash tabular-nums">
          {note.length} / {NOTE_MAX_LENGTH} characters
        </p>
      </div>

      <div className="mt-10 max-w-[64ch] border-t border-line pt-6">
        <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash tabular-nums">
          Statements you marked — {marked.length} of {MAX_MARKS}
        </p>
        <ol className="mt-4">
          {marked.map((sentence, index) => (
            <li
              key={sentence.id}
              className="flex gap-4 border-b border-line py-3"
            >
              <span className="font-mono text-[11px] leading-[1.75] text-ash tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-[16px] leading-[1.75] text-ink">
                {sentence.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Step three: review both responses before submitting. */
export function ReviewPanel({
  marks,
  note,
  onChangeMarks,
  onChangeNote,
}: {
  marks: string[];
  note: string;
  onChangeMarks: () => void;
  onChangeNote: () => void;
}) {
  const marked = sentencesByIds(marks);

  return (
    <section aria-labelledby="review-heading">
      <p className="font-mono text-[10px] uppercase leading-none tracking-[0.24em] text-ash">
        Step three — review
      </p>
      <h2
        id="review-heading"
        className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl"
      >
        Check your responses before submitting.
      </h2>
      <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.75] text-ash">
        Both parts of the task are required: three marked statements and one
        note.
      </p>

      <div className="mt-8 max-w-[64ch] border-t border-line">
        <div className="flex items-baseline justify-between gap-4 border-b border-line py-4">
          <p className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-ash tabular-nums">
            Marked statements — {marked.length} of {MAX_MARKS}
          </p>
          <button
            type="button"
            onClick={onChangeMarks}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Change
          </button>
        </div>
        <ol>
          {marked.map((sentence, index) => (
            <li key={sentence.id} className="flex gap-4 border-b border-line py-4">
              <span className="font-mono text-[11px] leading-[1.8] text-ash tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-[16px] leading-[1.8] text-ink">
                {sentence.text}
              </span>
            </li>
          ))}
        </ol>

        <div className="flex items-baseline justify-between gap-4 border-b border-line py-4">
          <p className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-ash tabular-nums">
            Your note — {note.length} characters
          </p>
          <button
            type="button"
            onClick={onChangeNote}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Change
          </button>
        </div>
        <p className="whitespace-pre-wrap py-4 font-serif text-[16px] leading-[1.8] text-ink">
          {note}
        </p>
      </div>
    </section>
  );
}
