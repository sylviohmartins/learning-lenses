# Gate de validação humana — P0

Este documento operacionaliza as validações que não podem ser substituídas pela suíte automatizada.
O P0 só recebe o status **validado para piloto** quando os três blocos abaixo estiverem aprovados e
os bloqueadores resolvidos.

## Estado

| Bloco                               | Responsável necessário                        | Estado   |
| ----------------------------------- | --------------------------------------------- | -------- |
| Revisão jurídica/editorial          | especialista em tributação brasileira         | PENDENTE |
| Tecnologia assistiva                | pessoa usuária de leitor de tela ou avaliador | PENDENTE |
| Teclado, zoom e dispositivos reais  | QA manual                                     | PENDENTE |
| Testes automatizados e inspeção axe | engenharia                                    | APROVADO |

`PENDENTE` não significa falha. Significa que ainda não existe evidência humana suficiente para
marcar o bloco como aprovado.

## Regra de severidade

- **S0 — bloqueador:** risco de conteúdo materialmente incorreto, fluxo impossível ou perda de
  dados. Interrompe o piloto.
- **S1 — grave:** impede uma tarefa central para parte relevante do público. Deve ser corrigido
  antes do piloto.
- **S2 — moderado:** causa erro recuperável, esforço ou ambiguidade. Pode entrar no piloto apenas
  com decisão registrada.
- **S3 — melhoria:** não impede a tarefa; entra no backlog priorizado por recorrência e impacto.

Cada achado deve registrar: identificador, data, cenário, ambiente, passos, resultado observado,
resultado esperado, severidade, evidência, responsável e resolução.

## 1. Revisão jurídica/editorial

### Preparação

1. Entregar ao especialista o produto, a [auditoria de conteúdo](../../CONTENT_AUDIT.md) e as seis
   fontes oficiais listadas nela.
2. Solicitar revisão de todas as afirmações materiais, feedbacks, misconceptions, timeline,
   perguntas e respostas — não apenas da página de fontes.
3. Registrar nome, qualificação, data, versão/commit avaliado e conflitos de interesse.

### Critérios de aprovação

- nenhuma afirmação sugere substituição instantânea ou simplificação falsa da transição;
- CBS, IBS e Imposto Seletivo estão diferenciados corretamente;
- o tratamento do IPI e da Zona Franca de Manaus está formulado com precisão compatível com o
  nível introdutório;
- datas e etapas 2026–2033 não criam uma cronologia enganosa;
- linguagem sobre benefícios é apresentada como objetivo, não garantia individual;
- cada afirmação material tem fonte oficial suficiente e vigente;
- o aviso educacional está visível e não promete aconselhamento individual.

### Registro de aprovação

```text
Commit avaliado:
Especialista e qualificação:
Data:
Decisão: APROVADO | APROVADO COM RESSALVAS | REPROVADO
Achados abertos (IDs):
Observações:
```

## 2. Leitor de tela e tecnologia assistiva

Executar pelo menos uma sessão completa com NVDA + Chrome ou Edge no Windows. Uma sessão adicional
com VoiceOver + Safari é recomendada antes de distribuição ampla.

### Roteiro

1. Começar com storage limpo e concluir onboarding sem mouse.
2. Identificar título da página, navegação e progresso.
3. Percorrer um episódio, responder, ouvir feedback e abrir/fechar a fonte.
4. Confirmar retorno do foco ao gatilho do drawer.
5. Cometer um erro, localizar a explicação e concluir uma revisão.
6. Abrir Dossiê e Fontes; confirmar nomes, estados e relações compreensíveis.
7. Alterar preferência de movimento e meta semanal em Ajustes.

### Critérios de aprovação

- ordem de leitura e foco acompanha a ordem visual/lógica;
- controles têm nome, papel, estado e instrução suficientes;
- feedback de acerto/erro é anunciado e não depende apenas de cor;
- mudança de rota e abertura/fechamento do drawer não deixam o foco perdido;
- ordem e matching possuem alternativa de teclado compreensível;
- não há conteúdo essencial inacessível em modo de navegação ou foco;
- todos os cenários centrais podem ser concluídos sem ajuda do moderador.

### Registro da sessão

```text
Commit avaliado:
Participante/avaliador:
AT, navegador e versões:
Data:
Cenários concluídos:
Achados (IDs):
Decisão: APROVADO | APROVADO COM RESSALVAS | REPROVADO
```

## 3. Teclado, zoom e dispositivos reais

### Matriz mínima

| Ambiente             | Cenários                                                 |
| -------------------- | -------------------------------------------------------- |
| Chrome/Edge desktop  | onboarding, episódio, drawer, avaliação, revisão, reset  |
| 200% e 400% de zoom  | navegação, respostas, feedback, drawer e ação principal  |
| Android Chrome       | onboarding, episódio completo, rotação e teclado virtual |
| iOS Safari           | onboarding, episódio completo, rotação e teclado virtual |
| teclado sem ponteiro | fluxo principal, erro, revisão, fontes e configurações   |

### Critérios de aprovação

- nenhuma ação ou conteúdo central fica cortado, sobreposto ou inacessível;
- foco permanece visível e não é coberto por navegação, toast ou teclado virtual;
- controles mantêm alvo confortável e não exigem gesto de arrastar;
- não há rolagem horizontal em conteúdo textual a 320 CSS px ou zoom equivalente;
- estado persiste após reload e retorno do navegador;
- orientação e resize não perdem resposta nem progresso.

## Fechamento do gate

1. Triar achados por severidade e consolidar duplicatas.
2. Corrigir S0/S1, repetir o cenário afetado e executar a regressão automatizada completa.
3. Registrar decisões sobre S2/S3 em issue ou backlog com responsável.
4. Atualizar a tabela de estado e anexar links/evidências aos registros.
5. Criar um commit exclusivo para as correções e outro para o aceite documental, enviando ambos
   ao remoto após seus respectivos gates.

Sem as assinaturas/registros acima, a formulação correta é **“pronto para validação humana”**, não
“validado por especialista” ou “acessível para todos”.
