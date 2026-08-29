import { Navigate, Link, useParams } from "react-router-dom";
import { getConcept, getSource } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { MasteryMeter } from "@/design-system/components/MasteryMeter";
import { SourceDrawer } from "@/design-system/components/SourceDrawer";
export function ConceptPage() {
  const { conceptId } = useParams();
  const concept = conceptId ? getConcept(conceptId) : undefined;
  const { state } = useApp();
  if (!concept) return <Navigate to="/not-found" replace />;
  const item = state.concepts[concept.id] ?? {
    mastery: 30,
    level: "discovering" as const,
    evidenceIds: [],
    misconceptionIds: [],
  };
  const nextReviewAt = state.concepts[concept.id]?.nextReviewAt;
  const evidence = state.evidence.filter((value) => value.conceptId === concept.id);
  return (
    <div className="page concept-page">
      <Link to="/dossier" className="back-link">
        ← Voltar ao dossiê
      </Link>
      <header className="page-header">
        <span className="eyebrow">FICHA DO CONCEITO</span>
        <h1>{concept.name}</h1>
        <p>{concept.description}</p>
      </header>
      <MasteryMeter mastery={item.mastery} level={item.level} />
      <section>
        <h2>De onde vem o progresso</h2>
        <p>
          {evidence.length === 0
            ? "Ainda não há evidências. Comece a trilha para construir este registro."
            : `${evidence.length} evidências registradas: ${Array.from(new Set(evidence.map((value) => value.evidenceType))).join(", ")}.`}
        </p>
        <p>
          {evidence.some(
            (value) => value.evidenceType === "recall" && value.delaySinceLearningHours >= 24,
          )
            ? "✓ Há recuperação posterior."
            : "○ Falta recuperação após 24 horas para ultrapassar o gate de 79%."}
        </p>
        <p>
          {evidence.some((value) => value.evidenceType === "application")
            ? "✓ Há aplicação."
            : "○ Falta evidência de aplicação."}
        </p>
        <p>
          {evidence.some((value) => value.evidenceType === "transfer" && value.outcome === 1)
            ? "✓ Há transferência correta."
            : "○ Falta transferência correta."}
        </p>
      </section>
      <section>
        <h2>Próxima revisão</h2>
        <p>
          {nextReviewAt ? new Date(nextReviewAt).toLocaleString("pt-BR") : "Ainda não agendada."}
        </p>
        <Link className="button button--secondary" to="/review">
          Ir para revisões
        </Link>
      </section>
      <section>
        <h2>Fontes relacionadas</h2>
        <ul>
          {concept.sourceIds.map((id) => (
            <li key={id}>{getSource(id)?.title}</li>
          ))}
        </ul>
        <SourceDrawer sourceIds={concept.sourceIds} />
      </section>
    </div>
  );
}
