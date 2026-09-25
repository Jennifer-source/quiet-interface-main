import { emptyConditionStep, type ResearchSession } from "./types";

/**
 * Measurement storage.
 *
 * Stage-one design: sessions accumulate in memory and, when available, are
 * mirrored to `sessionStorage` so a page reload mid-study does not discard
 * them. The sink is swappable — a future Convex-backed sink can be registered
 * here without touching the UI. If remote persistence fails, the session
 * continues working in memory.
 */

const STORAGE_KEY = "quiet-interface-research-sessions";

/** Where sessions are delivered for persistence (see `setSessionSink`). */
export type SessionSink = (session: ResearchSession) => void;

let sink: SessionSink | null = null;

export function setSessionSink(next: SessionSink | null) {
  sink = next;
}

function deliver(session: ResearchSession) {
  try {
    sink?.(session);
  } catch (error) {
    // Remote persistence is optional; recording must never break the task.
    console.warn("[research] session sink failed", error);
  }
}

/* ------------------------------------------------------------------ */
/* Local fallback                                                      */
/* ------------------------------------------------------------------ */

let sessions: ResearchSession[] = [];
let hydrated = false;

/** Pull tab-storage data back in after a page reload (memory is the source). */
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  if (sessions.length === 0) {
    sessions = loadFromStorage();
  }
}

function loadFromStorage(): ResearchSession[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ResearchSession[]) : [];
  } catch {
    return [];
  }
}

function persist() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // Storage may be unavailable (privacy mode, quota); memory still works.
  }
}

/** Read back everything recorded this session (researcher view). */
export function getSessions(): ResearchSession[] {
  hydrate();
  return sessions;
}

export function resetSessions() {
  sessions = [];
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/* ------------------------------------------------------------------ */
/* Session lifecycle                                                   */
/* ------------------------------------------------------------------ */

/** Anonymous, non-identifying session id: random, not derived from the user. */
function createSessionId() {
  return `ses_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function startSession(conditionOrder: "A" | "B"): ResearchSession {
  hydrate();
  const session: ResearchSession = {
    sessionId: createSessionId(),
    conditionOrder,
    startedAt: Date.now(),
    completedAt: null,
    conditionSteps: {
      conventional: emptyConditionStep(),
      quiet: emptyConditionStep(),
    },
  };
  sessions = [session, ...sessions].slice(0, 20);
  persist();
  return session;
}

/** Deliver the latest state of a session to the configured sink. */
export function syncSession(session: ResearchSession) {
  persist();
  deliver(session);
  return session;
}

export function completeSession(session: ResearchSession): ResearchSession {
  const completed: ResearchSession = {
    ...session,
    completedAt: Date.now(),
  };
  deliver(completed);
  persist();
  return completed;
}
