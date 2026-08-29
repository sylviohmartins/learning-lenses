import { sources } from "@/content";
import { useApp } from "@/app/providers/AppProvider";
import { sourceNeedsUpdate } from "@/domain/knowledge/freshness";
export function SourcesPage() {
  const { openSource, clock } = useApp();
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">FONTES</span>
        <h1>O arquivo oficial</h1>
        <p>
          Normas e orientações usadas no conteúdo. “Verificado” é controle editorial, não
          certificação ou aconselhamento jurídico.
        </p>
      </header>
      <div className="sources-page">
        {sources.map((source) => (
          <article key={source.id}>
            <span className="eyebrow">
              {source.sourceType === "official-guidance" ? "ORIENTAÇÃO OFICIAL" : "FONTE NORMATIVA"}
            </span>
            <h2>{source.title}</h2>
            <p>{source.authority}</p>
            <p>
              <strong>
                {sourceNeedsUpdate(source, clock.now()) ? "Atualização necessária" : "Verificado"}
              </strong>{" "}
              em {new Date(source.verifiedAt).toLocaleDateString("pt-BR")}
            </p>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => openSource(source.id)}
            >
              Abrir fonte oficial ↗
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
