# Plano persistente — P0 Visual Recovery

- Última atualização: 2026-08-29
- Estado: **IMPLEMENTAÇÃO APROVADA — Etapa 2 validada; Etapa 3 em preparação**
- Branch: `main`
- Baseline funcional: `b8ed404`
- UI alterada nesta fase: **não**

Este arquivo é o equivalente simples e versionado a `planning-with-files`: concentra plano, findings,
progresso, decisões, problemas, gates e validações para que a tarefa não dependa do contexto da sessão.

## Objetivo

Recuperar a camada de experiência do P0 sem reescrever produto, pedagogia, conteúdo ou domínios que já
funcionam. O resultado precisa ser learning-first, content-first, mobile-first, acessível, multi-lens e
visualmente maduro, com controle humano antes do build e antes do ship.

## Baseline técnico atual

| Verificação                            | Resultado real em 2026-08-29                               |
| -------------------------------------- | ---------------------------------------------------------- |
| `pnpm install --frozen-lockfile`       | PASS                                                       |
| `pnpm format:check`                    | PASS                                                       |
| `pnpm lint`                            | PASS, zero warnings                                        |
| `pnpm typecheck`                       | PASS, TypeScript strict                                    |
| `pnpm test:run`                        | PASS, 10 arquivos / 39 testes                              |
| `pnpm build`                           | PASS; JS 387,65 kB (118,28 gzip), CSS 21,96 kB (5,61 gzip) |
| `pnpm audit --prod --audit-level high` | PASS, sem vulnerabilidade conhecida                        |
| `pnpm test:e2e`                        | PASS, 9/9 em Chromium                                      |
| Browser real / console                 | 9 rotas percorridas; zero warning/error                    |
| Overflow                               | nenhum nos sete viewports                                  |
| axe/teclado/reduced motion             | PASS na cobertura existente                                |

Ambiente: Node 24.13.1, pnpm 10.5.2, React 19.2.8, TypeScript 6.0.2, Vite 8.2.2,
Playwright 1.62.1 e axe-playwright 4.13.0.

## Baseline visual

BEFORE preservado em `artifacts/visual-recovery/before/`:

- Home, Episode e Interaction;
- 320×568, 360×800, 390×844, 430×932, 768×1024, 1280×800 e 1440×900;
- 21 PNGs no total.

As capturas atuais em `artifacts/screenshots/` continuam sendo saídas operacionais dos E2E; o diretório
`before/` é a evidência imutável desta fase.

## Estado real do repositório

- modular monolith client-side e content-as-data;
- cinco episódios completos e avaliação final;
- cinco tipos de interação;
- mastery, review, gamification, persistence e analytics locais funcionando;
- rotas e estados de erro/empty existentes;
- CSS monolítico de 1.456 linhas, ainda administrável, mas com tokens misturados e decisões locais;
- `main` acompanha `origin/main`;
- não existe `AGENTS.md` no repo;
- Plannotator, Impeccable, frontend-design, UI UX Pro Max, OpenDesign, planning-with-files e
  loop-engineering não estão instalados nesta execução.

## Findings consolidados

1. O produto é tecnicamente sólido; a recuperação deve ser cirúrgica.
2. Newsroom Social aparece literal no runtime e acopla plataforma à lente.
3. Giant type, serif global, accent em palavra, geometria, selo, eyebrows e filetes criam aparência de
   “AI editorial concept”.
4. A sidebar a partir de 700 px transmite dashboard e pesa sobre o conteúdo.
5. Assessment funciona, mas sua linguagem visual é de formulário em card.
6. Mobile não transborda, porém 320 depende de exceções e tablet herda decisões de desktop cedo demais.
7. Motion é contido e reduced motion já existe: preservar.
8. Gamificação é subordinada no baseline: preservar a prioridade de mastery/review.
9. Unicode como icon system precisa ser substituído por SVG coerente.
10. O principal ganho vem de hierarchy, typography, spacing, surfaces e estados — não de mais efeitos.

Detalhes e evidências: `DESIGN_AUDIT_BEFORE.md`.

## Direções avaliadas

### A — Quiet Premium

Low chrome, tipografia neutra, superfícies silenciosas e alta atenção a detalhe. Excelente para leitura,
multi-lens e craft; risco de reduzir demais a energia pedagógica e a personalidade.

### B — Modern Editorial

Ritmo editorial controlado, serif funcional, composição mais expressiva e forte tratamento de
narrativa. Preserva personalidade; risco alto de recair no problema atual e escalar mal para outras
lentes.

### C — Learning Native

Prompt, tentativa, confiança, feedback, progress e mastery viram a principal linguagem visual. A lente
aparece nos pontos que ajudam narrativa e memória. Escala melhor e diferencia o produto por sua função;
exige craft rigoroso para não parecer LMS.

## Score ponderado

Pontuação bruta respeita os pesos do prompt e soma 100.

| Critério                    |    Peso | A Quiet Premium | B Modern Editorial | C Learning Native |
| --------------------------- | ------: | --------------: | -----------------: | ----------------: |
| Clareza                     |      20 |              18 |                 15 |                19 |
| Aprendizagem                |      20 |              16 |                 15 |                20 |
| Craft / qualidade percebida |      20 |              19 |                 18 |                17 |
| Escalabilidade multi-lens   |      10 |              10 |                  7 |                10 |
| Personalidade               |      10 |               7 |                  9 |                 8 |
| Originalidade               |      10 |               7 |                  8 |                 9 |
| Acessibilidade              |      10 |               9 |                  8 |                10 |
| **Total**                   | **100** |          **86** |             **80** |            **93** |

Justificativa:

- A vence em silêncio e craft, mas a aprendizagem pode parecer conteúdo premium convencional.
- B é expressiva, porém mantém o maior risco de acoplamento à Fofoca e de ruído tipográfico.
- C transforma a tese pedagógica em interface, obtém melhor transferência entre lentes e dá função a
  cada estado. Seu score menor em craft inicial é risco de execução, não limite da direção.

## Recomendação

Escolher **C — Learning Native**, usando **A — Quiet Premium** como disciplina de execução: low chrome,
hierarquia calma, precisão tipográfica e ausência de ornamento gratuito. A expressão recebe o nome de
trabalho “Quiet Learning”. Modern Editorial fica restrita a tratamentos narrativos pontuais, não ao
shell.

## Decisões já tomadas no plano

- não instalar ferramentas externas no Plan Gate;
- reproduzir Plannotator por documentos versionados + aprovação textual;
- não adicionar biblioteca de ícones: criar um conjunto SVG local mínimo;
- separar tokens de plataforma e lente antes de propagar estilos;
- usar Home, Episode e Assessment como proving ground;
- não fragmentar todo o CSS antes de o sistema provar estabilidade;
- manter motion atual e adicionar apenas transições funcionais;
- manter mastery > review > ritmo > XP na saliência visual;
- preservar dados, regras, fontes, rotas, engine e persistência.

## Plano pós-aprovação

Cada etapa termina com validação proporcional, commit e push para o remoto, conforme autorização já
fornecida pelo usuário. Não acumular etapas sem browser loop.

### Etapa 0 — incorporar feedback do Plan Gate

- registrar aprovação, rejeição ou substituições;
- ajustar `PRODUCT.md`, `DESIGN.md` e este plano;
- congelar direção e critérios de comparação.

Gate: aprovação explícita registrada e working tree compreensível.

### Etapa 1 — foundations + shell mínimo

- introduzir tokens `platform.*` e `lens.*`;
- normalizar type scale, spacing, radius, surfaces, focus e motion;
- criar `Icon` SVG e substituir Unicode da navegação;
- tornar navegação wide um header leve, mantendo bottom nav no mobile;
- preservar landmarks, rotas e settings.

Browser loop: Home + Episode em 320, 768 e 1440.

Gate: lint, typecheck, testes de componentes/shell, axe afetado, screenshots de comparação.

Entrega Git: commit/push da etapa.

### Etapa 2 — Home proving ground

- reduzir hero e remover geometria/expediente performático;
- reordenar identidade, próxima ação, progresso e contexto;
- harmonizar estado novo e retorno;
- manter ritmo, XP e fontes subordinados.

Browser loop: estado novo e retorno nos sete viewports.

Gate: ação primária inequívoca, sem overflow, sem AI-slop material, teclado/axe verdes.

Entrega Git: commit/push da etapa.

### Etapa 3 — Episode proving ground

- aplicar measure, hierarchy e typography do contrato;
- simplificar hook, coach e mensagens sem perder speakers;
- reduzir chrome e integrar source/reveal/continuidade;
- verificar episódios com estruturas e conteúdos diferentes.

Browser loop: começo, conversa, interaction, erro/acerto, reveal e source drawer.

Gate: narrativa lidera; sem regressão de progress, fonte ou engine; axe/teclado verdes.

Entrega Git: commit/push da etapa.

### Etapa 4 — Assessment proving ground

- transformar o container de formulário em sequência pedagógica;
- estabilizar geometry de option/selected/focus;
- harmonizar confidence, hint, feedback e continue;
- validar os cinco interaction kinds e avaliação final.

Browser loop: default, keyboard, hint, erro, acerto e feedback nos sete viewports.

Gate: active recall claro, não-form-like, estados acessíveis e sem layout shift.

Entrega Git: commit/push da etapa.

### Etapa 5 — proving-ground gate

- crítica lado a lado BEFORE/AFTER;
- passes equivalentes a audit, critique, distill, normalize, typeset, layout, polish, responsive e
  accessibility;
- adicionar snapshot assertions estáveis para Home/Episode/Interaction;
- corrigir até não haver finding material acionável.

Gate simultâneo: functional, responsive, accessibility, design audit, AI-slop, consistency,
design-system coherence e browser inspection.

Entrega Git: commit/push das proteções/registros.

### Etapa 6 — propagação

- extrair foundations/primitives/patterns apenas onde o proving ground mostrou estabilidade;
- aplicar shell, type, icon, states e surfaces a onboarding, Learn, Review, Dossiê, Concept, Sources,
  Settings, completion, empty/error, drawer e toast;
- preservar cada função e copy.

Browser loop por família de superfície, sem tratar cada página como universo novo.

Gate: consistência, rotas, estados e testes afetados.

Entrega Git: commits/pushes pequenos por família coerente.

### Etapa 7 — regressão completa e evidência

- repetir lint, typecheck, unit/component/integration, E2E, build e axe;
- capturar AFTER nos mesmos 21 casos;
- executar comparação visual e crítica por viewport;
- criar `DESIGN_AUDIT_AFTER.md` e `VISUAL_RECOVERY_REPORT.md`;
- atualizar `TEST_REPORT.md`, `DECISIONS.md` e documentação aplicável.

Gate: todos os critérios finais simultaneamente verdes ou bloqueio real documentado.

Entrega Git: commit/push da evidência.

### Etapa 8 — Ship Gate humano

- apresentar changeset, before/after, testes, limitações e findings residuais;
- reproduzir review de diff em formato navegável, pois Plannotator não está instalado;
- corrigir e revalidar qualquer finding aceito;
- parar para aprovação humana final antes de declarar concluído ou realizar deploy.

## Arquivos previstos para alteração

Lista inicial; pode reduzir conforme o proving ground. Qualquer expansão material deve ser registrada.

- `src/design-system/styles.css` e, se a extração se provar necessária, novos CSS em
  `src/design-system/foundations/`, `patterns/` e `lenses/`;
- `src/design-system/components/BottomNavigation.tsx`;
- novo primitive local de iconografia em `src/design-system/`;
- `src/app/shell/AppShell.tsx`;
- `src/features/home/HomePage.tsx`;
- `src/features/learn/EpisodePage.tsx`;
- `src/features/learn/AssessmentInteraction.tsx`;
- `src/features/learn/FinalAssessmentPage.tsx`;
- componentes visuais usados pelo proving ground: Button, Progress, MessageBubble, QuizOption,
  SourceDrawer e EpisodeFooter;
- páginas restantes somente na propagação;
- testes de componente e `e2e/visual.spec.ts`, `e2e/accessibility.spec.ts`, `e2e/flows.spec.ts`;
- documentação e artefatos AFTER.

`package.json` só muda diante de ganho comprovado e aprovação; o plano atual não requer dependência
runtime nova.

## Arquivos e áreas a preservar

Não alterar por estética:

- `src/domain/**` — mastery, review, learning, knowledge, lens e gamification;
- `src/content/**` — dados, copy jurídica, fontes, mappings e schemas;
- `src/persistence/**` — storage, migração e recuperação;
- `src/analytics/**` — taxonomia, retenção e evidence export;
- router e URLs públicas;
- regras de scoring, confidence, hints, review e transfer;
- conteúdo dos episódios, avaliações e feedback;
- testes válidos que descrevem comportamento congelado.

Mudança nessas áreas exige bug reproduzido, necessidade de acessibilidade/corretude ou impedimento
técnico indispensável, com teste e justificativa.

## Riscos e mitigação

| Risco                                          | Mitigação / gate                                                     |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| “clean” virar genérico ou sem personalidade    | Lens localizada, crítica de voz/narrativa e score de personalidade   |
| Learning Native parecer LMS                    | low chrome, content-first, sem cards/labels administrativos          |
| Refatoração CSS causar regressão de cascade    | proving ground antes de extração, diffs pequenos e screenshots       |
| Novo token perder contraste                    | contraste calculado + axe + inspeção dos estados                     |
| Header wide reduzir descoberta da navegação    | labels explícitos, active state e teste nos breakpoints              |
| SVG local criar inconsistência                 | viewBox/stroke/tamanhos congelados e component test                  |
| Snapshot visual flakey                         | fontes locais, estado determinístico e tolerância mínima documentada |
| Redesign quebrar engine/domínio                | testes existentes + full regression; arquivos congelados             |
| Excesso de ferramentas introduzir supply chain | conjunto mínimo atual; nenhum installer/hook externo                 |
| “delight” competir com aprendizagem            | motion só com função, reduced motion e regra de justificação         |
| Mudança ampla difícil de revisar               | commit/push por etapa e Ship Gate final                              |

## Problemas e limitações atuais

- Plannotator indisponível: gate manual obrigatório;
- screenshots sem comparação de pixel: fechar na Etapa 5;
- axe não mede prioridade cognitiva/craft: manter crítica humana por viewport;
- referências externas mudam com o tempo: decisões foram sintetizadas no contrato e não dependem de
  copiar suas telas;
- eficácia pedagógica e preferência visual continuam pendentes de teste humano.

## Gates globais

Antes de propagar e antes do ship, todos precisam passar:

- funcionalidade e regressão dos domínios congelados;
- clareza da aprendizagem e separação narrativa/regra real;
- conteúdo/fontes intactos;
- coerência com `DESIGN.md`;
- responsividade nos sete viewports;
- WCAG 2.2 AA na cobertura automática e manual;
- crítica AI-slop;
- screenshots BEFORE/AFTER e findings rastreáveis;
- aprovação humana no Plan Gate e Ship Gate.

## Progress log

### 2026-08-29 — descoberta e Plan Gate

- lidos V4, prompt operacional, código e documentação do repo;
- baseline técnico reexecutado e verde;
- app percorrido em browser real, console limpo;
- BEFORE preservado em 21 screenshots;
- toolchain externo investigado sem instalação;
- benchmark oficial pesquisado;
- `PRODUCT.md`, `DESIGN.md`, `DESIGN_TOOLING_AUDIT.md`, `DESIGN_BENCHMARK.md` e
  `DESIGN_AUDIT_BEFORE.md` criados;
- três direções pontuadas e C recomendada;
- nenhuma alteração visual realizada;
- próximo evento permitido: feedback/aprovação humana explícita.

### 2026-08-29 — Plan Gate aprovado

- aprovação explícita recebida: “Aprovo o Plan Gate e a direção C”;
- direção congelada: C — Learning Native com disciplina Quiet Premium;
- Product × Subject × Lens, SVG local, navegação wide em header e gate manual confirmados;
- implementação liberada a partir da Etapa 1, mantendo validação, commit e push por etapa.

### 2026-08-29 — Etapa 1: foundations, shell e iconografia

- tokens `platform.*` e `lens.*` introduzidos com aliases temporários para propagação segura;
- wordmark separa plataforma e módulo;
- navegação mantém bottom bar até 899 px e vira header horizontal a partir de 900 px;
- Unicode da navegação substituído por primitive SVG local, sem dependência runtime;
- browser real validado em 320×568, 768×1024 e 1440×900, sem overflow;
- o browser loop revelou que o toast interceptava Ajustes no novo header; posição corrigida e teste
  reexecutado;
- validação: lint PASS, typecheck PASS, 10 arquivos/40 testes PASS, build PASS e accessibility E2E 2/2
  PASS;
- próxima etapa: Home proving ground.

### 2026-08-29 — Etapa 2: Home proving ground

- hero monumental, palavra colorida, expediente e geometria decorativa removidos;
- Home inicial reorganizada em propósito, ação, duração e três provas do módulo;
- Home de retorno prioriza próxima etapa, progresso, revisão, ritmo e Dossiê;
- headings da Home migrados para sans funcional e escala máxima de 4 rem;
- ação principal ficou totalmente visível em 320×568 após ajuste de ritmo vertical;
- o teste por teclado revelou que a navegação no header antecedia o CTA; ordem do documento restaurada
  sem mudar a posição visual;
- sete viewports validados pelo visual E2E, sem overflow; screenshots operacionais atualizados;
- validação: lint PASS, typecheck PASS, 10 arquivos/40 testes PASS, build PASS, visual E2E 1/1 e
  seleção de fluxos/axe 4/4 PASS;
- próxima etapa: Episode proving ground.

## Decisão do Plan Gate

Aprovados em 2026-08-29:

1. direção C — Learning Native com disciplina Quiet Premium;
2. separação platform/lens e navegação wide em header;
3. SVG local em vez de dependência de ícones;
4. plano em oito etapas com commit/push por etapa;
5. gate manual equivalente ao Plannotator.
