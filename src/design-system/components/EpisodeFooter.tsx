import { Button } from "./Button";
import { Icon } from "@/design-system/primitives/Icon";

export function EpisodeFooter({ label, onContinue }: { label: string; onContinue(): void }) {
  return (
    <footer className="episode-footer">
      <Button onClick={onContinue}>
        {label} <Icon name="arrow-right" size={18} />
      </Button>
    </footer>
  );
}
