# Auditoria visual BEFORE

Data: 2026-08-29. Estado avaliado: `main` em `b8ed404`, antes de qualquer mudança de UI.

## Evidência coletada

- execução real em Chromium em `http://127.0.0.1:4173`;
- walkthrough de Home, onboarding, trilha, Episode, Assessment, Review, Dossiê, Sources e Settings;
- console do browser sem warnings ou errors;
- 21 capturas imutáveis de Home, Episode e Interaction em sete viewports, preservadas em
  `artifacts/visual-recovery/before/`;
- viewports: 320×568, 360×800, 390×844, 430×932, 768×1024, 1280×800 e 1440×900;
- inspeção de DOM/semântica, overflow, teclado, reduced motion e axe;
- leitura integral de `src/design-system/styles.css` e dos componentes/páginas do proving ground.

As capturas registram composição e estado; não são mockups. A Interaction aparece após scroll até a
atividade, como a pessoa a encontra no episódio.

## Estado técnico relacionado ao visual

- CSS único com 1.456 linhas, organizado por blocos de superfície, sem runtime de estilos;
- tokens atuais misturam plataforma e lente no `:root` (`--primary`, `--authority`, `--editorial`);
- todos os `h1` e `h2` recebem serif editorial globalmente;
- breakpoint estrutural em 700 px transforma a navegação inferior em sidebar fixa;
- screenshots são capturados, mas ainda não há asserção de regressão visual por pixel;
- sem overflow horizontal nos sete viewports;
- controles críticos têm foco visível e alvos próximos ou acima de 44 px;
- 9 E2E, incluindo axe e teclado, estão verdes.

## Findings

Formato: **evidence → impact → severity → root cause → proposed direction**.

| Área                    | Evidence                                                                                                       | Impact                                                                         | Severidade        | Root cause                                                                      | Proposed direction                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Focal point / Home      | Headline chega a 6,8 rem, ocupa a maior parte do primeiro viewport e antecede retomada/progresso               | A identidade performa antes de orientar; a próxima ação perde prioridade       | Alta              | Hero concebido como peça editorial, não como estado de aprendizagem             | Cabeçalho compacto; próxima ação e progresso como foco; identidade em escala de produto            |
| Hierarchy               | Serif, vermelho, filetes, uppercase, geometria e grande escala disputam o mesmo nível                          | Muitos sinais dizem “importante” ao mesmo tempo                                | Alta              | Ausência de limite por função e de separação platform/lens                      | Uma hierarquia tipográfica; cor de lente só para narrativa/estado; chrome recuado                  |
| Typography              | `h1/h2` globais usam `--editorial`; títulos chegam a 4,7–6,8 rem; corpo e labels usam pesos altos              | Leitura longa é razoável, mas títulos e labels parecem conceito de revista     | Alta              | “Editorial” foi traduzido como serif + escala em toda superfície                | Sans para shell, UI e headings; serif apenas onde a voz narrativa ganha memória                    |
| Copy styling            | Uma palavra em itálico/vermelho no hero funciona como punchline visual                                         | Reforça padrão de landing page gerada e envelhece rápido                       | Média             | Personalidade concentrada em artifício tipográfico                              | Personalidade pela escrita, ritmo e conteúdo; sem palavra decorativamente destacada                |
| Spacing                 | Desktop cria grande vazio após hero; interaction usa padding/card interno; mobile 320 comprime o topo          | “Premium” vira vazio no desktop e densidade de bordas no mobile                | Alta              | Escala fluida guiada pelo hero e containers independentes                       | Escala espacial coerente; medida por tarefa; espaço aproxima elementos relacionados                |
| Layout / alignment      | Sidebar de 196–224 px enquadra todas as telas; conteúdo do episódio é estreito dentro de canvas amplo          | Desktop lembra dashboard e a lente parece módulo dentro dele                   | Alta              | Navegação mobile convertida literalmente em rail persistente                    | Header/top navigation leve no desktop; leitura central; navegação não enquadra a história          |
| Color / depth           | Fundo quente, branco, vinho e teal são legíveis, mas quase toda separação depende de linha/borda               | Interface fica plana e simultaneamente “riscada”                               | Média             | Uma única superfície base e bordas usadas como principal agrupador              | Superfícies tonais discretas, spacing e contraste; borda só para affordance/limite real            |
| Navigation              | Unicode `⌂ ◫ ↻ ≡`; marcador ativo estreito; settings textual no rail                                           | Semântica visual inconsistente entre SO/fontes e aspecto prototípico           | Alta              | Unicode usado como sistema de ícones                                            | SVG interno coerente em stroke/tamanho; label sempre presente; estado ativo sem depender só de cor |
| Density                 | Eyebrows, bordas, avatares, chips, marks e labels se acumulam no Assessment                                    | Active recall parece formulário dentro de card                                 | Alta              | Cada subestado ganhou seu próprio contêiner visual                              | Uma etapa pedagógica contínua: prompt → confiança → resposta → feedback → continuar                |
| Episode narrative       | Conversa é compreensível, mas bubbles, avatar, hook com barra, coach tracejado e headline monumental coexistem | A história funciona; seu enquadramento compete por personalidade               | Média/Alta        | Múltiplas metáforas visuais para “narrativa”                                    | Mensagens mais calmas, speaker/voz claros e um único tratamento contextual da lente                |
| Affordance              | Radios customizados e botões são operáveis; opções selecionadas têm borda dupla e fundo                        | Funcionalidade é clara, mas o styling aumenta ruído e deslocamento de 1 px     | Média             | Estado selecionado recria borda e padding                                       | Estado por superfície + mark estável, sem layout shift e com foco separado da seleção              |
| Motion                  | Reveal e drawer usam 200–220 ms e respeitam reduced motion                                                     | Motion atual é contido e funcional                                             | Baixa / preservar | Uso limitado a entrada e orientação                                             | Manter; adicionar apenas transições de estado com função explícita                                 |
| Cognitive load          | Eyebrow + título grande + hook + coach + conversa + interaction usam vários regimes visuais                    | A pessoa precisa reaprender o código visual dentro da mesma página             | Alta              | Componentes nasceram isolados antes de um contrato de hierarquia                | Reduzir regimes; semântica consistente para contexto, narrativa, prática e evidência               |
| Consistency             | Radius varia de 1 a 10 px; border de 1 a 6 px; fontes trocam por seletor global/local                          | Detalhes parecem decisões locais, não sistema                                  | Média             | Tokens incompletos e CSS monolítico por acumulação                              | Tokens funcionais e primitives; refatorar apenas quando o proving ground provar o sistema          |
| Responsive              | Mobile não transborda e é funcional; 320 exige exceções; tablet herda sidebar e headline grande                | Cobertura técnica é boa, composição intermediária não é deliberada             | Alta              | Breakpoint único muda navegação, não densidade/hierarquia                       | Três regimes: compact, reading/tablet e wide; typography e measure orientadas por tarefa           |
| Product/lens separation | Wordmark, accent, fonte e art direction editorial vivem no shell                                               | Futura lente herdaria a personalidade da Fofoca                                | Crítica           | Tokens sem namespace e Newsroom Social tratado como identidade de plataforma    | Separar `platform.*` de `lens.*`; shell neutro e lente localizada em narrativa/reveal              |
| Gamification            | XP e ritmo estão presentes, mas não dominam; mastery aparece no Dossiê                                         | Hierarquia conceitual é majoritariamente correta                               | Baixa / preservar | Implementação já mantém gamificação discreta                                    | Manter mastery > review > ritmo > XP; reduzir ornamento de conquista se necessário                 |
| AI-generated patterns   | Giant headline, palavra colorida, círculo decorativo, selo inclinado, eyebrows repetidos e falso editorial     | Produto parece uma demonstração de direção estética, não uma ferramenta madura | Alta              | Art direction foi aplicada por sinais reconhecíveis em vez de regras funcionais | Remover o que não responde “por que existe?” em aprendizagem, orientação ou memória                |

## Hipóteses do prompt — confirmação ou refutação

| Hipótese                                  | Veredito                | Evidência resumida                                                                      |
| ----------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `Newsroom Social` literal demais          | Confirmada              | filetes, edição, selo, serif e composição de manchete aparecem como linguagem global    |
| Hero performático/hiperdimensionado       | Confirmada              | domina Home desktop/tablet e posterga ação/progresso                                    |
| Serif excessiva                           | Confirmada              | aplicada globalmente a `h1/h2` e repetida em cards/rows                                 |
| Palavra colorida como artifício           | Confirmada              | `h1 em` herda accent e funciona sem significado de estado                               |
| Geometria decorativa                      | Confirmada              | círculos concêntricos no pseudo-elemento da Home não informam nada                      |
| Selo inclinado                            | Confirmada              | onboarding usa carimbo rotacionado como adereço                                         |
| Excesso de uppercase/eyebrows             | Confirmada              | eyebrow global e múltiplos labels de seção usam caixa alta/espaçamento                  |
| Linhas/bordas em excesso                  | Confirmada              | borda é o principal separador em shell, home, episode, interaction e listas             |
| Unicode como icon system                  | Confirmada              | quatro ícones de navegação e símbolos de estado dependem de glyphs Unicode              |
| Sidebar desktop com sensação de dashboard | Confirmada              | rail fixa de 196–224 px enquadra todas as rotas a partir de 700 px                      |
| Flatness sem hierarquia                   | Parcialmente confirmada | tipografia cria hierarquia, mas depth depende quase só de fundo + borda                 |
| Lens contaminando shell                   | Confirmada              | accent e linguagem editorial governam wordmark, títulos e navegação                     |
| Excesso de personalidade simultânea       | Confirmada              | escala, serif, cor, selo, círculo, filetes e bubbles coexistem                          |
| “AI editorial concept”                    | Confirmada              | combinação de giant type, palavra vermelha, geometria e falso expediente é reconhecível |

Nenhum finding foi inventado para motion excessivo, gradiente, glassmorphism, sombras gratuitas ou
card nesting generalizado: esses padrões não são materiais no baseline e não serão “corrigidos”.

## Proving ground por superfície

### Home

Preservar: próxima ação funcional, progresso, ritmo e estado novo/retorno. Corrigir: foco, escala, vazio,
geometria, repetição da marca e relação entre identidade e retomada.

### Episode

Preservar: ordem pedagógica, progress, conversa, coach, fontes, reveal e continuidade. Corrigir: escala
do título, regimes visuais concorrentes, medida nos breakpoints e peso do shell.

### Assessment / Interaction

Preservar: prompt, confidence, cinco tipos de interação, hint, validação, feedback e teclado. Corrigir:
aparência de formulário/card, densidade de contornos e falta de continuidade visual entre pensar,
responder e aprender com o resultado.

## Acessibilidade BEFORE

O baseline automático está verde para as rotas cobertas por axe, foco do drawer, teclado do episódio,
reflow e reduced motion. Isso não encerra a auditoria: escala extrema, excesso de sinais e prioridade
cognitiva são problemas de acessibilidade/usabilidade mesmo sem violation automática.

Riscos a revalidar após redesign:

- contraste de todos os novos tokens e estados;
- foco visível separado de seleção;
- ordem de headings após redução dos títulos;
- labels e nomes acessíveis dos SVGs;
- alvo mínimo de 44 × 44;
- zoom/reflow a 320 px;
- drawer, Escape e restauração de foco;
- estado correto/erro não comunicado apenas por cor;
- reduced motion em reveal, progresso e feedback.

## Resultado do audit

O P0 está funcional, acessível em sua cobertura automática e responsivo sem overflow, mas a direção
visual não passa o gate de identidade, craft e separação multi-lens. A recomendação é preservar o
produto e reconstruir somente a camada de experiência pelo proving ground, sob o contrato de
`DESIGN.md` e o plano de `VISUAL_RECOVERY_PLAN.md`.
