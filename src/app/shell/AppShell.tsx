import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BottomNavigation } from "@/design-system/components/BottomNavigation";
import { AchievementToast } from "@/design-system/components/AchievementToast";
import { Icon } from "@/design-system/primitives/Icon";
import { useApp } from "@/app/providers/AppProvider";

export function AppShell() {
  const { recoveryMessage, state } = useApp();
  const location = useLocation();
  const inEpisode = location.pathname.startsWith("/episode/");
  useEffect(() => {
    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);
  return (
    <div className={state.settings.reducedMotion === "reduce" ? "app reduce-motion" : "app"}>
      <header className="site-header">
        <Link className="wordmark" to="/">
          <span className="wordmark__platform">Learning Lenses</span>
          <span className="wordmark__module">Fuxico Fiscal</span>
        </Link>
        <BottomNavigation />
        <Link className="settings-link" to="/settings" aria-label="Configurações">
          <Icon name="settings" />
          <span className="settings-link__label">Ajustes</span>
        </Link>
      </header>
      {recoveryMessage && (
        <div className="recovery-banner" role="alert">
          <strong>Seus dados foram recuperados com segurança.</strong>
          <span>{recoveryMessage}</span>
        </div>
      )}
      <main id="conteudo" className={inEpisode ? "main main--episode" : "main"}>
        <Outlet />
      </main>
      <AchievementToast />
    </div>
  );
}
