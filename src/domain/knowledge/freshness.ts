import type { Source } from "@/content/model";
const DAYS = { stable: 365, legislative: 90, operational: 30 } as const;
export function sourceNeedsUpdate(source: Source, now = new Date()): boolean {
  return (
    now.getTime() - new Date(source.verifiedAt).getTime() > DAYS[source.freshnessClass] * 86_400_000
  );
}
