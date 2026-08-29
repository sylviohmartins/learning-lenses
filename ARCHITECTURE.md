# Arquitetura do P0

## Visão

O Fuxico Fiscal é um **monólito modular client-side**. Os limites são lógicos e permanecem dentro do mesmo bundle/aplicação; não existem backend, autenticação, banco remoto ou serviços distribuídos no P0.

```text
content ──→ learning ──→ mastery ──→ review
   │            │            │           │
   ├─ knowledge │            └─ concept state
   ├─ lens      └─ evidence
   └─ sources

app/provider ──→ persistence + analytics + gamification
      │
      └─ features ──→ design system
```

## Bounded contexts

- `content`: modelos, schemas Zod, conteúdo e integridade referencial. Toda copy educacional nasce aqui.
- `knowledge`: pré-requisitos e freshness de fontes.
- `lens`: suitability e limites da representação narrativa.
- `learning`: scoring determinístico para cinco tipos de interação.
- `mastery`: fórmula experimental V1, pesos, prior, gates e níveis.
- `review`: relógio abstrato e intervalos adaptativos 1/3/7/21.
- `gamification`: XP separado de mastery, quatro conquistas e ritmo semanal.
- `analytics`: eventos locais com envelope validado e retenção máxima de 300 registros.
- `persistence`: root versionado, migração, validação, backup e recuperação.
- `design-system`: tokens Newsroom Social e componentes acessíveis.
- `features`: composição das jornadas; não contém regras de domínio.

## Fluxo de uma resposta

```text
Assessment estruturado
→ scoring determinístico
→ MasteryEvidence por Concept
→ recálculo de mastery + gates
→ misconception quando aplicável
→ review agendada/atualizada
→ XP e ritmo (se elegíveis)
→ analytics local
→ persistência validada
```

XP nunca entra na fórmula de mastery. Passagem do tempo nunca reduz mastery; apenas torna uma revisão devida.

## Mastery

Cada evidence usa:

```text
Outcome × TypeWeight × DifficultyWeight × DelayWeight × HintWeight
```

A agregação usa prior 0,30 com peso 2. Gates impedem scores acima de 79/84/89 sem recall posterior/application/transfer. Consolidated exige score ≥90, evidências em dois dias diferentes e transferência correta. A fórmula é descrita na UI e no código como **heurística experimental**, não como calibração científica.

## Persistência

`localStorage` é suficiente para o P0 individual. O root contém usuário local, progresso, concepts, reviews, evidence, XP, achievements, ritmo, settings e analytics. A fronteira de persistência sempre valida com Zod antes de salvar/restaurar.

O clock de domínio é injetável (`SystemClock`, `OffsetClock`, `FixedClock`). A interface de time travel é removida pelo Vite em produção normal.

## Acessibilidade

- landmarks, headings, nomes acessíveis e skip link;
- radios/selects/textarea nativos;
- ordenar por botões “mover para cima/baixo”, sem depender de drag;
- drawer modal com Escape, trap e restauração de foco;
- foco visível e scroll-to-top por rota;
- alvos principais de 44 px ou mais;
- reduced motion por sistema e setting local;
- contraste validado com axe em browser real.

## Falhas controladas

- `ErrorBoundary` para erro inesperado;
- rotas e episódios inexistentes levam a estado 404 explícito;
- graph de conteúdo inválido falha com mensagem compreensível no boot de desenvolvimento;
- source ausente produz alerta no drawer;
- review vazio e conceitos sem evidence possuem empty states;
- storage corrompido gera backup, aviso e estado inicial seguro.

## Extensibilidade preservada

Novos conteúdos podem reutilizar os schemas e engines, mas P1/P2 não foram implementados. Não há catálogo universal, segunda lente, Java, backend ou social.
