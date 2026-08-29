import type { AnalyticsEventName } from "@/content/schemas";
import type { PersistedState } from "@/persistence/schema";

const sessionId = `session-${crypto.randomUUID()}`;
export type EventContext = Partial<{
  subjectId: string;
  moduleId: string;
  episodeId: string;
  conceptId: string;
  assessmentId: string;
}>;
export function addEvent(
  state: PersistedState,
  name: AnalyticsEventName,
  occurredAt: string,
  context: EventContext = {},
  properties: Record<string, unknown> = {},
): PersistedState {
  const event = { id: crypto.randomUUID(), name, occurredAt, sessionId, ...context, properties };
  return { ...state, analytics: [...state.analytics, event].slice(-300) };
}
