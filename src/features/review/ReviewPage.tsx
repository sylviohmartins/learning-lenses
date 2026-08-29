import { useState } from "react";
import { getAssessment, getConcept } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { isReviewDue } from "@/domain/review/review";
import { ReviewCard } from "@/design-system/components/ReviewCard";
import { AssessmentInteraction } from "@/features/learn/AssessmentInteraction";
export function ReviewPage() {
  const { state, clock, startReview } = useApp();
  const [activeId, setActiveId] = useState<string>();
  const active = state.reviews.find((item) => item.id === activeId);
  if (active) {
    const assessment = getAssessment(active.assessmentId);
    const concept = getConcept(active.conceptId);
    return (
      <div className="page review-session">
        <header className="page-header">
          <span className="eyebrow">REVISÃO · {concept?.name}</span>
          <h1>A fofoca voltou a circular.</h1>
          <p>Responda de memória. Uma nova evidência pode confirmar ou mudar seu progresso.</p>
        </header>
        {assessment ? (
          <AssessmentInteraction
            key={active.id}
            assessment={assessment}
            reviewId={active.id}
            onContinue={() => setActiveId(undefined)}
          />
        ) : (
          <p role="alert">A avaliação desta revisão não foi encontrada.</p>
        )}
      </div>
    );
  }
  const unique = Array.from(
    new Map(state.reviews.map((review) => [review.conceptId, review])).values(),
  );
  const due = unique.filter((review) => isReviewDue(review, clock));
  const scheduled = unique.filter((review) => !isReviewDue(review, clock));
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">REVISÃO</span>
        <h1>O que voltou a circular</h1>
        <p>
          O tempo não derruba sua mastery sozinho. Ele apenas sinaliza quando vale recuperar uma
          ideia.
        </p>
      </header>
      {due.length === 0 && (
        <section className="empty-state">
          <span aria-hidden="true">○</span>
          <h2>Nada voltou a circular ainda.</h2>
          <p>Quando chegar a hora de revisar alguma coisa, ela aparece aqui.</p>
        </section>
      )}
      {due.map((review) => {
        const concept = getConcept(review.conceptId);
        return concept ? (
          <ReviewCard
            key={review.id}
            review={review}
            concept={concept}
            due
            onStart={() => {
              startReview(review.id);
              setActiveId(review.id);
            }}
          />
        ) : null;
      })}
      {scheduled.length > 0 && (
        <section className="scheduled">
          <h2>Já está na agenda</h2>
          {scheduled.map((review) => {
            const concept = getConcept(review.conceptId);
            return concept ? (
              <ReviewCard
                key={review.id}
                review={review}
                concept={concept}
                due={false}
                onStart={() => undefined}
              />
            ) : null;
          })}
        </section>
      )}
    </div>
  );
}
