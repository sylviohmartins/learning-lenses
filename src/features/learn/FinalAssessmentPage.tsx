import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { content, getAssessment } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { Progress } from "@/design-system/components/Progress";
import { Button } from "@/design-system/components/Button";
import { AssessmentInteraction } from "./AssessmentInteraction";
export function FinalAssessmentPage() {
  const { state, completeModule } = useApp();
  const navigate = useNavigate();
  const ids = content.module.finalAssessmentIds;
  const [activeId, setActiveId] = useState<string | undefined>(() =>
    ids.find((id) => !state.progress.responses[id]),
  );
  const assessment = activeId ? getAssessment(activeId) : undefined;
  const answered = activeId ? ids.indexOf(activeId) : ids.length;
  const advance = () => setActiveId(ids[answered + 1]);
  if (assessment)
    return (
      <div className="assessment-page">
        <Progress value={answered + 1} max={ids.length} label="Avaliação final" />
        <header className="page-header">
          <span className="eyebrow">SEM O ROTEIRO DA FOFOCA</span>
          <h1>Agora conta o que ficou.</h1>
          <p>Esta etapa mistura recuperação, aplicação e uma situação nova.</p>
        </header>
        <AssessmentInteraction key={assessment.id} assessment={assessment} onContinue={advance} />
      </div>
    );
  const correct = ids.filter((id) => state.progress.responses[id]?.correct).length;
  return (
    <div className="completion">
      <span className="completion__mark" aria-hidden="true">
        ✓
      </span>
      <span className="eyebrow">MÓDULO CONCLUÍDO</span>
      <h1>A fofoca inteira, sem perder a fonte.</h1>
      <p>
        Você acertou {correct} de {ids.length}. O dossiê mostra o tipo de evidência de cada conceito
        — não só uma porcentagem solta.
      </p>
      <div className="completion__xp">
        <strong>+{state.progress.moduleComplete ? 0 : 40} XP</strong>
        <span>por concluir o módulo</span>
      </div>
      <Button
        onClick={() => {
          completeModule();
          navigate("/dossier");
        }}
      >
        Abrir meu dossiê
      </Button>
    </div>
  );
}
