# Relatório de testes — P0

**Ambiente:** Windows, Node 24.13.1, pnpm 10.5.2, Chromium 151 via Playwright.  
**Data:** 29/08/2026.

## Gates automatizados

| Gate                       | Comando                                | Resultado final                                                                             |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| Install                    | `pnpm install`                         | PASS — lockfile concluído; foi necessário usar o CA do sistema Windows, sem desabilitar TLS |
| Lint                       | `pnpm lint`                            | PASS — 0 erros, 0 warnings                                                                  |
| Typecheck                  | `pnpm typecheck`                       | PASS                                                                                        |
| Unit/component/integration | `pnpm test:run`                        | PASS — 9 arquivos, 37 testes                                                                |
| E2E/browser                | `pnpm test:e2e`                        | PASS — 8 fluxos Chromium                                                                    |
| Build                      | `pnpm build`                           | PASS                                                                                        |
| Axe                        | incluído em `pnpm test:e2e`            | PASS — sem violações serious/critical conhecidas nas telas auditadas                        |
| Supply chain (produção)    | `pnpm audit --prod --audit-level high` | PASS — nenhuma vulnerabilidade conhecida                                                    |

## Cobertura funcional exercitada

- novo usuário → onboarding → episódio → resposta → feedback → fonte;
- cinco episódios → avaliação final → transfer → XP → achievement → Dossiê;
- progresso → reload → retomada;
- erro → misconception → evidence → review agendada;
- time travel +1d → review devida → resposta → mastery/próximo intervalo;
- fluxo inicial sem mouse;
- storage válido, migração V0→V1 e recuperação de corrupção;
- scoring de escolha, boolean, ordem, matching e resposta curta;
- mastery weights, prior, gates, níveis e consolidated;
- XP/repetição, ritmo semanal, achievements, prerequisites, freshness e LSS.

## Visual QA

Capturas reais em Home, episódio, interação e drawer nos viewports:

```text
320×568
360×800
390×844
430×932
768×1024
1280×800
1440×900
```

Correções após inspeção:

- CTA reposicionado no viewport 320×568;
- hero desktop ajustado para evitar colisão entre edição, título e metadata em 1280×800;
- toast movido no mobile para não ocultar ação/foco;
- drawer elevado acima do toast;
- scroll-to-top por rota;
- `scroll-margin` na interação para cabeçalho sticky não ocultar o enunciado;
- captura por viewport substituiu stitching longo que duplicava elementos fixed sem refletir a UI real.

## Accessibility manual/semiautomática

- teclado: PASS no fluxo inicial e no drawer;
- focus order/visível: PASS por inspeção e E2E;
- focus not obscured: PASS após correções de toast, padding e scroll-margin;
- reduced motion: PASS via media em Chromium e setting local;
- reflow/zoom 200%: PASS no cenário automatizado equivalente;
- landmarks/headings/names: PASS por inspeção estrutural + axe;
- touch targets: componentes principais ≥44px; ordem possui botões simples alternativos a drag;
- mensagens: erro e feedback usam texto/ícone, não apenas cor.

Não foi executada uma sessão com leitor de tela humano; portanto o relatório não a apresenta como PASS manual de AT.

## Loop de correção registrado

1. Certificados Node falharam → uso do CA do Windows → install PASS.
2. Primeira compilação encontrou configuração TS/Vitest/ESLint → configs corrigidas → gates verdes.
3. Primeiro E2E encontrou hit testing dos radios e saturação por workers → componente corrigido e suíte serializada.
4. Fluxo completo encontrou troca prematura entre assessments → estado ativo estabilizado por episódio.
5. Axe encontrou contraste transitório durante fade de opacidade → opacidade removida → axe PASS.
6. Visual QA encontrou CTA/hero/toast/data/foco → responsividade, z-index, UTC e navegação corrigidos.

## Performance

Build final: JavaScript 384,38 kB (117,08 kB gzip), CSS 21,83 kB (5,57 kB gzip) e HTML 0,67 kB (0,40 kB gzip). Não há imagens hero, fontes remotas bloqueantes ou biblioteca de estado. Analytics é limitado a 300 eventos.

## Known issues / blocked

- Leitor de tela com usuário/AT real: **BLOCKED** neste ambiente automatizado. Sem alegação de validação humana.
- Validação jurídica por especialista humano: fora da capacidade do build; o conteúdo usa fontes oficiais e se apresenta como verificação editorial, não certificação.
