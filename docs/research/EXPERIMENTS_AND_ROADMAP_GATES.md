# Experimentos e gates de roadmap

## Estado e regra central

**Estado:** pré-registrado; nenhum experimento humano foi executado.

O próximo trabalho de produto é validar e calibrar o P0. P1 e P2 não começam por calendário ou
entusiasmo: começam somente quando os gates correspondentes forem satisfeitos com evidência
versionada.

## Ordem obrigatória

1. Fechar o gate humano.
2. Executar dois ciclos de usabilidade com 5–8 participantes no total.
3. Executar o piloto de aprendizagem imediato, 24h e 7d.
4. Corrigir e repetir somente os gates afetados.
5. Congelar uma versão P0 candidata.
6. Estimar variância/abandono do piloto e fazer análise de poder para os experimentos controlados.
7. Executar E1 e, se E1 permitir, E2.
8. Decidir P1; decidir P2 apenas após evidência adicional de P1.

## Calibração do P0

Não alterar pesos de mastery, limites de nível, scoring ou intervalos apenas para melhorar uma
métrica observada. Toda alteração precisa de hipótese, conceito afetado, evidência, versão e teste de
regressão.

| Sinal observado                               | Diagnóstico inicial                       | Intervenção candidata                       |
| --------------------------------------------- | ----------------------------------------- | ------------------------------------------- |
| baixa entrada/conclusão                       | onboarding, duração ou clareza da ação    | reduzir atrito/copy, não facilitar scoring  |
| imediato bom, retenção 7d baixa               | recuperação e espaçamento insuficientes   | revisar prompts/intervalos                  |
| recall bom, transferência baixa               | dependência de superfície/lente           | fortalecer fade e contextos novos           |
| misconception concentrada em um conceito      | mapping, feedback ou fonte ambígua        | corrigir conteúdo e revalidar juridicamente |
| muitas dicas e alta confiança com erro        | ilusão de competência                     | feedback causal + recuperação posterior     |
| fontes pouco consultadas ou não compreendidas | affordance, rótulo ou densidade do drawer | melhorar acesso/metadados                   |
| retorno baixo com aprendizagem adequada       | ritmo, lembrete ou valor percebido        | testar mecanismo de retorno separadamente   |

Após cada mudança:

1. incrementar a versão do conteúdo afetado quando aplicável;
2. registrar decisão e hipótese;
3. rodar regressão completa;
4. não misturar exportações de versões diferentes sem estratificação;
5. repetir a medida que motivou a mudança.

## Regras comuns dos experimentos

- alocação aleatória com razão definida antes do recrutamento;
- estratificação apenas por variáveis pré-definidas, como dispositivo e conhecimento inicial;
- formulários paralelos para reduzir efeito de treino;
- conteúdo factual, duração e dificuldade equivalentes entre braços;
- análise por intenção de tratar; análise por protocolo somente como secundária;
- exclusões, janela de retorno, métrica primária e direção da hipótese congeladas antes dos dados;
- intervalos de confiança e tamanho de efeito acompanhando qualquer teste estatístico;
- abandono e dados ausentes reportados por braço, sem imputação oportunista;
- tamanho da amostra calculado após o piloto a partir do efeito mínimo relevante e variância
  observada; não encerrar ao atingir significância aparente;
- correção para múltiplas comparações nas métricas secundárias ou classificação explícita como
  exploratórias.

## E1 — Fofoca versus explicação direta

### Pergunta

A lente aumenta engajamento/compreensão sem prejudicar precisão e transferência atrasada?

### Braços

- **A — Direto:** mesma sequência, objetivos, exemplos, fontes, avaliações e duração-alvo, em linguagem
  explicativa direta e sem personagens/metáfora.
- **B — Fofoca:** P0 com narrativa Fofoca e fade atual.

### Desfechos

- **Primário:** aprendizagem atrasada em 7 dias.
- **Secundários:** conclusão, tempo, avaliação imediata, retenção sem dica, retorno e consulta de
  fontes.
- **Guardrail principal:** transferência externa 0–4 em 7 dias, pontuada de forma cega ao braço.
- **Outros guardrails:** misconceptions centrais, confiança incorreta, achados jurídicos e de
  acessibilidade.

### Decisão

Considerar a lente promissora apenas se, simultaneamente:

- conclusão B ≥ A + 10% relativo;
- aprendizagem atrasada B não for inferior a A em mais de 5% relativo;
- transferência B não for inferior a A em mais de 5%.

Qualquer piora material em misconception/precisão bloqueia a decisão, mesmo com maior conclusão.

## E2 — fade progressivo versus lente contínua

Executar somente se E1 não rejeitar a lente.

### Pergunta

Retirar gradualmente o scaffold melhora transferência sem reduzir compreensão/retorno?

### Braços

- **A — contínua:** lente com intensidade constante até o fim; avaliações e tempo equivalentes.
- **B — fade:** F1→F5 atual, culminando em transferência sem lente.

### Desfechos

- **Primário:** transferência externa 0–4 em 7 dias.
- **Secundários:** retenção, tempo, conclusão e capacidade de explicar sem vocabulário da lente.
- **Guardrail:** percepção de ruptura/confusão ao longo dos episódios.

### Decisão

Preferir fade progressivo se B melhorar a transferência sem lente em pelo menos 10% relativo ou se
produzir resultado equivalente com melhor confiança/menor dependência reportada, sem perda material
de conclusão ou retenção. Se não houver diferença útil, escolher a experiência mais simples de
manter e documentar a ausência de benefício demonstrado.

## E3 — lente recomendada versus escolhida versus direto

Executar apenas quando houver mais de uma lente elegível e segura.

- **A:** lente recomendada.
- **B:** lente escolhida pela pessoa.
- **C:** explicação direta.

O objetivo é medir se autonomia de escolha adiciona valor; escolha não é presumida como superior.
Desfechos e margens devem ser congelados após dados de E1/E2 e antes do recrutamento.

## E4 — transferência entre lentes

Executar no P1, quando uma segunda lente passar por mapping, limitações, LSS e revisão.

- **A:** aprender com lente A → revisar com lente B → testar sem lente.
- **B:** aprender com lente A → revisar com lente A → testar sem lente.

O objetivo é testar variação de representação, não apenas preferência estética.

## Gate P1 — expansão controlada

Todos os itens abaixo devem estar verdadeiros:

- gate humano aprovado, sem S0/S1;
- critérios de usabilidade e piloto atendidos ou exceção formalmente justificada;
- E1/E2 concluídos ou decisão documentada de que não são necessários para a expansão;
- fonte, conteúdo, exportação e análise continuam versionados;
- capacidade operacional para repetir revisão jurídica/acessibilidade no novo conteúdo;
- hipótese e critério de sucesso do P1 definidos antes da implementação.

Sequência recomendada:

1. testar a lente **Condomínio** em apenas 1–2 conceitos já existentes;
2. comparar compreensão/transferência com a lente validada, sem abrir uma temporada inteira;
3. somente depois criar o domínio técnico **Java / Race Condition** como subject separado, com nova
   auditoria de fontes, misconceptions e transfer — nunca como simples troca de copy.

Falhar no gate mantém P1 fora do produto; não reduz os limiares retroativamente.

## Gate P2 — social/backend

P2 só entra em discovery depois de P0 e P1 demonstrarem valor de retenção/transferência. Antes de
qualquer feed, perfil ou compartilhamento, exigir:

- caso de uso social validado que melhore aprendizagem, não apenas atividade;
- modelo de dados, consentimento, retenção, exclusão e portabilidade;
- threat model, autenticação/autorização e proteção contra abuso;
- política e operação de moderação, denúncia e recurso;
- revisão de privacidade, segurança, acessibilidade e implicações de público/idade;
- métricas de qualidade que não recompensem desinformação ou viralidade;
- plano de rollback e resposta a incidentes.

Sem esses itens, o estado local-first permanece uma restrição deliberada e benéfica do P0.

## Registro de decisão

```text
ID e data:
Commit/versão avaliada:
Gate/experimento:
Hipótese registrada antes dos dados:
Amostra e exclusões:
Desfecho primário e resultado:
Secundários/guardrails:
Limitações:
Decisão: AVANÇAR | ITERAR P0 | INTERROMPER
Responsável:
Próxima revisão:
```

Até que resultados humanos existam, o status correto é **pronto para validação**, e o próximo passo
operacional é recrutamento — não expansão funcional.
