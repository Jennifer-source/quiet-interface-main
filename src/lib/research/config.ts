import type { ConditionOrder } from "./types";

/**
 * Researcher-controlled assignment. Order A is Conventional → Quiet, order B
 * is Quiet → Conventional. Change this constant between sessions to run the
 * other order; participants are never asked to choose.
 */
export const configuredConditionOrder: ConditionOrder = "A";
