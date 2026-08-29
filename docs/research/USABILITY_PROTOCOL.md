# Protocolo de usabilidade — P0

## Objetivo e estado

Verificar se pessoas sem especialização tributária conseguem começar, compreender a separação entre
fofoca e regra real, responder, consultar evidências e retomar/revisar sem ajuda.

**Estado:** pronto para recrutamento; nenhuma sessão humana foi executada neste repositório.

## Desenho do estudo

- **Amostra total:** 5–8 participantes do público-alvo.
- **Ciclo 1:** 3–4 participantes; corrigir apenas achados recorrentes ou S0/S1.
- **Ciclo 2:** 2–4 novos participantes; confirmar as correções e procurar regressões.
- **Formato:** sessão moderada remota ou presencial de 35–45 minutos.
- **Dispositivo:** preferencialmente o aparelho habitual do participante; registrar modelo, sistema,
  navegador e tamanho aproximado da tela.
- **Critério de inclusão:** adulto, lê português, não atua profissionalmente com tributação e aceita
  pensar em voz alta.
- **Diversidade mínima:** incluir níveis distintos de familiaridade digital e pelo menos duas
  sessões em smartphone.

Não coletar CPF, endereço, renda, vínculo empregatício, opinião política ou qualquer dado que não
seja necessário à pesquisa. Use um ID pseudônimo (`U01`, `U02`...). Gravação só pode ocorrer com
consentimento explícito e política de retenção definida pelo responsável pelo estudo.

## Antes da sessão

1. Fixar o commit avaliado e criar um perfil/storage limpo.
2. Confirmar que o participante não viu o produto.
3. Explicar que o produto — não a pessoa — está sendo testado.
4. Obter consentimento para anotações e, separadamente, para gravação.
5. Pedir que a pessoa verbalize expectativas, dúvidas e decisões; não ensinar a interface.

### Texto de abertura

> Estamos avaliando um protótipo educacional, não seu conhecimento. Algumas partes podem estar
> confusas; isso é informação útil para nós. Tente agir como faria normalmente e diga o que estiver
> pensando. Você pode pausar ou encerrar quando quiser. O conteúdo não é aconselhamento tributário.

## Tarefas

O moderador lê somente o contexto. Ajuda é registrada como falha assistida e nunca como sucesso
independente.

### T1 — começar sem orientação

“Você ouviu falar de mudanças nos impostos sobre consumo e quer entender o básico. Mostre o que
faria aqui.”

**Sucesso:** inicia o módulo e chega ao primeiro episódio sem ajuda.

### T2 — distinguir história de regra

“Avance pelo primeiro episódio e explique, com suas palavras, o que é história e o que é regra
real.”

**Sucesso:** identifica a revelação como correção/explicação e não trata a metáfora como regra
literal.

### T3 — responder e entender feedback

“Responda à pergunta como achar melhor. Depois explique por que a resposta foi avaliada daquele
jeito.”

**Sucesso:** envia uma resposta e consegue parafrasear o feedback causal.

### T4 — verificar uma afirmação

“Você quer conferir de onde veio essa informação. Descubra como faria isso.”

**Sucesso:** abre a fonte, reconhece autoridade/data/status e retorna ao ponto anterior.

### T5 — encontrar uma explicação depois

“Imagine que amanhã você esqueceu o que é IBS. Onde procuraria essa explicação?”

**Sucesso:** localiza o conceito no Dossiê sem orientação.

### T6 — retomar e revisar

Após um intervalo/reload e, em desenvolvimento, com revisão liberada pelo time travel: “Volte ao
produto e descubra o que merece sua atenção agora.”

**Sucesso:** retoma do estado salvo e encontra/conclui a revisão devida.

## Perguntas pós-tarefa

Após cada tarefa, coletar:

- facilidade percebida de 1 (muito difícil) a 7 (muito fácil);
- “O que você esperava que acontecesse?”;
- “O que, se algo, deixou você em dúvida?”.

Ao final:

1. “Em uma frase, o que mudou na tributação do consumo?”
2. “O que a fofoca ajudou a entender? O que ela atrapalhou?”
3. “Em que momento você confiou ou desconfiou do conteúdo?”
4. “O que faria você voltar?”
5. “Qual parte você removeria primeiro?”

## Registro por participante

Copie este bloco para cada sessão:

```text
ID:
Data:
Commit:
Moderador:
Dispositivo/SO/navegador:
Familiaridade digital: baixa | média | alta
Gravação consentida: sim | não

T1: sucesso | assistido | falha — tempo — facilidade 1–7 — observações
T2: sucesso | assistido | falha — tempo — facilidade 1–7 — observações
T3: sucesso | assistido | falha — tempo — facilidade 1–7 — observações
T4: sucesso | assistido | falha — tempo — facilidade 1–7 — observações
T5: sucesso | assistido | falha — tempo — facilidade 1–7 — observações
T6: sucesso | assistido | falha — tempo — facilidade 1–7 — observações

Compreensão em uma frase:
Contribuição/atrito da lente:
Confiança/fontes:
Achados (IDs):
Observações do participante (paráfrase):
```

## Síntese e decisão

Para cada ciclo, consolidar:

| Métrica                      | Como calcular                                       |
| ---------------------------- | --------------------------------------------------- |
| Conclusão independente       | sucessos sem ajuda / tentativas                     |
| Falha crítica                | participantes com S0/S1 / participantes             |
| Facilidade por tarefa        | mediana das notas 1–7                               |
| Consulta espontânea de fonte | participantes que abriram sem indução / total       |
| Compreensão da regra         | respostas aceitáveis / total, por rubrica do piloto |

Critérios para seguir ao piloto de aprendizagem:

- nenhuma falha S0/S1 aberta;
- pelo menos 80% de conclusão independente em T1–T5;
- mediana de facilidade ≥ 5 em T1–T5;
- pelo menos 80% distinguem narrativa e regra real;
- achados S2 têm decisão e responsável registrados.

Se a amostra for menor que cinco ou muito homogênea, os resultados são exploratórios e não
autorizam afirmações amplas de usabilidade.

## Disciplina de mudanças entre ciclos

1. Transformar observações em problemas, não em soluções ditadas pelo participante.
2. Priorizar frequência × impacto × confiança da evidência.
3. Alterar uma causa provável por vez quando isso facilitar atribuição.
4. Rodar lint, typecheck, testes e E2E após mudanças de produto.
5. Registrar commit avaliado em cada sessão e publicar as correções antes do ciclo seguinte.
