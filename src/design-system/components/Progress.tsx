export function Progress({ value, max, label }: { value: number; max: number; label: string }) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>{label}</span>
        <span>
          {value} de {max}
        </span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
