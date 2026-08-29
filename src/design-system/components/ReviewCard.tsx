import type { ReviewState } from "@/domain/review/review";
import type { Concept } from "@/content/model";
import { Button } from "./Button";
export function ReviewCard({
  review,
  concept,
  due,
  onStart,
}: {
  review: ReviewState;
  concept: Concept;
  due: boolean;
  onStart(): void;
}) {
  return (
    <article
      className={`review-card ${review.misconceptionPriority === "high" ? "review-card--priority" : ""}`}
    >
      <div>
        <span className="eyebrow">
          {review.misconceptionPriority === "high"
            ? "ATENÇÃO À CONFUSÃO"
            : due
              ? "PRONTA PARA REVER"
              : "AGENDADA"}
        </span>
        <h3>{concept.name}</h3>
        <p>
          {due
            ? "Essa ideia voltou a circular. Veja se ainda está firme."
            : `Volta em ${new Date(review.dueAt).toLocaleDateString("pt-BR")}.`}
        </p>
      </div>
      {due && <Button onClick={onStart}>Revisar agora</Button>}
    </article>
  );
}
