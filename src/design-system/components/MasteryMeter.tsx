import { masteryLevelLabel } from "@/domain/mastery/mastery";
import type { MasteryLevel } from "@/content/model";
export function MasteryMeter({ mastery, level }: { mastery: number; level: MasteryLevel }) {
  return (
    <div className="mastery-meter">
      <div className="mastery-meter__header">
        <span>{masteryLevelLabel[level]}</span>
        <strong>{mastery}%</strong>
      </div>
      <div
        className="mastery-meter__track"
        role="meter"
        aria-label={`Domínio: ${mastery}% — ${masteryLevelLabel[level]}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={mastery}
      >
        <span style={{ width: `${mastery}%` }} />
      </div>
    </div>
  );
}
