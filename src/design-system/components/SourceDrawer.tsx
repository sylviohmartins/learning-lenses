import { useEffect, useRef, useState } from "react";
import { getSource } from "@/content";
import { sourceNeedsUpdate } from "@/domain/knowledge/freshness";
import { useApp } from "@/app/providers/AppProvider";
import { Button } from "./Button";
import { Icon } from "@/design-system/primitives/Icon";

export function SourceDrawer({ sourceIds }: { sourceIds: string[] }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const { openSource, clock } = useApp();
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  const listed = sourceIds.map(getSource).filter((value) => value !== undefined);
  return (
    <>
      <Button ref={triggerRef} variant="secondary" onClick={() => setOpen(true)}>
        <Icon name="info" size={18} />
        De onde saiu essa fofoca?
      </Button>
      {open && (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <aside
            ref={drawerRef}
            className="source-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="source-title"
          >
            <header>
              <div>
                <span className="eyebrow">Fontes oficiais</span>
                <h2 id="source-title">O que sustenta esta regra</h2>
              </div>
              <button
                ref={closeRef}
                className="icon-button"
                aria-label="Fechar fontes"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <Icon name="close" title="Fechar" />
              </button>
            </header>
            <p className="source-drawer__intro">
              A história ajuda a começar. A autoridade vem dos textos oficiais abaixo.
            </p>
            {listed.length === 0 ? (
              <p role="alert">A fonte desta passagem não foi encontrada.</p>
            ) : (
              listed.map((source) => {
                const stale = sourceNeedsUpdate(source, clock.now());
                return (
                  <article className="source-entry" key={source.id}>
                    <span className="source-entry__type">
                      {source.sourceType === "official-guidance"
                        ? "Orientação oficial"
                        : "Fonte normativa"}
                    </span>
                    <h3>{source.title}</h3>
                    <dl>
                      <div>
                        <dt>Órgão</dt>
                        <dd>{source.authority}</dd>
                      </div>
                      {source.legalReference && (
                        <div>
                          <dt>Referência</dt>
                          <dd>{source.legalReference}</dd>
                        </div>
                      )}
                      <div>
                        <dt>Status editorial</dt>
                        <dd>{stale ? "Atualização necessária" : "Verificado"}</dd>
                      </div>
                      <div>
                        <dt>Verificado em</dt>
                        <dd>{new Date(source.verifiedAt).toLocaleDateString("pt-BR")}</dd>
                      </div>
                    </dl>
                    <a
                      className="button button--secondary"
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => openSource(source.id)}
                    >
                      Abrir fonte oficial <Icon name="external-link" size={18} />
                    </a>
                  </article>
                );
              })
            )}
          </aside>
        </div>
      )}
    </>
  );
}
