# Learning Lenses — contrato de design

Status: direção aprovada no Plan Gate em 2026-08-29. Rege a implementação e os gates da recuperação
visual.

## Direção

**Learning Native com disciplina Quiet Premium**: a interação pedagógica é a identidade principal; o
craft vem de hierarquia, ritmo, tipografia, estados e detalhes consistentes. A lente Fofoca adiciona
calor, voz e memória nos pontos narrativos, sem transformar o produto em jornal, revista ou personagem.

Isso não é uma quarta direção. É a direção C usando o low chrome da direção A como restrição de
qualidade. O score e a comparação estão em `VISUAL_RECOVERY_PLAN.md`.

## Princípios

1. **A próxima decisão é o focal point.** A tela orienta para continuar, ler, responder ou revisar.
2. **A aprendizagem deixa rastros visíveis.** Progress, confidence, feedback, review e mastery têm
   estados claros e consistentes.
3. **A história lidera; o shell recua.** Navegação é familiar e silenciosa durante Episode.
4. **A lente tem endereço.** Personalidade aparece em narrativa, personagem, mapping e reveal — não em
   toda borda, heading ou controle.
5. **Spacing agrupa antes de border.** Contornos só existem para affordance, seleção ou limite real.
6. **Um sinal, uma função.** Cor, peso, escala e motion não repetem a mesma ênfase sem necessidade.
7. **Mobile é a composição de origem.** Breakpoints ampliam conforto, não complexidade.
8. **Cada detalhe responde “por que existe?”.** A resposta deve citar orientação, compreensão,
   affordance, feedback, memória, acessibilidade, narrativa ou aprendizagem.

## Art direction

- contemporânea, adulta, calma e tátil sem imitar material físico;
- fundos neutros ligeiramente quentes e superfícies claras;
- accent vinho reservado à lente e a poucos momentos de narrativa;
- teal/verde-azulado reservado a fonte, autoridade e reveal quando semanticamente correto;
- composição assimétrica apenas quando a ordem de leitura continua inequívoca;
- personalidade pela voz, ritmo e personagens, não por adereço editorial;
- sem giant type, círculo decorativo, selo, expediente, filete de jornal ou palavra colorida gratuita.

## Hierarchy

Ordem visual padrão:

1. próxima ação ou pergunta;
2. conteúdo necessário para decidir;
3. estado de progresso/feedback;
4. contexto e metadados;
5. navegação global.

A hierarquia usa primeiro posição, espaço e tamanho; depois peso e cor. Eyebrow não é um componente
universal: só existe como metadata quando o rótulo realmente orienta.

## Typography

### UI e headings

Uma sans de alta legibilidade cobre shell, headings, controles, números e conteúdo técnico. A
implementação deve priorizar a pilha já existente (`Instrument Sans`, `Inter`, system UI) e não depende
de download remoto.

- page title: `clamp(2rem, 4vw, 3.5rem)`, 1.02–1.08 line-height;
- section title: 1.375–2 rem, 1.12–1.25 line-height;
- body: 1 rem, 1.55–1.7 line-height;
- supporting: 0.8125–0.9375 rem, nunca abaixo do necessário para legibilidade;
- labels: sentence case; caixa alta apenas para códigos curtos e raros;
- numeric: `font-variant-numeric: tabular-nums` em progress/mastery/XP.

### Narrative

A serif `Newsreader`/Georgia pode aparecer somente em uma passagem narrativa curta, fala destacada ou
reveal em que contraste de voz ajude memória. Não é usada em shell, todos os títulos, botões, cards ou
listas. Itálico tem função de voz/citação, nunca de decoração.

### Measure

- leitura narrativa: 58–68 caracteres;
- instrução/feedback: 48–62 caracteres;
- labels e metadata: uma linha quando possível, sem reduzir texto para caber;
- headings recebem `text-wrap: balance` apenas onde não cria órfãos artificiais.

## Color e tokens

Valores abaixo são candidatos de implementação; precisam de contraste calculado e inspeção real antes
de promoção.

```text
platform.background       #F7F7F4
platform.surface          #FFFFFF
platform.surface-subtle   #F0F1ED
platform.foreground       #171815
platform.muted            #5D625B
platform.border           #D8DCD4
platform.focus            #145BD7
platform.success          #1F6B4D
platform.warning          #855500
platform.danger           #B42318

lens.gossip.accent        #A62E48
lens.gossip.narrative     #FFF1F4
lens.gossip.character     #F3E7EA
lens.gossip.authority     #24656B
lens.gossip.reveal        #EAF4F2
```

Regras:

- `platform.*` governa shell, texto, controles, foco e estados comuns;
- `lens.*` só entra em containers/vozes com significado de lente;
- success, warning e danger não herdam accent;
- cor nunca é o único indicador;
- não usar gradiente no P0 sem uma função nova e testável.

## Spacing, grid e density

Escala base: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px.

- compact/mobile: gutter 16 px (14 px somente em 320 quando comprovado);
- reading/tablet: gutter 24–40 px;
- wide: gutter 40–64 px e conteúdo central por medida, não por largura máxima genérica;
- espaço interno de controle: 8–16 px;
- blocos da mesma decisão ficam mais próximos que blocos de etapas diferentes;
- nenhuma superfície ganha padding, border e radius apenas para “virar card”.

Densidade é orientada pela tarefa: Home escaneável, Episode respirável, Assessment concentrado.

## Radius, borders e surfaces

- radius de controle: 8 px;
- radius de superfície funcional: 12 px, somente em feedback, reveal ou agrupamento necessário;
- pills apenas para escolhas compactas com semântica clara;
- border 1 px para input, seleção ou divisão estrutural; não para cada seção;
- border 2 px apenas em foco/seleção quando não desloca layout;
- surface tonal e spacing substituem a maioria dos filetes;
- shadow apenas em sobreposição real (drawer/toast), curta e com baixa opacidade;
- sem glassmorphism no P0.

## Iconography

Unicode deixa de ser sistema de ícones. O P0 deve usar um conjunto interno pequeno de SVGs:

- stroke 1.75, `round` cap/join, viewBox 24;
- 20 px em navegação/inline e 24 px em ação isolada;
- mesma geometria óptica e alinhamento com label;
- ícone decorativo `aria-hidden`; ação icon-only exige nome acessível;
- label textual permanece na navegação;
- sem quadrado arredondado atrás de todo ícone.

Ícones mínimos previstos: home, learn/book, review/rotate, dossier/library, settings, arrow, close,
source/external-link, check, info. Implementação local evita nova dependência runtime.

## Navigation

- mobile: bottom navigation estável, quatro destinos, safe-area e label sempre visível;
- tablet/wide: header leve com marca, destinos e settings; não transformar em dashboard lateral;
- estado ativo usa posição/shape/peso além de cor;
- Episode mantém acesso global, mas reduz contraste do chrome durante leitura;
- skip link, landmarks e foco atual permanecem.

## Interaction

- feedback visual ocorre imediatamente após seleção/submissão sem antecipar a resposta;
- focus, hover, pressed, selected, disabled, correct e wrong são estados distintos;
- seleção não altera geometria do componente;
- confidence antecede a submissão e permanece semanticamente um `fieldset`;
- hint é ação secundária clara, com custo pedagógico preservado;
- source drawer restaura foco, fecha por Escape e mantém modal semantics;
- botões usam verbos específicos; “Continuar” só quando o destino é inequívoco.

## Padrões por superfície

### Home

- identidade compacta e uma frase de propósito, sem hero monumental;
- estado novo: começar episódio como ação primária e visão curta do módulo;
- estado retorno: “continuar de onde parou” como foco, depois progress/mastery/review;
- ritmo e XP em apoio, não no primeiro nível;
- Lens aparece no nome/descrição do módulo, não como art direction de toda a página.

### Episode

- measure centrada, título forte mas não performático e progress discreto;
- hook e coach usam um tratamento contextual cada, sem barra + dashed + card simultâneos;
- falas identificam speaker com avatar/initial e alignment consistentes;
- mensagens não alternam ornamentos apenas para parecer conversa;
- source, truth reveal e continuidade entram por progressive disclosure;
- serif narrativa, se usada, aparece em no máximo um regime de voz.

### Assessment

- é uma etapa de aprendizagem dentro do episódio, não um card branco contendo formulário;
- prompt é o focal point; confidence e resposta formam subetapas claras;
- opções têm alvos amplos, mark estável e seleção perceptível;
- feedback substitui a etapa de resposta sem perder contexto causal;
- mastery/progress aparecem após a evidência, não como recompensa antes da compreensão.

### Review, Dossiê, Sources e Settings

Herdam tokens, iconografia, heading scale, navigation e estados do proving ground. Cada rota mantém sua
função: Review prioriza pendência; Dossiê prioriza mastery/evidência; Sources prioriza procedência;
Settings prioriza controle local e privacidade.

## Motion

Durações candidatas: 120 ms para estado local, 180 ms para entrada/feedback, 240 ms para drawer/reveal.

Motion só comunica:

- orientação e continuidade;
- entrada/saída de camada;
- mudança de seleção/feedback;
- avanço de progress;
- reveal de explicação.

Sem bounce, parallax, animação de espera ou delight repetitivo. `prefers-reduced-motion` e a preferência
local reduzem tudo a mudança imediata ou quase imediata.

## Responsive

- 320–479: composição compacta de uma coluna, bottom nav, gutters 14–16;
- 480–899: leitura de uma coluna com gutters maiores; bottom nav permanece até haver espaço real para
  header completo;
- 900–1199: header horizontal, conteúdo por measure, áreas secundárias somente se não competirem;
- 1200+: mais whitespace lateral e contexto, nunca scale tipográfica desproporcional.

Os sete viewports de QA permanecem obrigatórios. Não usar breakpoint apenas para “cabem mais coisas”.

## Accessibility

- WCAG 2.2 AA como mínimo;
- texto e estados com contraste calculado;
- controles ≥ 44 × 44 CSS px;
- zoom/reflow sem scroll horizontal em 320 px;
- landmarks/headings em ordem e labels explícitos;
- foco visível com token de plataforma;
- seleção, erro e acerto comunicados por texto/shape/ícone além de cor;
- SVG decorativo oculto e icon-only nomeado;
- teclado completo, Escape e restauração de foco;
- reduced motion;
- linguagem clara e feedback que identifica causa e próximo passo.

## Arquitetura de tokens e CSS

Separação alvo, apenas se o proving ground demonstrar ganho:

```text
src/design-system/
├── foundations/     tokens, reset, type, layout, motion
├── primitives/      Button, Icon, Progress, form controls
├── components/      navigation, drawer, toast, mastery
├── patterns/        episode, assessment, feedback, states
└── lenses/
    └── gossip.css   somente tokens/tratamentos da lente
```

Não fragmentar `styles.css` de uma vez. Primeiro implementar tokens e três superfícies; extrair apenas
responsabilidades estáveis, preservando ordem de cascade e testes.

## Anti-patterns bloqueados

- giant headline ou palavra accent sem significado;
- geometria arbitrária, selo, expediente ou filetes de newspaper cosplay;
- serif decorativa e eyebrow em toda seção;
- sidebar de dashboard para um produto de leitura;
- card soup, cards aninhados, radius excessivo;
- icon-in-square ou Unicode como linguagem visual;
- glass, gradient ou shadow como sinônimo de premium;
- microcopy espirituosa em controles críticos;
- motion sem mudança de estado;
- gamificação infantil/cassino;
- whitespace que afasta elementos da mesma decisão;
- preset externo aceito sem justificativa funcional.

## Gate para qualquer decisão material

Uma mudança só permanece se:

1. sua função puder ser explicada em linguagem de produto/aprendizagem;
2. funcionar nos sete viewports;
3. preservar semântica, teclado e reduced motion;
4. não acoplar o shell à lente;
5. não quebrar os domínios congelados;
6. superar o baseline em crítica lado a lado, não apenas parecer “nova”.
