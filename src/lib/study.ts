/** Content and constants shared by the study overview and the focus task. */

export type Condition = "conventional" | "quiet";

export type Sentence = { id: string; text: string };
export type Paragraph = { id: string; label: string; sentences: Sentence[] };

/** The task requires exactly three marked statements. */
export const MAX_MARKS = 3;
/** Upper bound for the single research note. */
export const NOTE_MAX_LENGTH = 280;

export const documentTitle = "Daylight and Alertness at Work";
export const documentSubtitle = "A short review, prepared for this study";

/**
 * The reading document. Every sentence is a candidate: participants mark the
 * three they consider most important. The text is identical in both interface
 * conditions and deliberately sits outside the study's own research question.
 */
export const paragraphs: Paragraph[] = [
  {
    id: "doc-background",
    label: "Background",
    sentences: [
      {
        id: "s1",
        text: "Daylight exposure has been associated with changes in daytime alertness in several workplace studies, although the reported effect sizes differ widely between settings.",
      },
      {
        id: "s2",
        text: "Much of the earlier literature relied on self-reported sleepiness, which correlates only loosely with behavioral measures of attention.",
      },
      {
        id: "s3",
        text: "More recent designs administer a short attention task at the desk, so alertness can be sampled during a normal working day without removing people from their environment.",
      },
      {
        id: "s4",
        text: "This shift makes the measurements more representative, and considerably harder to compare across sites.",
      },
    ],
  },
  {
    id: "doc-evidence",
    label: "Evidence",
    sentences: [
      {
        id: "s5",
        text: "Reported improvements are generally small, and most of them disappear once time of day and prior sleep are entered into the model.",
      },
      {
        id: "s6",
        text: "Season, latitude and window treatment all change the light that actually reaches the eye, so floor-area glazing remains a poor proxy for exposure.",
      },
      {
        id: "s7",
        text: "Several registered replications have failed to recover the original association.",
      },
      {
        id: "s8",
        text: "Sample sizes in this literature are frequently fewer than twenty participants.",
      },
    ],
  },
  {
    id: "doc-conclusion",
    label: "Conclusion",
    sentences: [
      {
        id: "s9",
        text: "Where an effect is found, it is usually described as short-lived, decaying within about an hour of the change in light.",
      },
      {
        id: "s10",
        text: "Almost no study has followed a cohort beyond a single working week, so seasonal claims rest on cross-sectional comparisons.",
      },
      {
        id: "s11",
        text: "The pragmatic reading is that daylight is a plausible but weak lever, and that variation within a day should be modeled rather than assumed constant.",
      },
    ],
  },
];

export const sentences: Sentence[] = paragraphs.flatMap((paragraph) =>
  paragraph.sentences.map((sentence) => sentence),
);

export function sentencesByIds(ids: string[]): Sentence[] {
  return ids
    .map((id) => sentences.find((sentence) => sentence.id === id))
    .filter((sentence): sentence is Sentence => Boolean(sentence));
}

export const conditionNames: Record<Condition, string> = {
  conventional: "Conventional",
  quiet: "Quiet",
};

export const conditionLetters: Record<Condition, string> = {
  conventional: "A",
  quiet: "B",
};

export const conditionSummaries: Record<Condition, string> = {
  conventional:
    "An interface with persistent navigation, multiple visible controls and competing information.",
  quiet:
    "A reduced interface using progressive disclosure, contextual controls and a single primary task.",
};

export const taskInstructions =
  "Read the document, mark the three statements you consider most important, then add one short note.";

export function otherCondition(condition: Condition): Condition {
  return condition === "conventional" ? "quiet" : "conventional";
}

export function isCondition(value: string | null): value is Condition {
  return value === "conventional" || value === "quiet";
}
