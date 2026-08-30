import { useNavigate } from "react-router-dom";
import { content, concepts } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { Button } from "@/design-system/components/Button";
import { WeeklyRhythm } from "@/design-system/components/WeeklyRhythm";
import { Progress } from "@/design-system/components/Progress";
import { Icon } from "@/design-system/primitives/Icon";
import { isReviewDue } from "@/domain/review/review";

export function HomePage() {
  const { state, clock, startOnboarding } = useApp();
  const navigate = useNavigate();
  if (!state.user.onboardingComplete)
    return (
      <div className="home-new">
        <span className="home-new__kicker">Fuxico Fiscal · Temporada 1</span>
        <h1>A Reforma Tributária que alguém precisava te contar direito.</h1>
        <p className="home-new__dek">
          Uma conversa investigada para entender a regra real — com prática ativa e as fontes
          oficiais sempre à mão.
        </p>
        <div className="home-new__actions">
          <Button
            onClick={() => {
              startOnboarding();
              navigate("/onboarding");
            }}
          >
            Começar
            <Icon name="arrow-right" size={18} />
          </Button>
          <span>cerca de 20 minutos</span>
        </div>
        <ul className="home-new__facts" aria-label="Sobre o módulo">
          <li>
            <strong>5</strong>
            <span>episódios curtos</span>
          </li>
          <li>
            <strong>Fontes oficiais</strong>
            <span>junto de cada regra</span>
          </li>
          <li>
            <strong>Prática ativa</strong>
            <span>com revisão e transferência</span>
          </li>
        </ul>
        <p className="verified-date">Conteúdo verificado em 29/08/2026</p>
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
      <header className="home-return__header">
        <span className="home-context">Seu aprendizado</span>
        <h1>Continue de onde parou.</h1>
        <p>A próxima etapa já está pronta; o restante fica em segundo plano.</p>
      </header>
      <section className="resume-story">
        <div className="resume-story__meta">
          <span>{state.progress.moduleComplete ? "Módulo completo" : "Próxima etapa"}</span>
          <span>{content.module.seasonTitle}</span>
        </div>
        <div className="resume-story__body">
          <div>
            <p>
              {state.progress.moduleComplete
                ? "Seu dossiê está pronto"
                : `Episódio ${Math.min(completed + 1, 5)} de 5`}
            </p>
            <h2>
              {state.progress.moduleComplete
                ? "A fofoca inteira, agora com evidências"
                : content.episodes[Math.min(completed, 4)]?.title}
            </h2>
            <Button onClick={() => navigate(nextPath)}>
              {state.progress.moduleComplete ? "Abrir dossiê" : "Continuar"}
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>
          <Progress
            value={state.progress.moduleComplete ? 5 : completed}
            max={5}
            label="Progresso da temporada"
          />
        </div>
      </section>
      <div className="home-sections">
        <button type="button" className="home-row" onClick={() => navigate("/review")}>
          <Icon name="review" size={22} />
          <span>
            <strong>Revisões</strong>
            <small>
              {due === 0
                ? "Nada pendente agora"
                : `${due} ${due === 1 ? "revisão pronta" : "revisões prontas"}`}
            </small>
          </span>
          <Icon className="home-row__arrow" name="arrow-right" size={18} />
        </button>
        <section className="home-row home-row--static">
          <Icon name="check" size={22} />
          <span>
            <strong>Ritmo da semana</strong>
            <WeeklyRhythm rhythm={state.weeklyRhythm} />
          </span>
        </section>
        <button type="button" className="home-row" onClick={() => navigate("/dossier")}>
          <Icon name="dossier" size={22} />
          <span>
            <strong>Dossiê de domínio</strong>
            <small>
              {concepts.length} conceitos · {state.xp} XP de participação
            </small>
          </span>
          <Icon className="home-row__arrow" name="arrow-right" size={18} />
        </button>
      </div>
    </div>
  );
}
