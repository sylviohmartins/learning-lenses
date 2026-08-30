# Auditoria do toolchain de design

Data da auditoria: 2026-08-29. Nenhum recurso externo foi instalado ou executado nesta fase.

## Critérios

Cada candidato foi avaliado por procedência, licença, manutenção, compatibilidade com Codex, scripts,
hooks, rede, filesystem, credenciais, risco de supply chain, sobreposição e ganho específico para o
P0. Commits são o `HEAD` da branch padrão observado na data da auditoria; não são versões aprovadas
para instalação.

Classificação:

- **ESSENTIAL**: necessário e já disponível para gerar evidência reproduzível;
- **USEFUL**: ganho plausível, mas não necessário para este gate;
- **EXPERIMENTAL**: superfície ou sobreposição exige ensaio isolado antes de adoção;
- **REJECTED**: custo/risco excede o ganho neste ciclo.

## Inventário e decisão

| Recurso                        | Origem / revisão / licença                                                                                                                                  | Finalidade e compatibilidade                                                                        | Riscos e sobreposição                                                                                                                                           | Decisão          | Instalado / usado | Etapa e evidência                                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Plannotator                    | [`backnotprop/plannotator`](https://github.com/backnotprop/plannotator), `ce0e1e99ea4f`, Apache-2.0/MIT                                                     | Review local de planos, Markdown e diffs; declara integração com Codex                              | Instalador baixa binário e integrações; instalação completa pode escrever hooks/skills; a UI consulta GitHub por atualização e o review pode consultar `origin` | **USEFUL**       | Não / não         | Ausente do `PATH` e das skills locais. Substituído pelo gate manual versionado neste ciclo                   |
| Impeccable                     | [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable), `b0594c72d180`, Apache-2.0                                                                   | Skill e detector de anti-patterns; suporte declarado a Codex                                        | CLI/skill/hook adicionam código e automação ao projeto; detector e browser loop se sobrepõem à auditoria manual, Playwright e axe                               | **USEFUL**       | Não / não         | Candidato a ensaio fixado e isolado após aprovação; nenhum finding foi atribuído a ele                       |
| Anthropic `frontend-design`    | [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design), `ed404106fcd8`, Apache-2.0 | Orientação oficial da Anthropic para direção estética e frontend não genérico                       | Feito para o harness Claude; é instruction-first, não valida comportamento nem substitui evidência visual                                                       | **USEFUL**       | Não / não         | Princípios comparados, mas a skill não estava instalada nem foi invocada                                     |
| UI UX Pro Max                  | [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), `8bd29e775453`, MIT                                      | Catálogo e scripts para heurísticas, tipografia, paletas, ícones e stacks; declara suporte ao Codex | CLI global/projeto, scripts Python, grande catálogo e presets; alta sobreposição e risco de decisões genéricas orientadas por lookup                            | **EXPERIMENTAL** | Não / não         | Não necessário para formar o sistema proposto; só faria sentido em sandbox com revisão humana                |
| OpenDesign                     | [`nexu-io/open-design`](https://github.com/nexu-io/open-design), `df84ae5b9ebf`, Apache-2.0 e licenças transitivas                                          | Desktop/skills/MCP para protótipos e artefatos; declara suporte ao Codex e BYOK                     | Superfície muito ampla: app, nuvem, modelos, 100+ skills, 151 sistemas e conteúdo de múltiplas origens; rede/credenciais e forte sobreposição                   | **REJECTED**     | Não / não         | Complexidade sem ganho proporcional para três superfícies já implementadas                                   |
| planning-with-files            | [`OthmanAdi/planning-with-files`](https://github.com/OthmanAdi/planning-with-files), `f31c3e3f14b2`, MIT                                                    | Estado persistente em plano/findings/progresso; compatível por `SKILL.md`                           | Instala skill e scripts; seu principal benefício é simples de reproduzir sem nova dependência                                                                   | **USEFUL**       | Não / não         | Equivalente local criado em `VISUAL_RECOVERY_PLAN.md`                                                        |
| Playwright                     | [`@playwright/test`](https://playwright.dev/docs/test-intro) 1.62.1                                                                                         | Browser automation, fluxos, teclado, viewports, screenshots e traces                                | Pode produzir falso conforto sem crítica humana; screenshots atuais não têm comparação de pixels                                                                | **ESSENTIAL**    | Sim / sim         | `pnpm test:e2e`: 9/9; sete viewports e quatro superfícies capturadas                                         |
| Browser integrado do Codex     | Skill empacotada `browser` 26.820.60940                                                                                                                     | Inspeção interativa do app real e estado semântico no browser aberto                                | Não é gate reproduzível sozinho; depende da sessão local                                                                                                        | **ESSENTIAL**    | Sim / sim         | Home, onboarding, trilha, episódio, assessment, revisão, Dossiê, fontes e ajustes percorridos; console limpo |
| axe + teclado                  | [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) 4.13.0                                                 | Detecção automatizada de violações e testes de foco/teclado                                         | axe não detecta toda falha de usabilidade, leitura ou ordem cognitiva                                                                                           | **ESSENTIAL**    | Sim / sim         | Home, episódio, drawer e ajustes sem violações automáticas; fluxo de teclado verde                           |
| Captura e crítica visual local | Playwright + visualizador local do Codex                                                                                                                    | Preservar BEFORE e inspecionar composição real sem SaaS                                             | Ainda não há snapshot assertion nem tolerância de diff calibrada                                                                                                | **ESSENTIAL**    | Sim / sim         | 21 imagens BEFORE em `artifacts/visual-recovery/before/`, Home/Episode/Interaction em 7 viewports            |
| Plano Codex + Markdown no repo | [skills e plugins oficiais do Codex](https://developers.openai.com/codex/skills) + `VISUAL_RECOVERY_PLAN.md`                                                | Plano de execução e estado persistente revisável sem instalar terceiros                             | Menos confortável para anotações por região que Plannotator                                                                                                     | **ESSENTIAL**    | Sim / sim         | Plano, findings, decisões, problemas, gates e validações versionados                                         |
| loop-engineering               | [`cobusgreyling/loop-engineering`](https://github.com/cobusgreyling/loop-engineering), `d03dcb92cc1e`, MIT                                                  | Scaffolding e auditoria de loops agentivos                                                          | O próprio projeto alerta para custo e erro desacompanhado; excesso para uma recuperação com gates humanos obrigatórios                                          | **REJECTED**     | Não / não         | O browser loop será explícito e supervisionado no plano, sem runtime autônomo                                |

## Conclusão de segurança

O conjunto mínimo adotado é o que já existe no projeto e no ambiente: Playwright, axe, browser real,
crítica visual local, testes e estado persistente em Markdown. Isso cobre execução, evidência,
acessibilidade e controle humano sem introduzir scripts, hooks, credenciais ou atualizações externas.

Plannotator seria útil, mas não estava disponível. Sua [documentação de privacidade e rede](https://github.com/backnotprop/plannotator#privacy-and-network-behavior)
explicita contatos com GitHub e possíveis alterações de integração; por isso ele não foi instalado
apenas para satisfazer o formato do gate. O equivalente desta fase é:

1. documentos revisáveis e versionados;
2. direção e score explícitos;
3. lista de arquivos, riscos e gates;
4. parada obrigatória;
5. aprovação humana textual antes de qualquer alteração visual.

Impeccable permanece como opção de crítica no pós-aprovação, somente se a instalação/revisão for
autorizada e fixada por versão ou commit. Mesmo nesse caso, seus findings precisariam de confirmação no
produto real; a ferramenta não teria autoridade para aprovar mudanças.

## Lacunas conhecidas do toolchain atual

- as capturas existentes registram imagens, mas ainda não falham por regressão visual de pixels;
- axe precisa continuar acompanhado de teclado, zoom, leitura semântica e crítica humana;
- a inspeção real do browser não é reproduzível sem registrar viewport, rota, estado e screenshot;
- não há interface de anotação visual equivalente ao Plannotator nesta instalação.

O plano pós-aprovação fecha as três primeiras lacunas no proving ground e mantém a quarta como limitação
documentada.
