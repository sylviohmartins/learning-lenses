import { Button } from "./Button";
export function EpisodeFooter({ label, onContinue }: { label: string; onContinue(): void }) {
  return (
    <footer className="episode-footer">
      <Button onClick={onContinue}>
        {label} <span aria-hidden="true">→</span>
      </Button>
    </footer>
  );
}
