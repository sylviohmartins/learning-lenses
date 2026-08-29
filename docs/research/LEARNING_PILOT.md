# Piloto de aprendizagem — P0

## Objetivo e estado

Estimar se o P0 produz compreensão inicial, retenção e transferência — sem confundir conclusão,
XP ou agrado com aprendizagem.

**Estado:** instrumentado e pronto para recrutamento; nenhum dado humano foi coletado.

O piloto começa somente após o gate humano e os ciclos de usabilidade definidos neste repositório.

## Perguntas

1. As pessoas concluem o módulo sem assistência?
2. Corrigem as misconceptions centrais imediatamente?
3. Retornam em 24 horas e novamente em 7 dias?
4. Retêm os conceitos após o atraso?
5. Aplicam os conceitos em um contexto sem a lente Fofoca?

## Amostra e desenho

- **Piloto formativo:** 12–20 adultos do público-alvo, sem especialização tributária.
- **Sessão 0:** consentimento, código pseudônimo, módulo e avaliação imediata.
- **24h (±6h):** retorno e revisão curta.
- **7d (±24h):** avaliação atrasada e transferência em contexto novo.
- **Análise:** descritiva; o tamanho não sustenta inferência populacional ou promessa de eficácia.

Registrar antecipadamente qualquer exclusão. Exportações com `simulationOffsetDays > 0`, falha
técnica material ou participante fora do critério são analisadas separadamente, nunca removidas sem
justificativa.

## Procedimento

### Sessão 0

1. Atribuir código como `P001`; não inserir nome, e-mail ou CPF no produto.
2. Confirmar storage limpo e `simulationOffsetDays = 0`.
3. Permitir uso autônomo do módulo; registrar apenas pedidos de ajuda e falhas técnicas.
4. Ao terminar, aplicar a avaliação final e a transferência já presentes no produto.
5. Em Ajustes, informar o código e baixar o JSON.
6. Coletar uma pergunta curta externa: “Explique para alguém o que muda entre 2026 e 2033.”

### Retorno em 24 horas

1. Reabrir o mesmo navegador/perfil, sem recapitulação prévia.
2. Permitir que a pessoa identifique e conclua as revisões disponíveis.
3. Perguntar: “CBS e IBS são a mesma coisa? Explique.”
4. Exportar novamente com o mesmo código.

### Retorno em 7 dias

1. Reabrir sem recapitulação.
2. Concluir as revisões disponíveis.
3. Aplicar o cenário de transferência abaixo antes de mostrar qualquer resposta.
4. Exportar novamente.

## Probes externos e rubricas

### Transição — 0 a 2 pontos

Pergunta: “Explique para alguém o que muda entre 2026 e 2033.”

- **0:** diz que a reforma terminou em 2026 ou não descreve transição.
- **1:** reconhece que há etapas, mas não diferencia início e conclusão.
- **2:** identifica 2026 como início/teste e 2033 como horizonte do modelo integral.

### CBS e IBS — 0 a 2 pontos

Pergunta: “CBS e IBS são a mesma coisa? Explique.”

- **0:** afirma que são o mesmo tributo ou troca as competências.
- **1:** diz que são diferentes sem explicar a competência.
- **2:** diferencia CBS federal de IBS compartilhado/subnacional.

### Transferência sem lente — 0 a 4 pontos

Cenário: “Uma associação comercial publica: ‘Em 2026 todos os tributos antigos acabam e qualquer
produto ficará mais barato’. Como você avaliaria essa frase para orientar pequenos lojistas?”

Dar um ponto por elemento, até quatro:

1. rejeita a troca instantânea em 2026;
2. menciona a transição até 2033 ou sua gradualidade;
3. rejeita garantia universal de queda de preços/carga;
4. recomenda verificar regra, item e fonte oficial, sem tratar a metáfora como autoridade.

Dois avaliadores pontuam uma amostra de pelo menos 25% das respostas externas. Divergências são
resolvidas por consenso e a regra ajustada antes de pontuar o restante.

## Métricas primárias

| Métrica                   | Fonte                                     | Cálculo                                  |
| ------------------------- | ----------------------------------------- | ---------------------------------------- |
| Conclusão                 | `moduleComplete`                          | participantes que concluem / iniciam     |
| Retorno 24h               | exportações e `app_started`               | participantes com sessão 24h / elegíveis |
| Retorno 7d                | exportações e `app_started`               | participantes com sessão 7d / elegíveis  |
| Avaliação imediata        | `responses` + `evidence`                  | acertos / itens respondidos              |
| Retenção atrasada         | reviews/evidence 7d                       | acertos sem dica / itens                 |
| Transferência             | item interno + rubrica externa            | acerto interno e mediana 0–4             |
| Misconception persistente | `misconception_triggered` + probe externo | participantes com erro por misconception |

Mastery, XP, conquistas e ritmo são diagnósticos de produto. Não são desfechos primários de
aprendizagem.

## Exportação e cadeia de custódia

1. Usar **Ajustes → Exportar evidências** após cada sessão.
2. O arquivo contém schema de exportação, horário, código opcional, offset de simulação e evidências.
3. Texto livre digitado e preferência de movimento são omitidos para reduzir risco de PII.
4. Guardar consentimentos separados dos dados e manter a chave código↔contato fora do repositório.
5. Definir acesso, criptografia, retenção e descarte antes do recrutamento.
6. Nunca versionar exportações de participantes no Git.

## Critérios de decisão pré-definidos

O P0 pode avançar para calibração se, no piloto formativo:

- ≥ 80% concluem o módulo;
- ≥ 60% dos elegíveis retornam em 24h e ≥ 40% em 7d;
- mediana da avaliação imediata ≥ 70%;
- mediana da retenção sem dica em 7d ≥ 60%;
- mediana da transferência externa ≥ 3/4;
- nenhuma misconception central persiste em mais de 30% dos participantes no probe de 7d;
- nenhum S0/S1 técnico, jurídico ou de acessibilidade permanece aberto.

Esses limiares são gates de produto, não prova estatística de eficácia. Se um gate falhar, investigar
o funil e as evidências por conceito antes de alterar scoring ou conteúdo.
