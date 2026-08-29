import { Link } from "react-router-dom";
import { concepts } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { MasteryMeter } from "@/design-system/components/MasteryMeter";
export function DossierPage() {
  const { state, openDossier } = useApp();
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">SEU DOSSIÊ</span>
        <h1>O que as evidências dizem</h1>
        <p>
          Mastery é uma heurística experimental: respostas mais difíceis, posteriores e sem dica
          pesam mais. XP não entra nessa conta.
        </p>
      </header>
      <div className="dossier-list">
        {concepts.map((concept) => {
          const item = state.concepts[concept.id] ?? {
            mastery: 30,
            level: "discovering" as const,
            evidenceIds: [],
          };
          const types = new Set(
            state.evidence
              .filter((evidence) => evidence.conceptId === concept.id)
              .map((evidence) => evidence.evidenceType),
          );
          return (
            <article className="dossier-card" key={concept.id}>
              <div>
                <span className="eyebrow">CONCEITO</span>
                <h2>{concept.name}</h2>
                <p>{concept.description}</p>
              </div>
              <MasteryMeter mastery={item.mastery} level={item.level} />
              <ul className="evidence-chips" aria-label="Tipos de evidência">
                <li className={types.has("recognition") ? "done" : ""}>reconhecimento</li>
                <li className={types.has("recall") ? "done" : ""}>recall</li>
                <li className={types.has("application") ? "done" : ""}>aplicação</li>
                <li className={types.has("transfer") ? "done" : ""}>transferência</li>
              </ul>
              <Link to={`/dossier/${concept.id}`} onClick={() => openDossier(concept.id)}>
                Ver relações e fontes <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
