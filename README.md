# Fuxico Fiscal — P0

Aplicação local-first de aprendizagem introdutória sobre a Reforma Tributária do Consumo. A experiência usa a lente narrativa **Fofoca** como scaffold temporário, separa conversa de regra real e mantém fontes oficiais acessíveis durante todo o módulo.

O P0 contém a Temporada 1, **Vazou a Reforma**, com cinco episódios completos, avaliação final, transferência sem lente, Dossiê por conceito, revisão espaçada funcional, mastery V1, XP, ritmo semanal, quatro conquistas e configurações locais.

> Conteúdo educacional introdutório. Não substitui aconselhamento jurídico ou tributário profissional.

## Stack

- React 19.2.8 + TypeScript 6 (strict);
- Vite 8.2.2;
- React Router 7;
- Zod 4 para schemas e validação em runtime;
- CSS variables e CSS responsivo sem runtime de estilos;
- Vitest + Testing Library;
- Playwright + `@axe-core/playwright`.

Primitives nativas foram preferidas onde oferecem semântica e teclado corretos sem dependência adicional. A decisão está detalhada em [DECISIONS.md](./DECISIONS.md).

## Requisitos

- Node.js 22 ou superior (validado com 24.13.1);
- pnpm 10 (validado com 10.5.2);
- Chromium para E2E (`pnpm exec playwright install chromium`).

## Instalação e execução

```powershell
pnpm install
pnpm dev
```

Abra a URL exibida pelo Vite. Se o Node no Windows não reconhecer a cadeia de certificados corporativa/sistema durante a instalação, use a validação pelo repositório do Windows sem desligar TLS:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
pnpm install
```

## Scripts

```text
pnpm dev          servidor local
pnpm build        typecheck + build de produção
pnpm preview      preview do build
pnpm lint         ESLint sem warnings
pnpm typecheck    TypeScript strict
pnpm test         Vitest em watch
pnpm test:run     unitários, componentes e integração
pnpm test:e2e     fluxos Playwright, axe e visual QA
pnpm format       Prettier
```

Na primeira execução E2E:

```powershell
pnpm exec playwright install chromium
pnpm test:e2e
```

## Estrutura

```text
src/
├── app/                 providers, router, shell e error boundary
├── analytics/           envelope e retenção local de eventos
├── content/             conteúdo estruturado, modelos e schemas
├── design-system/       componentes e tokens CSS
├── domain/              knowledge, lens, learning, mastery, review e gamification
├── features/            Home, onboarding, learn, review, dossier, sources, settings
├── persistence/         schemaVersion, migração, recuperação e storage
└── testing/             setup da suíte
e2e/                     fluxos, axe, teclado e capturas responsivas
```

Mais detalhes: [ARCHITECTURE.md](./ARCHITECTURE.md).

## Conteúdo como dados

O renderer não contém copy jurídica dos episódios. O fluxo é:

```text
dados validados → episode engine → componentes → evidence/mastery/review
```

### Adicionar um conceito

1. Adicione o objeto em `concepts` em `src/content/index.ts`.
2. Preencha objetivos, misconceptions, assessments e `sourceIds` existentes.
3. Adicione um `LensMapping` com limitações e suitability.
4. Rode `pnpm test:run` para validar schema e referências.

### Adicionar um episódio

1. Crie o objeto estruturado em `episodes`.
2. Referencie assessments, concepts e sources válidos.
3. Inclua o ID em `moduleOne.episodeIds`.
4. Não altere `EpisodePage`: o renderer lê os dados e os tipos de interação.

### Adicionar uma fonte

1. Verifique uma fonte primária/oficial.
2. Adicione título, autoridade, URL, referência, `verifiedAt`, `freshnessClass` e status.
3. Referencie seu ID em toda afirmação material correspondente.
4. Atualize [CONTENT_AUDIT.md](./CONTENT_AUDIT.md).

### Adicionar uma avaliação

1. Escolha `recognition`, `recall`, `application`, `transfer` ou `teach-back`.
2. Defina dificuldade, tipo de interação e regra determinística de scoring.
3. Vincule concepts, sources, feedback causal e misconception quando aplicável.
4. Para transfer, mude contexto, superfície e wording da situação de ensino.

## Estado e reset

O estado é salvo em `localStorage` sob `fuxico-fiscal:state`, com `schemaVersion = 1`. A leitura faz parse, migração, validação Zod e recuperação segura. Dados corrompidos são copiados para `fuxico-fiscal:corrupted-backup` quando possível.

Para resetar pelo produto: **Ajustes → Resetar todos os dados**. Para reset manual, remova a chave `fuxico-fiscal:state` no DevTools.

O controle de viagem no tempo aparece apenas em desenvolvimento e permite simular +1/+3/+7/+21 dias para exercitar revisões.

## Relatórios

- [CONTENT_AUDIT.md](./CONTENT_AUDIT.md) — auditoria jurídica/editorial;
- [TEST_REPORT.md](./TEST_REPORT.md) — comandos e resultados reais;
- [DECISIONS.md](./DECISIONS.md) — decisões materiais de implementação;
- [FUTURE_IDEAS.md](./FUTURE_IDEAS.md) — ideias deliberadamente fora do P0.
- [docs/validation/HUMAN_VALIDATION.md](./docs/validation/HUMAN_VALIDATION.md) — gate de
  validação humana e formulários de evidência.
