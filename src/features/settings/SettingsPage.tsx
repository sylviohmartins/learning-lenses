import { useState } from "react";
import { useApp } from "@/app/providers/AppProvider";
import { Button } from "@/design-system/components/Button";
import {
  createResearchExport,
  downloadResearchExport,
  participantCodeSchema,
} from "@/research/export";
export function SettingsPage() {
  const { state, setWeeklyTarget, setReducedMotion, setClockOffset, resetAll } = useApp();
  const [participantCode, setParticipantCode] = useState("");
  const [exportStatus, setExportStatus] = useState("");

  const exportEvidence = () => {
    const parsed = participantCode ? participantCodeSchema.safeParse(participantCode) : undefined;
    if (parsed && !parsed.success) {
      setExportStatus(parsed.error.issues[0]?.message ?? "Código inválido.");
      return;
    }
    const filename = downloadResearchExport(createResearchExport(state, parsed?.data));
    setExportStatus(`Arquivo baixado: ${filename}`);
  };

  return (
    <div className="page settings-page">
      <header className="page-header">
        <span className="eyebrow">CONFIGURAÇÕES</span>
        <h1>Seu ritmo, do seu jeito</h1>
      </header>
      <section>
        <h2>Meta semanal</h2>
        <p>Uma sessão útil inclui um episódio, duas revisões ou uma transferência/teach-back.</p>
        <div className="segmented" role="group" aria-label="Sessões úteis por semana">
          {([2, 3, 4, 5] as const).map((target) => (
            <button
              key={target}
              aria-pressed={state.weeklyRhythm.target === target}
              onClick={() => setWeeklyTarget(target)}
            >
              {target}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2>Movimento</h2>
        <label className="field-label" htmlFor="motion">
          Preferência de animação
        </label>
        <select
          id="motion"
          value={state.settings.reducedMotion}
          onChange={(event) =>
            setReducedMotion(event.target.value as "system" | "reduce" | "allow")
          }
        >
          <option value="system">Seguir o sistema</option>
          <option value="reduce">Reduzir movimento</option>
          <option value="allow">Permitir movimento</option>
        </select>
      </section>
      {import.meta.env.DEV && (
        <section className="dev-panel">
          <span className="eyebrow">SOMENTE DESENVOLVIMENTO</span>
          <h2>Viajar no tempo da revisão</h2>
          <p>
            Deslocamento atual: +{state.settings.clockOffsetDays} dias. Este controle não entra no
            build de produção.
          </p>
          <div className="button-row">
            {[0, 1, 3, 7, 21].map((days) => (
              <Button
                key={days}
                variant={state.settings.clockOffsetDays === days ? "primary" : "secondary"}
                onClick={() => setClockOffset(days)}
              >
                +{days}d
              </Button>
            ))}
          </div>
        </section>
      )}
      <section>
        <h2>Exportar evidências</h2>
        <p>
          Baixe um JSON pseudônimo com resultados, eventos e evolução. Textos digitados e sua
          preferência de movimento não entram no arquivo.
        </p>
        <label className="field-label" htmlFor="participant-code">
          Código do participante (opcional)
        </label>
        <input
          id="participant-code"
          value={participantCode}
          maxLength={32}
          autoComplete="off"
          aria-describedby="participant-code-help"
          onChange={(event) => {
            setParticipantCode(event.target.value);
            setExportStatus("");
          }}
        />
        <p id="participant-code-help" className="field-help">
          Use apenas o código fornecido pelo estudo, nunca nome, e-mail ou CPF.
        </p>
        <Button variant="secondary" onClick={exportEvidence}>
          Baixar dados do piloto
        </Button>
        <p id="export-status" className="status-message" role="status" aria-live="polite">
          {exportStatus}
        </p>
      </section>
      <section className="danger-zone">
        <h2>Dados locais</h2>
        <p>O P0 guarda progresso apenas neste navegador.</p>
        <Button
          variant="danger"
          onClick={() => {
            if (window.confirm("Apagar todo o progresso local? Essa ação não pode ser desfeita."))
              resetAll();
          }}
        >
          Resetar todos os dados
        </Button>
      </section>
    </div>
  );
}
