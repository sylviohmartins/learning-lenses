export const XP_VALUES = {
  episode: 20,
  retrieval: 15,
  transfer: 25,
  review: 15,
  "teach-back": 25,
  module: 40,
} as const;
export type XpAction = keyof typeof XP_VALUES;
export function xpFor(action: XpAction, repeated = false): number {
  return Math.floor(XP_VALUES[action] * (repeated ? 0.2 : 1));
}

export type AchievementId = "first-source" | "transition" | "transfer" | "module";
export interface AchievementState {
  id: AchievementId;
  unlockedAt?: string;
}
export const ACHIEVEMENTS: Record<AchievementId, { title: string; description: string }> = {
  "first-source": {
    title: "Foi conferir a fofoca",
    description: "Abriu a primeira fonte oficial.",
  },
  transition: {
    title: "Não caiu na fofoca de 2026",
    description: "Resolveu a confusão sobre a transição.",
  },
  transfer: { title: "Conta essa sem roteiro", description: "Acertou a primeira transferência." },
  module: { title: "Pegou a fofoca inteira", description: "Concluiu o Módulo 1." },
};
export interface AchievementSignals {
  officialSourcesOpened: number;
  transitionMisconceptionCorrect: boolean;
  correctTransfers: number;
  moduleCompleted: boolean;
}
export function achievementsFor(signals: AchievementSignals): AchievementId[] {
  const result: AchievementId[] = [];
  if (signals.officialSourcesOpened >= 1) result.push("first-source");
  if (signals.transitionMisconceptionCorrect) result.push("transition");
  if (signals.correctTransfers >= 1) result.push("transfer");
  if (signals.moduleCompleted) result.push("module");
  return result;
}

export interface WeeklyRhythmState {
  target: 2 | 3 | 4 | 5;
  weekKey: string;
  usefulSessionDates: string[];
  activityByDate: Record<string, { episodes: number; reviews: number; transfers: number }>;
}
export function weekKey(date: Date): string {
  const copy = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = copy.getUTCDay() || 7;
  copy.setUTCDate(copy.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
  return `${copy.getUTCFullYear()}-W${String(Math.ceil(((copy.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)).padStart(2, "0")}`;
}
export function progressWeeklyRhythm(
  state: WeeklyRhythmState,
  date: Date,
  activity: "episode" | "review" | "transfer",
): WeeklyRhythmState {
  const currentWeek = weekKey(date);
  const dateKey = date.toISOString().slice(0, 10);
  const base: WeeklyRhythmState =
    currentWeek === state.weekKey
      ? state
      : { ...state, weekKey: currentWeek, usefulSessionDates: [], activityByDate: {} };
  const day = base.activityByDate[dateKey] ?? { episodes: 0, reviews: 0, transfers: 0 };
  const nextDay = {
    ...day,
    episodes: day.episodes + (activity === "episode" ? 1 : 0),
    reviews: day.reviews + (activity === "review" ? 1 : 0),
    transfers: day.transfers + (activity === "transfer" ? 1 : 0),
  };
  const useful = nextDay.episodes >= 1 || nextDay.reviews >= 2 || nextDay.transfers >= 1;
  return {
    ...base,
    activityByDate: { ...base.activityByDate, [dateKey]: nextDay },
    usefulSessionDates:
      useful && !base.usefulSessionDates.includes(dateKey)
        ? [...base.usefulSessionDates, dateKey]
        : base.usefulSessionDates,
  };
}
