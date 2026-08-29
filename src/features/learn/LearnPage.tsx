import { Link } from "react-router-dom";
import { content } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
export function LearnPage() {
  const { state } = useApp();
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">TRILHA</span>
        <h1>As histórias desta temporada</h1>
      </header>
      <section className="season">
        <span className="season__number">TEMPORADA 1</span>
        <h2>{content.module.seasonTitle}</h2>
        <p>{content.module.title}</p>
        <ol className="episode-list">
          {content.episodes.map((episode) => {
            const complete = state.progress.completedEpisodeIds.includes(episode.id);
            return (
              <li key={episode.id}>
                <Link to={`/episode/${episode.id}`}>
                  <span>{String(episode.number).padStart(2, "0")}</span>
                  <div>
                    <strong>{episode.title}</strong>
                    <small>{complete ? "Concluído" : `${episode.estimatedMinutes} min`}</small>
                  </div>
                  <span aria-hidden="true">{complete ? "✓" : "→"}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
      <section className="season season--soon">
        <span className="season__number">TEMPORADA 2 · EM BREVE</span>
        <h2>Quem está saindo da festa?</h2>
        <p>Continuação editorial, ainda fora deste P0.</p>
      </section>
    </div>
  );
}
