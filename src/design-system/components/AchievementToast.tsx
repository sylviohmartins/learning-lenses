import { ACHIEVEMENTS } from "@/domain/gamification/gamification";
import { useApp } from "@/app/providers/AppProvider";
import { Icon } from "@/design-system/primitives/Icon";

export function AchievementToast() {
  const { state, dismissAchievement } = useApp();
  const id = state.progress.recentAchievementId;
  if (!id) return null;
  const item = ACHIEVEMENTS[id];
  return (
    <aside className="achievement-toast" role="status">
      <Icon name="sparkle" size={22} />
      <div>
        <p className="eyebrow">CONQUISTA</p>
        <strong>{item.title}</strong>
        <p>{item.description}</p>
      </div>
      <button className="icon-button" onClick={dismissAchievement} aria-label="Dispensar conquista">
        <Icon name="close" />
      </button>
    </aside>
  );
}
