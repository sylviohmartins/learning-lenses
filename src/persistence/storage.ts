import { weekKey } from "@/domain/gamification/gamification";
import { persistedStateSchema, type PersistedState } from "./schema";

export const STORAGE_KEY = "fuxico-fiscal:state";
export const STORAGE_BACKUP_KEY = "fuxico-fiscal:corrupted-backup";

export function createInitialState(now = new Date()): PersistedState {
  return {
    schemaVersion: 1,
    user: { onboardingComplete: false, createdAt: now.toISOString() },
    progress: {
      moduleStarted: false,
      moduleComplete: false,
      completedEpisodeIds: [],
      responses: {},
    },
    concepts: {},
    reviews: [],
    evidence: [],
    xp: 0,
    achievements: [
      { id: "first-source" },
      { id: "transition" },
      { id: "transfer" },
      { id: "module" },
    ],
    weeklyRhythm: { target: 3, weekKey: weekKey(now), usefulSessionDates: [], activityByDate: {} },
    settings: { reducedMotion: "system", clockOffsetDays: 0 },
    analytics: [],
  };
}

export function migrateState(raw: unknown, now = new Date()): unknown {
  if (typeof raw !== "object" || raw === null) return raw;
  const value = raw as Record<string, unknown>;
  if (value.schemaVersion === 0) {
    const initial = createInitialState(now);
    return {
      ...initial,
      xp: typeof value.xp === "number" ? Math.max(0, Math.floor(value.xp)) : 0,
      user: { ...initial.user, onboardingComplete: value.onboarded === true },
      schemaVersion: 1,
    };
  }
  return raw;
}

export interface LoadResult {
  state: PersistedState;
  recovered: boolean;
  message?: string;
}
export function loadState(storage: Storage = localStorage, now = new Date()): LoadResult {
  const serialized = storage.getItem(STORAGE_KEY);
  if (!serialized) return { state: createInitialState(now), recovered: false };
  try {
    const parsed: unknown = JSON.parse(serialized);
    const state = persistedStateSchema.parse(migrateState(parsed, now));
    return { state, recovered: false };
  } catch {
    try {
      storage.setItem(STORAGE_BACKUP_KEY, serialized);
    } catch {
      /* storage may be full; recovery still proceeds */
    }
    return {
      state: createInitialState(now),
      recovered: true,
      message:
        "Encontramos dados locais inválidos. Uma cópia foi preservada e o app voltou a um estado seguro.",
    };
  }
}

export function saveState(state: PersistedState, storage: Storage = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(persistedStateSchema.parse(state)));
}
export function resetState(storage: Storage = localStorage): PersistedState {
  storage.removeItem(STORAGE_KEY);
  return createInitialState();
}
