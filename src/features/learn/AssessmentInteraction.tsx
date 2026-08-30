import { useEffect, useRef, useState } from "react";
import type { Assessment } from "@/content/model";
import type { AssessmentResponse } from "@/domain/learning/scoring";
import { useApp } from "@/app/providers/AppProvider";
import { Button } from "@/design-system/components/Button";
import { PredictionChoice } from "@/design-system/components/PredictionChoice";
import { FeedbackPanel } from "@/design-system/components/FeedbackPanel";
import { Icon } from "@/design-system/primitives/Icon";

interface Props {
  assessment: Assessment;
  episodeId?: string;
  reviewId?: string;
  onContinue(correct: boolean): void;
}
export function AssessmentInteraction({ assessment, episodeId, reviewId, onContinue }: Props) {
  const { answerAssessment, recordInteractionViewed } = useApp();
  const [response, setResponse] = useState<AssessmentResponse>(() => {
    if (assessment.kind === "order") return assessment.orderItems?.map((item) => item.id) ?? [];
    if (assessment.kind === "matching") return {};
    return "";
  });
  const [confidence, setConfidence] = useState<1 | 2 | 3>();
  const [hintUsed, setHintUsed] = useState(false);
  const [result, setResult] = useState<boolean>();
  const [error, setError] = useState("");
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    recordInteractionViewed(assessment.id, episodeId);
  }, [assessment.id, episodeId, recordInteractionViewed]);
  useEffect(() => {
    if (result !== undefined) {
      feedbackRef.current?.focus({ preventScroll: true });
      feedbackRef.current?.scrollIntoView({ block: "center" });
    }
  }, [result]);
  const updateResponse = (value: AssessmentResponse) => {
    setResponse(value);
    if (error) setError("");
  };
  const hasResponse =
    typeof response === "string"
      ? response.trim().length > 0
      : Array.isArray(response)
        ? response.length > 0
        : Object.keys(response).length === (assessment.matchLeft?.length ?? 0);
  const submit = () => {
    if (!hasResponse) {
      setError("Escolha ou escreva uma resposta antes de conferir.");
      return;
    }
    if (assessment.asksConfidence && !confidence) {
      setError("Conte como está sua confiança antes de conferir.");
      return;
    }
    setError("");
    setResult(
      answerAssessment(assessment.id, response, { confidence, hintUsed, episodeId, reviewId }),
    );
  };
  const move = (index: number, direction: -1 | 1) => {
    if (!Array.isArray(response)) return;
    const target = index + direction;
    if (target < 0 || target >= response.length) return;
    const next = [...response];
    [next[index], next[target]] = [next[target]!, next[index]!];
    updateResponse(next);
  };
  return (
    <section
      className={`interaction interaction--${assessment.kind}`}
      aria-labelledby={`prompt-${assessment.id}`}
    >
      <span className="eyebrow">SUA VEZ</span>
      <h2 id={`prompt-${assessment.id}`}>{assessment.prompt}</h2>
      {assessment.asksConfidence && result === undefined && (
        <fieldset className="confidence">
          <legend>Antes: como está sua confiança?</legend>
          {(
            [
              { value: 1, label: "chutei" },
              { value: 2, label: "acho que sei" },
              { value: 3, label: "tenho certeza" },
            ] as const
          ).map((item) => (
            <label key={item.value}>
              <input
                type="radio"
                name={`confidence-${assessment.id}`}
                checked={confidence === item.value}
                onChange={() => {
                  setConfidence(item.value);
                  if (error) setError("");
                }}
              />
              <span>{item.value}</span>
              {item.label}
            </label>
          ))}
        </fieldset>
      )}
      {result === undefined && (
        <>
          {(assessment.kind === "single-choice" || assessment.kind === "boolean") && (
            <PredictionChoice
              choices={assessment.choices ?? []}
              value={typeof response === "string" ? response : undefined}
              onChange={updateResponse}
              name={assessment.id}
            />
          )}
          {assessment.kind === "order" && Array.isArray(response) && (
            <ol className="order-list">
              {response.map((id, index) => {
                const item = assessment.orderItems?.find((candidate) => candidate.id === id);
                return (
                  <li key={id}>
                    <span>{item?.label}</span>
                    <div>
                      <button
                        type="button"
                        aria-label={`Mover ${item?.label} para cima`}
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                      >
                        <Icon name="arrow-up" size={19} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Mover ${item?.label} para baixo`}
                        disabled={index === response.length - 1}
                        onClick={() => move(index, 1)}
                      >
                        <Icon name="arrow-down" size={19} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          {assessment.kind === "matching" &&
            !Array.isArray(response) &&
            typeof response !== "string" && (
              <div className="matching-list">
                {assessment.matchLeft?.map((left) => (
                  <label key={left.id}>
                    <span>{left.label}</span>
                    <select
                      aria-label={`Correspondência para ${left.label}`}
                      value={response[left.id] ?? ""}
                      onChange={(event) =>
                        updateResponse({ ...response, [left.id]: event.target.value })
                      }
                    >
                      <option value="">Selecione</option>
                      {assessment.matchRight?.map((right) => (
                        <option key={right.id} value={right.id}>
                          {right.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            )}
          {assessment.kind === "short-text" && (
            <label className="short-answer">
              <span>Sua resposta</span>
              <textarea
                rows={5}
                value={typeof response === "string" ? response : ""}
                onChange={(event) => updateResponse(event.target.value)}
                placeholder="Explique com suas palavras…"
              />
            </label>
          )}
          <div className="interaction__actions">
            <Button onClick={submit}>Conferir resposta</Button>
            <Button variant="quiet" onClick={() => setHintUsed(true)} aria-pressed={hintUsed}>
              {hintUsed ? "Dica ativada" : "Quero uma pista"}
            </Button>
          </div>
          {hintUsed && (
            <p className="hint" role="status">
              Procure a diferença entre começar uma etapa e concluir toda a mudança.
            </p>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </>
      )}
      {result !== undefined && (
        <div ref={feedbackRef} tabIndex={-1}>
          <FeedbackPanel
            correct={result}
            correctText={assessment.feedbackCorrect}
            wrongText={assessment.feedbackWrong}
            competenceFeedback={result && confidence === 1}
          />
          <Button onClick={() => onContinue(result)}>
            Continuar <Icon name="arrow-right" size={18} />
          </Button>
        </div>
      )}
    </section>
  );
}
