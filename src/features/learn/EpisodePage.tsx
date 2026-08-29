import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { content, getAssessment, getEpisode } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { Progress } from "@/design-system/components/Progress";
import { MessageBubble } from "@/design-system/components/MessageBubble";
import { StoryHeader } from "@/design-system/components/StoryHeader";
import { TruthReveal } from "@/design-system/components/TruthReveal";
import { SourceDrawer } from "@/design-system/components/SourceDrawer";
import { EpisodeFooter } from "@/design-system/components/EpisodeFooter";
import { AssessmentInteraction } from "./AssessmentInteraction";

export function EpisodePage() {
  const { episodeId } = useParams();
  const episode = episodeId ? getEpisode(episodeId) : undefined;
  const { state, startEpisode, completeEpisode } = useApp();
  const navigate = useNavigate();
  const [activeInteraction, setActiveInteraction] = useState<{
    episodeId?: string;
    assessmentId?: string;
  }>(() => ({
    episodeId: episode?.id,
    assessmentId: episode?.assessmentIds.find((id) => !state.progress.responses[id]),
  }));
  useEffect(() => {
    if (episodeId && getEpisode(episodeId)) startEpisode(episodeId);
  }, [episodeId, startEpisode]);
  if (!episode) return <Navigate to="/not-found" replace />;
  const activeAssessmentId =
    activeInteraction.episodeId === episode.id
      ? activeInteraction.assessmentId
      : episode.assessmentIds.find((id) => !state.progress.responses[id]);
  const assessment = activeAssessmentId ? getAssessment(activeAssessmentId) : undefined;
  const advanceInteraction = () => {
    const currentIndex = episode.assessmentIds.indexOf(activeAssessmentId ?? "");
    setActiveInteraction({
      episodeId: episode.id,
      assessmentId: episode.assessmentIds[currentIndex + 1],
    });
  };
  const finish = () => {
    completeEpisode(episode.id);
    const next = content.episodes[episode.number];
    if (next)
      setActiveInteraction({
        episodeId: next.id,
        assessmentId: next.assessmentIds.find((id) => !state.progress.responses[id]),
      });
    navigate(next ? `/episode/${next.id}` : "/assessment");
  };
  return (
    <article className="episode-page">
      <Progress
        value={episode.number}
        max={content.episodes.length}
        label="Progresso da temporada"
      />
      <StoryHeader
        number={episode.number}
        title={episode.title}
        season={content.module.seasonTitle}
      />
      {episode.id === "ep-1" && (
        <aside className="coach-note">
          <strong>Um combinado rápido</strong>
          <p>Quando quiser separar brincadeira de regra, toque em “De onde saiu essa fofoca?”.</p>
        </aside>
      )}
      <p className="episode-hook">{episode.hook}</p>
      <section className="conversation" aria-label="Conversa entre Nina, Rafa e Lia">
        {episode.messages.map((message, index) => (
          <MessageBubble key={`${message.character}-${index}`} message={message} />
        ))}
      </section>
      {assessment ? (
        <AssessmentInteraction
          key={assessment.id}
          assessment={assessment}
          episodeId={episode.id}
          onContinue={advanceInteraction}
        />
      ) : (
        <section className="episode-reveal">
          <TruthReveal truth={episode.truth} />
          <SourceDrawer sourceIds={episode.sourceIds} />
          <blockquote>“{episode.closingHook}”</blockquote>
          <EpisodeFooter
            label={episode.number === 5 ? "Ir para a avaliação final" : "Próximo episódio"}
            onContinue={finish}
          />
        </section>
      )}
    </article>
  );
}
