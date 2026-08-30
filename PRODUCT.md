# Learning Lenses — contrato de produto do P0

Status: contrato aprovado no Plan Gate em 2026-08-29.

## Propósito

Learning Lenses é uma plataforma de aprendizagem que usa uma lente narrativa temporária para
despertar curiosidade, construir compreensão e, depois, retirar o apoio até que a pessoa consiga
recuperar e aplicar o conceito sem a lente.

O primeiro vertical é o **Fuxico Fiscal**, uma introdução à Reforma Tributária do Consumo pela lente
**Fofoca**. O conteúdo é educacional e não substitui aconselhamento jurídico ou tributário.

## Usuário e problema

O P0 serve adultos curiosos que precisam formar um modelo mental inicial sobre um assunto complexo,
mas encontram duas barreiras recorrentes:

- linguagem técnica sem contexto suficiente para começar;
- conteúdo atraente que entretém, mas não comprova retenção ou transferência.

A proposta é unir narrativa memorável, regra real, fontes oficiais, prática ativa, revisão espaçada e
evidência de domínio. A lente abre a porta; a aprendizagem precisa sobreviver quando ela desaparece.

## Proposta de valor ainda não comercial

O produto oferece uma experiência curta e local-first em que a pessoa:

1. entra por uma situação narrativa;
2. mapeia a metáfora para conceitos reais;
3. responde antes de receber a explicação completa;
4. calibra confiança e recebe feedback causal;
5. revisita o conceito com espaçamento;
6. demonstra aplicação e transferência sem a lente.

Não há posicionamento comercial, mercado-alvo pago ou promessa de eficácia validada. Essas decisões
dependem dos experimentos já pré-registrados.

## Princípios de produto

### Learning-first

Curiosidade serve à compreensão; compreensão serve à retenção; retenção serve à transferência.
Mastery, revisão e feedback têm prioridade sobre XP, streaks e ornamentos.

### Content-first

Narrativa, regra real, relação entre conceitos e procedência das fontes lideram a composição. O shell
recua quando a pessoa está lendo ou respondendo.

### Mobile-first

A experiência precisa ser completa, legível e operável a partir de 320 px, sem tratar mobile como uma
redução tardia do desktop. Tablet e desktop ampliam medida, contexto e conforto — não a quantidade de
chrome.

### Local-first no P0

Progresso, preferências, eventos e evidências permanecem no dispositivo. Não há conta, backend,
sincronização ou dependência de rede para aprender, exceto ao abrir uma fonte externa por escolha da
pessoa.

### Lens Independence

O domínio de aprendizagem não conhece detalhes visuais ou narrativos da lente. Avaliação, mastery,
review, persistência e analytics continuam válidos quando assunto e lente mudam.

### Cross-Lens Transfer

O sucesso não é reconhecer a fofoca; é explicar e aplicar a regra tributária em outra superfície,
inclusive sem personagem, bordão ou pista visual da lente.

### Progressive disclosure

Cada etapa mostra contexto suficiente para a decisão atual. Fontes, detalhes e feedback aprofundado
ficam próximos e disponíveis, mas não competem com a ação principal.

### Acessibilidade como comportamento

Semântica, teclado, foco, contraste, alvos, zoom, linguagem clara e movimento reduzido fazem parte do
produto. Não são uma camada de conformidade aplicada no fim.

## Produto × assunto × lente

```text
LEARNING LENSES
│
├── PRODUCT DESIGN SYSTEM
│   ├── foundations
│   ├── navigation
│   ├── layout
│   ├── interaction
│   ├── motion
│   └── primitives
│
└── SUBJECT / LENS THEMING
    └── Reforma Tributária
        └── Fofoca
            └── Fuxico Fiscal
```

O **Product Design System** controla navegação, legibilidade, estados, feedback, responsividade e
acessibilidade. O **Subject** fornece conceitos, evidências e linguagem técnica. A **Lens** controla
somente elementos que ajudam curiosidade, narrativa, memória ou explicação. Fuxico Fiscal é a
expressão dessa combinação, não a identidade estrutural de toda a plataforma.

## Tom

- claro, direto e adulto;
- curioso sem ser leviano;
- caloroso sem excesso de espirituosidade;
- preciso ao distinguir metáfora, regra real e limitação;
- transparente sobre fontes, incerteza e estágio experimental;
- encorajador sem infantilizar erro ou dificuldade.

## Restrições congeladas

- cinco episódios e uma avaliação final no P0;
- uma lente e um domínio no lançamento;
- conteúdo como dados, validado em runtime;
- mastery V1, review 1/3/7/21, confidence, XP e conquistas preservados;
- React, TypeScript, Vite, Router e Zod preservados;
- WCAG 2.2 AA como alvo;
- sem backend, login, social, league, marketplace ou novos cursos;
- fontes oficiais acessíveis e conteúdo jurídico separado da narrativa;
- hipóteses de eficácia continuam sendo hipóteses até teste humano.

## Anti-patterns

- lente dominando o shell ou contaminando futuras lentes;
- metáfora apresentada como regra real;
- hero monumental que atrasa a próxima ação;
- estética de jornal ou revista usada como fantasia;
- card soup, dashboard administrativo ou LMS corporativo;
- gamificação mais saliente que mastery e revisão;
- copy espirituosa em todas as superfícies;
- interação que parece formulário de pesquisa;
- esconder fonte, limitação ou feedback por estética;
- “premium” definido apenas por vazio, serifas, blur ou sombras;
- qualquer mudança visual que reabra domínio, conteúdo ou escopo sem bug comprovado.

## O que o produto não é

- consultoria tributária;
- curso abrangente ou preparação profissional;
- rede social, ranking ou jogo de recompensa;
- agregador de notícias;
- revista digital;
- dashboard de produtividade;
- plataforma comercial validada;
- prova de que a lente Fofoca melhora aprendizagem.

## Evidência de sucesso do P0

O P0 cumpre sua função quando permite executar o protocolo de pesquisa com produto estável e quando a
pessoa consegue orientar-se, aprender, revisar e transferir sem que o visual introduza ruído. Métricas
de aprendizagem, retorno e experiência continuam regidas pelos documentos de pesquisa, não por
preferência estética.
