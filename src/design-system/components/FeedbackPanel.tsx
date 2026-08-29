export function FeedbackPanel({
  correct,
  correctText,
  wrongText,
  competenceFeedback = false,
}: {
  correct: boolean;
  correctText: string;
  wrongText: string;
  competenceFeedback?: boolean;
}) {
  return (
    <section
      className={`feedback feedback--${correct ? "correct" : "wrong"}`}
      role="status"
      tabIndex={-1}
      data-testid="feedback"
    >
      <p className="eyebrow">{correct ? "isso." : "essa fofoca veio pela metade."}</p>
      <p>{correct ? correctText : wrongText}</p>
      {competenceFeedback && (
        <p>
          <strong>Você sabia mais do que imaginava.</strong> Vale recalibrar essa confiança.
        </p>
      )}
    </section>
  );
}
