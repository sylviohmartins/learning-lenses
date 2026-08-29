import type { WeeklyRhythmState } from "@/domain/gamification/gamification";
export function WeeklyRhythm({ rhythm }: { rhythm: WeeklyRhythmState }) {
  const completed = Math.min(rhythm.usefulSessionDates.length, rhythm.target);
  return (
    <section
      className="weekly-rhythm"
      aria-label={`${completed} de ${rhythm.target} sessões úteis nesta semana`}
    >
      <div className="rhythm-dots" aria-hidden="true">
        {Array.from({ length: rhythm.target }, (_, index) => (
          <span key={index} className={index < completed ? "is-filled" : ""} />
        ))}
      </div>
      <p>
        <strong>
          {completed} de {rhythm.target}
        </strong>{" "}
        sessões úteis
      </p>
    </section>
  );
}
