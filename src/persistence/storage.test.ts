import {
  createInitialState,
  loadState,
  migrateState,
  saveState,
  STORAGE_BACKUP_KEY,
  STORAGE_KEY,
} from "./storage";
import { persistedStateSchema } from "./schema";
describe("storage versionado", () => {
  it("migra schema 0 para 1 preservando XP e onboarding", () => {
    const migrated = persistedStateSchema.parse(
      migrateState(
        { schemaVersion: 0, xp: 42, onboarded: true },
        new Date("2026-08-29T00:00:00.000Z"),
      ),
    );
    expect(migrated.schemaVersion).toBe(1);
    expect(migrated.xp).toBe(42);
    expect(migrated.user.onboardingComplete).toBe(true);
  });
  it("persiste e restaura estado válido", () => {
    const state = createInitialState(new Date("2026-08-29T00:00:00.000Z"));
    saveState(state);
    expect(loadState().state).toEqual(state);
  });
  it("recupera corrupção sem tela branca e preserva backup", () => {
    localStorage.setItem(STORAGE_KEY, "{quebrado");
    const result = loadState();
    expect(result.recovered).toBe(true);
    expect(result.state.schemaVersion).toBe(1);
    expect(localStorage.getItem(STORAGE_BACKUP_KEY)).toBe("{quebrado");
  });
});
