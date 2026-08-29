# Decisões materiais

## D-001 — CSS nativo e primitives HTML

**Decisão:** usar CSS variables/CSS responsivo e controles HTML nativos em vez de Tailwind ou uma camada Base UI completa.

**Motivo:** o P0 precisa de poucos primitives; radio, select, button e textarea nativos oferecem semântica e teclado robustos com menor supply-chain e bundle. O drawer customizado adiciona somente o comportamento que o produto exige: modal, Escape, trap e restauração de foco.

## D-002 — React Router em library mode

**Decisão:** usar React Router 7 com `BrowserRouter`, preservando o modelo SPA previsto.

**Motivo:** não há SSR, RSC, autenticação ou backend. O shell aplica scroll-to-top por pathname para evitar que a posição de leitura atravesse episódios.

## D-003 — sem webfont obrigatória

**Decisão:** declarar Newsreader/Instrument Sans como primeiras opções e usar fallbacks editoriais/sistema.

**Motivo:** nenhuma fonte externa pode bloquear ou impedir o funcionamento offline/local. O resultado mantém a direção Newsroom Social sem requisição crítica de fonte.

## D-004 — scoring textual determinístico

**Decisão:** o transfer P0 exige três grupos semânticos mínimos: referência a 2026, ideia de início/teste e transição gradual/2033.

**Motivo:** atende ao acceptance criterion sem chamar heurística simples de IA. A regra é transparente, testável e substituível.

## D-005 — uma review por evidence/concept

**Decisão:** cada primeira interação cria uma review vinculada ao concept e assessment que originaram a evidence.

**Motivo:** preserva rastreabilidade e permite que o usuário responda uma avaliação real no retorno. A tela agrupa visualmente por conceito para não gerar ruído.

## D-006 — analytics limitado a 300 eventos

**Decisão:** manter apenas os 300 eventos locais mais recentes.

**Motivo:** evita crescimento ilimitado sem introduzir backend ou política complexa de retenção no P0.

## D-007 — TypeScript 6

**Decisão:** usar TypeScript 6.0.2 em vez do tag mais novo 7.0.2 observado no registry.

**Motivo:** é a linha compatível com a toolchain tipada atual (`typescript-eslint` 8) e não degrada nenhum requisito do produto.

## D-008 — datas oficiais normalizadas em UTC ao meio-dia

**Decisão:** armazenar `verifiedAt` com horário UTC não limítrofe e exibir em pt-BR.

**Motivo:** evita regressão visual de um dia em fusos negativos sem perder ISO datetime ou alterar a data editorial real.
