import { useNavigate } from "react-router-dom";
import { content, concepts } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { Button } from "@/design-system/components/Button";
import { WeeklyRhythm } from "@/design-system/components/WeeklyRhythm";
import { isReviewDue } from "@/domain/review/review";

export function HomePage() {
  const { state, clock, startOnboarding } = useApp();
  const navigate = useNavigate();
  if (!state.user.onboardingComplete)
    return (
      <div className="home-new">
        <div className="home-new__edition">EDIÇÃO DE ESTREIA · TEMPORADA 1</div>
        <p className="home-new__brand">Fuxico Fiscal</p>
        <h1>
          A Reforma Tributária
          <br />
          <em>que alguém precisava</em>
          <br />
          te contar direito.
        </h1>
        <p className="home-new__dek">
          Uma conversa investigada, cinco episódios e as fontes oficiais sempre à mão.
        </p>
        <Button
          onClick={() => {
            startOnboarding();
            navigate("/onboarding");
          }}
        >
          Começar
        </Button>
        <div className="home-new__facts">
          <span>~20 min</span>
          <span>5 episódios</span>
        </div>
        <p className="verified-date">conteúdo verificado em 29/08/2026</p>
      </div>
    );
  const due = state.reviews.filter((review) => isReviewDue(review, clock)).length;
  const nextPath = state.progress.moduleComplete
    ? "/dossier"
    : state.progress.currentEpisodeId
      ? `/episode/${state.progress.currentEpisodeId}`
      : "/assessment";
  const completed = state.progress.completedEpisodeIds.length;
  return (
    <div className="home-return">
      <header>
        <span className="eyebrow">BOM TER VOCÊ DE VOLTA</span>
        <h1>Onde a gente parou…</h1>
      </header>
      <section className="resume-story">
        <span className="resume-story__number">
          {state.progress.moduleComplete ? "DOSSIÊ" : `EP. ${Math.min(completed + 1, 5)}`}
        </span>
        <div>
          <p>{content.module.seasonTitle}</p>
          <h2>
            {state.progress.moduleComplete
              ? "A fofoca inteira, agora com evidências"
              : content.episodes[Math.min(completed, 4)]?.title}
          </h2>
          <Button onClick={() => navigate(nextPath)}>
            {state.progress.moduleComplete ? "Abrir dossiê" : "Continuar"}
          </Button>
        </div>
      </section>
      <div className="home-sections">
        <button className="home-row" onClick={() => navigate("/review")}>
          <span>
            <strong>A fofoca voltou a circular</strong>
            <small>
              {due === 0 ? "Nada pendente agora" : `${due} ${due === 1 ? "revisão" : "revisões"}`}
            </small>
          </span>
          <span aria-hidden="true">→</span>
        </button>
        <section className="home-row home-row--static">
          <span>
            <strong>Ritmo da semana</strong>
            <WeeklyRhythm rhythm={state.weeklyRhythm} />
          </span>
        </section>
        <button className="home-row" onClick={() => navigate("/dossier")}>
          <span>
            <strong>Seu dossiê</strong>
            <small>
              {concepts.length} conceitos · {state.xp} XP de participação
            </small>
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
