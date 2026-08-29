import { ACHIEVEMENTS } from "@/domain/gamification/gamification";
import { useApp } from "@/app/providers/AppProvider";
export function AchievementToast() {
  const { state, dismissAchievement } = useApp();
  const id = state.progress.recentAchievementId;
  if (!id) return null;
  const item = ACHIEVEMENTS[id];
  return (
    <aside className="achievement-toast" role="status">
      <span aria-hidden="true">✦</span>
      <div>
        <p className="eyebrow">CONQUISTA</p>
        <strong>{item.title}</strong>
        <p>{item.description}</p>
      </div>
      <button className="icon-button" onClick={dismissAchievement} aria-label="Dispensar conquista">
        ×
      </button>
    </aside>
  );
}
