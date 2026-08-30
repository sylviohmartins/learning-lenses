# Benchmark visual e de interação

Pesquisa realizada em 2026-08-29, antes de qualquer alteração visual. As referências abaixo servem
para extrair princípios; não autorizam copiar tela, marca, componente proprietário ou trade dress.

## Apple Human Interface Guidelines

- **Problema:** controles e identidade podem competir com o conteúdo e perder coerência entre tamanhos.
- **Padrão:** hierarquia clara, consistência, adaptação e controles próximos ao conteúdo que modificam.
- **Por que funciona:** a interface fica previsível e deixa a atenção na tarefa. A HIG enfatiza
  hierarquia, harmonia e consistência, enquanto as orientações básicas reforçam alvo mínimo de 44 pt,
  contraste, legibilidade e alinhamento ([HIG](https://developer.apple.com/design/human-interface-guidelines),
  [UI Design Dos and Don’ts](https://developer.apple.com/design/tips/)).
- **O que extrair:** low chrome, hierarquia antes de decoração, alvos confortáveis, comportamento
  adaptativo e identidade aplicada onde agrega significado.
- **O que não copiar:** skin de iOS, blur, cápsulas, símbolos SF ou materiais sem função.
- **Aplicação:** shell silencioso, conteúdo em primeiro plano, foco visível e controles com no mínimo
  44 × 44 CSS px.

## Apple Books

- **Problema:** sustentar leitura longa, progresso e hábito sem transformar o leitor em dashboard.
- **Padrão:** retomada direta, progresso sincronizado, metas discretas e personalização da leitura.
- **Por que funciona:** o produto combina “retomar de onde parou” com ajustes de fonte, espaçamento,
  tema e scroll, mantendo a obra como foco ([Apple Books](https://www.apple.com/apple-books/),
  [descrição oficial na App Store](https://apps.apple.com/us/app/apple-books/id364709193)).
- **O que extrair:** medida de leitura confortável, retomada como ação principal, progresso periférico e
  preferências que melhoram legibilidade.
- **O que não copiar:** prateleiras, capas, linguagem de loja ou metas circulares como identidade.
- **Aplicação:** Home centrada no próximo passo; Episode com medida controlada; mastery e ritmo visíveis
  quando úteis, nunca competindo com a história.

## Apple News

- **Problema:** organizar grande volume editorial sem perder orientação, procedência ou leitura.
- **Padrão:** curação por grupos, abertura de uma história por vez, navegação familiar e controles
  progressivos para tamanho do texto, salvar, compartilhar e preferência.
- **Por que funciona:** o feed cria hierarquia entre conteúdos e a leitura recolhe os controles; a
  pessoa ainda pode ajustar texto e influenciar recomendações
  ([guia oficial de leitura](https://support.apple.com/guide/iphone/read-and-share-stories-iphc2090b0d2/26/ios/26),
  [visão geral do News](https://support.apple.com/en-ca/guide/iphone/iph0a16d1e29/ios)).
- **O que extrair:** agrupamento editorial funcional, procedência próxima e chrome reduzido durante a
  leitura.
- **O que não copiar:** cards de manchete, capa de revista, grid de notícias ou metáforas jornalísticas.
- **Aplicação:** fontes em disclosure contextual; narrativa com leitura focada; listas de episódios
  escaneáveis, sem parecer portal de notícias.

## Linear

- **Problema:** manter precisão e orientação em uma aplicação densa sem gerar busywork visual.
- **Padrão:** estados consistentes, termos diretos, disclosure progressivo, densidade controlada e
  qualidade iterada em pequenos changesets.
- **Por que funciona:** os princípios “aim for clarity” e “simple first, then powerful” mantêm o
  produto previsível; a atualização visual de 2026 reduziu o peso da navegação para o conteúdo ganhar
  foco ([Linear Method](https://linear.app/method/introduction),
  [UI refresh](https://linear.app/changelog/2026-03-12-ui-refresh)).
- **O que extrair:** semântica de estado, consistência entre superfícies, iconografia coerente e revisão
  por mudanças pequenas.
- **O que não copiar:** paleta escura, command menu, densidade de issue tracker ou sidebar de trabalho.
- **Aplicação:** feedback e mastery com estados consistentes; navegação de desktop menos dominante;
  commits/pushes por etapa aprovável.

## Arc

- **Problema:** dar personalidade e separar contextos sem criar múltiplos produtos desconectados.
- **Padrão:** “Spaces” compartilham uma estrutura estável e variam tema/ícone conforme o contexto.
- **Por que funciona:** cada espaço tem identidade controlada, mas navegação e modelo mental permanecem
  previsíveis ([Arc Spaces](https://resources.arc.net/hc/en-us/articles/19228064149143-Spaces-Distinct-Browsing-Areas)).
- **O que extrair:** personalização limitada por tokens e contexto, nunca por reescrita estrutural.
- **O que não copiar:** sidebar do navegador, gestos, gradientes de tema ou iconografia da marca.
- **Aplicação:** tokens `lens.*` alteram narrativa, personagens e reveal; tokens `platform.*` preservam
  shell, controles e estados para futuras lentes.

## Notion

- **Problema:** oferecer ferramentas e navegação sem interromper escrita, leitura e organização.
- **Padrão:** sidebar organizacional combinada com canvas central espaçoso; controles de topo recuam
  durante o foco.
- **Por que funciona:** a separação entre navegação e editor dá um lugar claro para cada ação e deixa
  o conteúdo dominar ([introdução oficial ao workspace](https://www.notion.com/help/intro-to-workspaces)).
- **O que extrair:** medida de conteúdo, tipografia neutra, controles contextuais e superfícies pouco
  ornamentadas.
- **O que não copiar:** modelo de blocos, árvore infinita, slash commands ou sidebar persistente.
- **Aplicação:** Episode como canvas de leitura; ações secundárias próximas ao trecho relevante; desktop
  sem enquadramento de dashboard.

## Brilliant

- **Problema:** conteúdo passivo não revela se a pessoa construiu compreensão.
- **Padrão:** explicação e problema interativo se alternam; feedback ocorre durante a tentativa.
- **Por que funciona:** o produto se define por aprender fazendo e por feedback ligado ao erro, em vez
  de vídeo ou texto denso ([FAQ oficial](https://brilliant.org/faq/),
  [visão de aprendizagem de dados](https://brilliant.org/data/)).
- **O que extrair:** interação como parte da narrativa, tentativa antes da resposta e feedback causal.
- **O que não copiar:** ilustrações, puzzles STEM, claims de eficácia ou linguagem comercial.
- **Aplicação:** Assessment deixa de parecer formulário; prompt, confiança, ação e feedback formam uma
  sequência pedagógica única.

## Duolingo

- **Problema:** sustentar progressão e retorno sem perder eficácia ou tornar prática intimidante.
- **Padrão:** lições curtas, feedback imediato, revisão acessível, progressão explícita e tom alegre.
- **Por que funciona:** o método combina conteúdo útil, prática orientada e experiências leves; a
  evolução para mini-unidades veio de pesquisa indicando que unidades longas pareciam repetitivas e
  abstratas ([Duolingo Method](https://blog.duolingo.com/duolingo-teaching-method/),
  [mini-units](https://blog.duolingo.com/intermediate-mini-units/),
  [review](https://blog.duolingo.com/how-to-review-lessons-on-duolingo/)).
- **O que extrair:** estado da jornada legível, feedback rápido, revisão como continuação natural e
  personalidade consistente.
- **O que não copiar:** mascote, path de bolhas, moeda, streak teatral, sons ou linguagem infantil.
- **Aplicação:** progresso do episódio visível mas discreto; revisão e mastery acima de XP; celebração
  curta e proporcional à evidência.

## Síntese aplicável

O benchmark não aponta para uma estética editorial mais intensa. Ele converge para:

1. shell estável, silencioso e multi-lens;
2. leitura com medida e hierarquia fortes;
3. identidade da lente por contexto, não por decoração global;
4. interação integrada ao aprender, não adicionada como formulário;
5. progressão e feedback claros com gamificação subordinada;
6. controles consistentes, iconografia coerente e estados previsíveis;
7. iteração por proving ground e evidência em browser real.

Essa síntese sustenta a direção **Learning Native** com disciplina **Quiet Premium** descrita em
`DESIGN.md` e avaliada em `VISUAL_RECOVERY_PLAN.md`.
