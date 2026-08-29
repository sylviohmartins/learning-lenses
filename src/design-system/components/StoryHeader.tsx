export function StoryHeader({
  number,
  title,
  season,
}: {
  number: number;
  title: string;
  season: string;
}) {
  return (
    <header className="story-header">
      <span className="eyebrow">
        EPISÓDIO {number} · {season}
      </span>
      <h1>{title}</h1>
    </header>
  );
}
