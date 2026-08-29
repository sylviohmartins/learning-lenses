import type {
  Assessment,
  Concept,
  Episode,
  Lens,
  LensMapping,
  Misconception,
  Module,
  Source,
  Subject,
} from "./model";
import {
  assessmentSchema,
  conceptSchema,
  episodeSchema,
  lensMappingSchema,
  lensSchema,
  misconceptionSchema,
  moduleSchema,
  sourceSchema,
  subjectSchema,
} from "./schemas";

const verifiedAt = "2026-08-29T12:00:00.000Z";

export const subject = subjectSchema.parse({
  id: "reforma-consumo",
  slug: "reforma-tributaria-consumo",
  title: "Reforma Tributária do Consumo",
  description:
    "Uma introdução verificável à CBS, ao IBS, ao Imposto Seletivo e à transição até 2033.",
  domainIds: ["direito-tributario"],
  status: "verified",
  version: 1,
}) satisfies Subject;

export const sources = sourceSchema.array().parse([
  {
    id: "ec-132-2023",
    title: "Emenda Constitucional nº 132, de 20 de dezembro de 2023",
    authority: "Presidência da República — Casa Civil",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm",
    legalReference: "CF, arts. 153, VIII; 156-A; 195, V; e ADCT, arts. 125 a 133",
    sourceType: "constitution",
    effectiveFrom: "2023-12-21",
    verifiedAt,
    freshnessClass: "legislative",
    status: "verified",
  },
  {
    id: "lc-214-2025",
    title: "Lei Complementar nº 214, de 16 de janeiro de 2025",
    authority: "Presidência da República — Casa Civil",
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm",
    legalReference: "Institui IBS, CBS e Imposto Seletivo",
    sourceType: "law",
    effectiveFrom: "2025-01-17",
    verifiedAt,
    freshnessClass: "legislative",
    status: "verified",
  },
  {
    id: "lc-227-2026",
    title: "Lei Complementar nº 227, de 13 de janeiro de 2026",
    authority: "Presidência da República — Casa Civil",
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm",
    legalReference: "Institui o CGIBS e disciplina o processo administrativo do IBS",
    sourceType: "law",
    effectiveFrom: "2026-01-14",
    verifiedAt,
    freshnessClass: "legislative",
    status: "verified",
  },
  {
    id: "rfb-entenda-rtc",
    title: "Entenda a Reforma Tributária do Consumo",
    authority: "Receita Federal do Brasil",
    url: "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/entenda",
    legalReference: "Guia oficial atualizado em 03/07/2026",
    sourceType: "official-guidance",
    verifiedAt,
    freshnessClass: "operational",
    status: "verified",
  },
  {
    id: "rfb-orientacoes-2026",
    title: "Orientações da Reforma Tributária para 2026",
    authority: "Receita Federal do Brasil",
    url: "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/orientacoes-2026",
    legalReference: "Obrigações e período de teste em 2026; atualizado em 06/05/2026",
    sourceType: "official-guidance",
    effectiveFrom: "2026-01-01",
    verifiedAt,
    freshnessClass: "operational",
    status: "verified",
  },
  {
    id: "rfb-legislacao-rtc",
    title: "Legislação da Reforma Tributária do Consumo",
    authority: "Receita Federal do Brasil",
    url: "https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao/legislacao-da-reforma-tributaria-do-consumo",
    legalReference: "Índice oficial dos marcos regulatórios; atualizado em 18/08/2026",
    sourceType: "official-guidance",
    verifiedAt,
    freshnessClass: "operational",
    status: "verified",
  },
]) satisfies Source[];

export const misconceptions = misconceptionSchema.array().parse([
  {
    id: "m-terminou-2026",
    conceptIds: ["transicao"],
    claim: "A reforma terminou em 2026.",
    correction:
      "2026 é a fase inicial de teste; a implementação é gradual e o modelo integral está previsto para 2033.",
    whyPlausible:
      "IBS e CBS já aparecem em documentos e obrigações de 2026, o que pode soar como implantação completa.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    status: "verified",
  },
  {
    id: "m-produto-servico",
    conceptIds: ["cbs", "ibs"],
    claim: "CBS cobra produtos e IBS cobra serviços.",
    correction:
      "A diferença introdutória é institucional: CBS é federal; IBS é de competência compartilhada entre estados, municípios e DF.",
    whyPlausible:
      "O sistema anterior separa impostos por mercadorias e serviços, então a pessoa transfere essa lógica ao novo modelo.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    status: "verified",
  },
  {
    id: "m-is-iva",
    conceptIds: ["imposto-seletivo"],
    claim: "O IS é o terceiro pedaço do IVA dual.",
    correction: "O IS é federal e possui função seletiva própria; IBS e CBS formam o IVA dual.",
    whyPlausible: "Os três tributos são apresentados juntos na reforma do consumo.",
    sourceIds: ["ec-132-2023", "lc-214-2025", "rfb-entenda-rtc"],
    status: "verified",
  },
  {
    id: "m-tudo-mais-barato",
    conceptIds: ["objetivos-reforma"],
    claim: "A reforma garante que tudo ficará mais barato.",
    correction:
      "Os objetivos incluem simplificação, transparência, neutralidade, menor cumulatividade e segurança jurídica; isso não garante redução de preço ou carga para cada item e pessoa.",
    whyPlausible:
      "Ganhos de eficiência agregados podem ser confundidos com uma promessa individual de preço.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    status: "verified",
  },
]) satisfies Misconception[];

export const assessments = assessmentSchema.array().parse([
  {
    id: "a-ep1-transicao",
    conceptIds: ["transicao"],
    type: "recognition",
    difficulty: 1,
    prompt: "Qual parte parece mais suspeita?",
    scoringRuleId: "exact-choice",
    lensId: "fofoca",
    verified: true,
    kind: "single-choice",
    choices: [
      { id: "a", label: "Existem IBS e CBS." },
      { id: "b", label: "Tudo foi trocado em 2026." },
      { id: "c", label: "Existe um Imposto Seletivo." },
    ],
    correctChoiceIds: ["b"],
    feedbackCorrect: "2026 marca o começo da fase de teste, não o fim da transição.",
    feedbackWrong:
      "IBS, CBS e IS existem. O pedaço quebrado da história é dizer que a troca inteira terminou em 2026.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    misconceptionId: "m-terminou-2026",
    asksConfidence: true,
  },
  {
    id: "a-ep2-esferas",
    conceptIds: ["cbs", "ibs"],
    type: "recognition",
    difficulty: 2,
    prompt: "Qual é a diferença institucional mais importante aqui?",
    scoringRuleId: "exact-choice",
    lensId: "fofoca",
    verified: true,
    kind: "single-choice",
    choices: [
      { id: "a", label: "Um é produto e o outro é serviço." },
      { id: "b", label: "Um é federal e o outro envolve estados, municípios e DF." },
      { id: "c", label: "Um é para empresa e o outro para pessoa física." },
    ],
    correctChoiceIds: ["b"],
    feedbackCorrect:
      "CBS é federal; IBS reúne competências de estados, municípios e Distrito Federal.",
    feedbackWrong:
      "Produto versus serviço é uma lógica que parece familiar, mas não explica CBS e IBS. A chave introdutória é a competência institucional.",
    sourceIds: ["ec-132-2023", "lc-214-2025", "lc-227-2026"],
    misconceptionId: "m-produto-servico",
  },
  {
    id: "a-ep2-matching",
    conceptIds: ["cbs", "ibs"],
    type: "recall",
    difficulty: 2,
    prompt: "Ligue cada tributo à esfera correspondente.",
    scoringRuleId: "exact-matching",
    verified: true,
    kind: "matching",
    matchLeft: [
      { id: "cbs", label: "CBS" },
      { id: "ibs", label: "IBS" },
    ],
    matchRight: [
      { id: "federal", label: "União / federal" },
      { id: "subnacional", label: "Estados, municípios e DF" },
    ],
    correctMatches: { cbs: "federal", ibs: "subnacional" },
    feedbackCorrect: "As duas ligações estão certas.",
    feedbackWrong:
      "CBS fica na esfera federal. IBS é compartilhado por estados, municípios e Distrito Federal.",
    sourceIds: ["ec-132-2023", "lc-214-2025"],
  },
  {
    id: "a-ep3-is",
    conceptIds: ["imposto-seletivo"],
    type: "application",
    difficulty: 2,
    prompt: "O que diferencia o Imposto Seletivo?",
    scoringRuleId: "exact-choice",
    lensId: "fofoca",
    verified: true,
    kind: "single-choice",
    choices: [
      { id: "a", label: "Arrecadação estadual." },
      {
        id: "b",
        label:
          "Incidência seletiva ligada a bens e serviços definidos em lei por efeitos prejudiciais à saúde ou ao meio ambiente.",
      },
      { id: "c", label: "Substitui o ISS." },
    ],
    correctChoiceIds: ["b"],
    feedbackCorrect: "O IS é federal e tem finalidade seletiva distinta da arquitetura IBS/CBS.",
    feedbackWrong:
      "O IS não substitui o ISS e não é estadual. Ele incide seletivamente sobre itens definidos constitucional e legalmente.",
    sourceIds: ["ec-132-2023", "lc-214-2025", "rfb-entenda-rtc"],
    misconceptionId: "m-is-iva",
  },
  {
    id: "a-ep4-ordem",
    conceptIds: ["transicao"],
    type: "recall",
    difficulty: 3,
    prompt: "Coloque os marcos na ordem da transição.",
    scoringRuleId: "exact-order",
    verified: true,
    kind: "order",
    orderItems: [
      { id: "2029", label: "2029 — começa a substituição gradual de ICMS/ISS pelo IBS" },
      { id: "2033", label: "2033 — modelo integral" },
      { id: "2026", label: "2026 — fase de teste" },
      { id: "2027", label: "2027 — mudanças federais relevantes" },
    ],
    correctOrder: ["2026", "2027", "2029", "2033"],
    feedbackCorrect:
      "Essa é a espinha dorsal: teste, mudanças federais, transição subnacional e modelo integral.",
    feedbackWrong: "Comece por 2026 (teste), passe por 2027, depois 2029 e só então 2033.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    asksConfidence: true,
  },
  {
    id: "a-ep5-precos",
    conceptIds: ["objetivos-reforma"],
    type: "application",
    difficulty: 3,
    prompt: "A reforma garante que todos os produtos ficarão mais baratos?",
    scoringRuleId: "exact-choice",
    lensId: "fofoca",
    verified: true,
    kind: "boolean",
    choices: [
      { id: "sim", label: "Sim" },
      { id: "nao", label: "Não" },
    ],
    correctChoiceIds: ["nao"],
    feedbackCorrect: "Objetivos sistêmicos não são garantia de preço menor para cada produto.",
    feedbackWrong:
      "Simplificação e eficiência são objetivos gerais. Eles não prometem redução individual de todos os preços ou da carga para todos.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    misconceptionId: "m-tudo-mais-barato",
  },
  {
    id: "a-final-cbs",
    conceptIds: ["cbs"],
    type: "recall",
    difficulty: 2,
    prompt: "CBS é ligada a qual esfera?",
    scoringRuleId: "exact-choice",
    verified: true,
    kind: "single-choice",
    choices: [
      { id: "u", label: "União / esfera federal" },
      { id: "e", label: "Somente estados" },
      { id: "m", label: "Somente municípios" },
    ],
    correctChoiceIds: ["u"],
    feedbackCorrect: "CBS é federal.",
    feedbackWrong: "CBS é a contribuição da esfera federal.",
    sourceIds: ["ec-132-2023", "lc-214-2025"],
  },
  {
    id: "a-final-ibs",
    conceptIds: ["ibs"],
    type: "recall",
    difficulty: 2,
    prompt: "IBS é ligado a quais entes?",
    scoringRuleId: "exact-choice",
    verified: true,
    kind: "single-choice",
    choices: [
      { id: "u", label: "Apenas União" },
      { id: "sm", label: "Estados, municípios e Distrito Federal" },
      { id: "m", label: "Apenas municípios" },
    ],
    correctChoiceIds: ["sm"],
    feedbackCorrect: "IBS é de competência compartilhada subnacional.",
    feedbackWrong: "A resposta reúne estados, municípios e Distrito Federal.",
    sourceIds: ["ec-132-2023", "lc-227-2026"],
  },
  {
    id: "a-final-is",
    conceptIds: ["imposto-seletivo"],
    type: "application",
    difficulty: 3,
    prompt: "O IS é simplesmente o terceiro componente do IVA dual?",
    scoringRuleId: "exact-choice",
    verified: true,
    kind: "boolean",
    choices: [
      { id: "sim", label: "Sim" },
      { id: "nao", label: "Não" },
    ],
    correctChoiceIds: ["nao"],
    feedbackCorrect: "Ele tem função seletiva própria.",
    feedbackWrong: "IBS e CBS compõem o IVA dual; o IS tem função distinta.",
    sourceIds: ["ec-132-2023", "lc-214-2025"],
    misconceptionId: "m-is-iva",
  },
  {
    id: "a-final-2026",
    conceptIds: ["transicao"],
    type: "recall",
    difficulty: 3,
    prompt: "Tudo terminou em 2026?",
    scoringRuleId: "exact-choice",
    verified: true,
    kind: "boolean",
    choices: [
      { id: "sim", label: "Sim" },
      { id: "nao", label: "Não" },
    ],
    correctChoiceIds: ["nao"],
    feedbackCorrect: "2026 é fase inicial de teste.",
    feedbackWrong: "A transição avança gradualmente até o modelo integral em 2033.",
    sourceIds: ["rfb-entenda-rtc", "rfb-orientacoes-2026"],
    misconceptionId: "m-terminou-2026",
  },
  {
    id: "a-final-substituicao",
    conceptIds: ["ibs", "transicao"],
    type: "application",
    difficulty: 3,
    prompt: "ICMS e ISS caminham gradualmente para qual substituição?",
    scoringRuleId: "exact-choice",
    verified: true,
    kind: "single-choice",
    choices: [
      { id: "cbs", label: "CBS" },
      { id: "ibs", label: "IBS" },
      { id: "is", label: "Imposto Seletivo" },
    ],
    correctChoiceIds: ["ibs"],
    feedbackCorrect: "A transição de ICMS e ISS é para o IBS.",
    feedbackWrong: "A substituição gradual subnacional é ICMS/ISS → IBS.",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
  },
  {
    id: "a-final-transfer",
    conceptIds: ["transicao"],
    type: "transfer",
    difficulty: 4,
    prompt:
      "Em uma reunião de trabalho, alguém diz: “A reforma terminou porque IBS e CBS começaram em 2026.” Como você corrigiria essa afirmação?",
    scoringRuleId: "keyword-groups-v1",
    verified: true,
    kind: "short-text",
    acceptedKeywordGroups: [
      ["2026"],
      ["teste", "início", "inicio", "começo", "comeco"],
      ["transição", "transicao", "gradual", "2033"],
    ],
    feedbackCorrect:
      "Você separou o início operacional da conclusão do processo: isso é transferência sem a lente da fofoca.",
    feedbackWrong:
      "Inclua três ideias: 2026, fase inicial/teste e transição gradual até o modelo integral (2033).",
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    misconceptionId: "m-terminou-2026",
    asksConfidence: true,
  },
]) satisfies Assessment[];

export const concepts = conceptSchema.array().parse([
  {
    id: "objetivos-reforma",
    subjectId: subject.id,
    name: "Objetivos da Reforma",
    description:
      "Simplificação, transparência, redução da cumulatividade, neutralidade e segurança jurídica — sem promessa individual de preço menor.",
    prerequisiteIds: [],
    learningObjectiveIds: ["explicar-objetivos-gerais"],
    misconceptionIds: ["m-tudo-mais-barato"],
    assessmentIds: ["a-ep5-precos"],
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    riskLevel: "high",
    version: 1,
    verifiedAt,
  },
  {
    id: "cbs",
    subjectId: subject.id,
    name: "CBS",
    description:
      "Contribuição sobre Bens e Serviços da esfera federal, que substitui PIS/Cofins na transição.",
    prerequisiteIds: [],
    learningObjectiveIds: ["associar-cbs-uniao"],
    misconceptionIds: ["m-produto-servico"],
    assessmentIds: ["a-ep2-esferas", "a-ep2-matching", "a-final-cbs"],
    sourceIds: ["ec-132-2023", "lc-214-2025", "rfb-entenda-rtc"],
    riskLevel: "high",
    version: 1,
    verifiedAt,
  },
  {
    id: "ibs",
    subjectId: subject.id,
    name: "IBS",
    description:
      "Imposto sobre Bens e Serviços de competência compartilhada entre estados, municípios e Distrito Federal.",
    prerequisiteIds: [],
    learningObjectiveIds: ["associar-ibs-entes"],
    misconceptionIds: ["m-produto-servico"],
    assessmentIds: ["a-ep2-esferas", "a-ep2-matching", "a-final-ibs", "a-final-substituicao"],
    sourceIds: ["ec-132-2023", "lc-214-2025", "lc-227-2026"],
    riskLevel: "high",
    version: 1,
    verifiedAt,
  },
  {
    id: "imposto-seletivo",
    subjectId: subject.id,
    name: "Imposto Seletivo",
    description:
      "Tributo federal com incidência seletiva sobre bens e serviços definidos em lei por efeitos prejudiciais à saúde ou ao meio ambiente.",
    prerequisiteIds: [],
    learningObjectiveIds: ["distinguir-is-iva-dual"],
    misconceptionIds: ["m-is-iva"],
    assessmentIds: ["a-ep3-is", "a-final-is"],
    sourceIds: ["ec-132-2023", "lc-214-2025", "rfb-entenda-rtc"],
    riskLevel: "high",
    version: 1,
    verifiedAt,
  },
  {
    id: "transicao",
    subjectId: subject.id,
    name: "Transição 2026–2033",
    description:
      "Processo gradual que começa com teste em 2026 e chega ao modelo integral em 2033.",
    prerequisiteIds: [],
    learningObjectiveIds: ["ordenar-marcos-transicao", "negar-fim-2026"],
    misconceptionIds: ["m-terminou-2026"],
    assessmentIds: [
      "a-ep1-transicao",
      "a-ep4-ordem",
      "a-final-2026",
      "a-final-substituicao",
      "a-final-transfer",
    ],
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    riskLevel: "high",
    version: 1,
    verifiedAt,
  },
]) satisfies Concept[];

export const lens = lensSchema.parse({
  id: "fofoca",
  name: "Fofoca",
  description:
    "Uma lente narrativa temporária para investigar afirmações, conferir versões e chegar à regra oficial.",
  vocabulary: [
    { term: "fofoca", meaning: "alegação que precisa ser verificada" },
    { term: "vazou", meaning: "gancho narrativo, nunca fonte jurídica" },
    { term: "dossiê", meaning: "síntese de evidências de aprendizagem" },
  ],
  narrativePatterns: ["alguém afirma", "outra pessoa desconfia", "a fonte esclarece"],
  toneRules: [
    "brasileiro natural",
    "humor sem infantilização",
    "regra e narrativa visualmente distintas",
  ],
  prohibitedPatterns: [
    "personagem como autoridade jurídica",
    "rumor como fato",
    "analogia sem limite",
  ],
  version: 1,
}) satisfies Lens;

export const lensMappings = lensMappingSchema.array().parse(
  concepts.map((concept) => ({
    id: `lm-${concept.id}`,
    conceptId: concept.id,
    lensId: lens.id,
    sourceDomain: "conversa social",
    mapping: [
      {
        source: "uma versão que circula",
        target: concept.name,
        explanation:
          "A curiosidade abre a investigação; a regra oficial substitui a versão social.",
      },
    ],
    limitations: [
      "A narrativa é apenas scaffold: não representa a estrutura jurídica nem substitui a fonte oficial.",
    ],
    misconceptionRisks: ["Confundir simplificação narrativa com equivalência jurídica literal."],
    suitability: {
      structuralFit: 82,
      misconceptionSafety: 78,
      extensibility: 72,
      transferPotential: 76,
      familiarity: 90,
      narrativePotential: 92,
    },
    fadePlanId: "fade-p0-f1-f2-f3-f5",
    status: "verified",
  })),
) satisfies LensMapping[];

export const episodes = episodeSchema.array().parse([
  {
    id: "ep-1",
    moduleId: "modulo-1",
    number: 1,
    title: "Acabaram cinco impostos. Confia.",
    hook: "Nina ouviu que cinco impostos acabaram e foram substituídos por três. Rafa garante que a troca terminou em 2026.",
    messages: [
      {
        character: "Nina",
        text: "Me disseram que cinco impostos acabaram e agora são só três. Resolvido?",
      },
      { character: "Rafa", text: "Sim. Começou IBS e CBS em 2026, então a troca já terminou." },
      {
        character: "Lia",
        text: "Tem coisa certa aí — e uma conclusão bem suspeita. Qual é a fonte?",
      },
    ],
    truth: {
      title: "A regra, sem telefone sem fio",
      body: "2026 inicia uma fase de teste. A substituição não acontece de uma vez.",
      items: [
        "PIS + Cofins → CBS",
        "ICMS + ISS → IBS, gradualmente entre 2029 e 2033",
        "IPI → tratamento específico durante a transição",
        "+ Imposto Seletivo, com função própria",
      ],
      sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    },
    assessmentIds: ["a-ep1-transicao"],
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    conceptIds: ["transicao", "cbs", "ibs", "imposto-seletivo"],
    closingHook: "Então por que existem dois tributos tão parecidos?",
    fadeStage: "F1",
    estimatedMinutes: 4,
    version: 1,
    status: "verified",
  },
  {
    id: "ep-2",
    moduleId: "modulo-1",
    number: 2,
    title: "CBS e IBS são gêmeos?",
    hook: "Os nomes parecem parentes. Rafa tenta separar os dois com uma regra antiga.",
    messages: [
      { character: "Rafa", text: "Fácil: um cobra produto e o outro serviço." },
      { character: "Nina", text: "Mas os dois têm ‘bens e serviços’ no nome…" },
      {
        character: "Lia",
        text: "Boa pista. A diferença principal está em quem institui e administra cada tributo.",
      },
    ],
    truth: {
      title: "Mesma família de arquitetura, contas institucionais diferentes",
      body: "CBS é federal. IBS envolve estados, municípios e Distrito Federal. A analogia tem limites: são tributos juridicamente distintos.",
      items: ["CBS → União", "IBS → estados, municípios e DF"],
      sourceIds: ["ec-132-2023", "lc-214-2025", "lc-227-2026"],
    },
    assessmentIds: ["a-ep2-esferas", "a-ep2-matching"],
    sourceIds: ["ec-132-2023", "lc-214-2025", "lc-227-2026"],
    conceptIds: ["cbs", "ibs"],
    closingHook: "E aquele terceiro nome da história — o Seletivo — entra onde?",
    fadeStage: "F2",
    estimatedMinutes: 4,
    version: 1,
    status: "verified",
  },
  {
    id: "ep-3",
    moduleId: "modulo-1",
    number: 3,
    title: "E esse Seletivo?",
    hook: "Rafa encaixa o IS como se fosse só mais um pedaço do mesmo IVA.",
    messages: [
      { character: "Rafa", text: "Então o IS é o terceiro pedaço do IVA." },
      { character: "Lia", text: "Não. Estar na mesma reforma não significa ter a mesma função." },
      { character: "Nina", text: "Então o que torna esse imposto seletivo?" },
    ],
    truth: {
      title: "Uma função própria",
      body: "O Imposto Seletivo é federal e incide sobre bens e serviços definidos constitucional e legalmente por serem prejudiciais à saúde ou ao meio ambiente. Não é o terceiro componente do IVA dual.",
      sourceIds: ["ec-132-2023", "lc-214-2025", "rfb-entenda-rtc"],
    },
    assessmentIds: ["a-ep3-is"],
    sourceIds: ["ec-132-2023", "lc-214-2025", "rfb-entenda-rtc"],
    conceptIds: ["imposto-seletivo"],
    closingHook: "Se a troca é gradual, qual é a ordem real dos acontecimentos?",
    fadeStage: "F2",
    estimatedMinutes: 4,
    version: 1,
    status: "verified",
  },
  {
    id: "ep-4",
    moduleId: "modulo-1",
    number: 4,
    title: "O calendário vazou",
    hook: "Agora a conversa sai do slogan e entra no calendário.",
    messages: [
      { character: "Nina", text: "Se 2026 não encerra a reforma, o que acontece depois?" },
      {
        character: "Lia",
        text: "Primeiro teste. Depois mudanças federais. A substituição de ICMS e ISS começa mais tarde e avança aos poucos.",
      },
    ],
    truth: {
      title: "Fofoca de hoje — verificada em 29/08/2026",
      body: "O calendário operacional pode mudar e deve ser revisto. Hoje, a linha introdutória oficial é:",
      items: [
        "2026 — fase de teste de CBS e IBS",
        "2027–2028 — mudanças federais relevantes, com CBS, IS e tratamento do IPI",
        "2029 — início da substituição gradual de ICMS/ISS pelo IBS",
        "2030–2032 — continuidade da transição",
        "2033 — modelo integral; ICMS e ISS extintos",
      ],
      sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    },
    assessmentIds: ["a-ep4-ordem"],
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc", "rfb-orientacoes-2026"],
    conceptIds: ["transicao"],
    closingHook: "Tudo isso garante imposto menor e preço mais baixo?",
    fadeStage: "F3",
    estimatedMinutes: 4,
    version: 1,
    status: "verified",
  },
  {
    id: "ep-5",
    moduleId: "modulo-1",
    number: 5,
    title: "Mas por que mexer nisso tudo?",
    hook: "Nina pergunta o que a reforma pretende resolver. Rafa transforma objetivo em promessa.",
    messages: [
      { character: "Nina", text: "Então a reforma quer baixar imposto e preço?" },
      { character: "Rafa", text: "Com certeza. Tudo vai ficar mais barato." },
      {
        character: "Lia",
        text: "Essa promessa não está na regra. Vamos separar objetivos gerais de resultado individual.",
      },
    ],
    truth: {
      title: "Objetivos, não garantias individuais",
      body: "A reforma busca simplificação, transparência, redução da cumulatividade, neutralidade e segurança jurídica. Isso não garante redução de carga para todos nem queda de todos os preços.",
      items: [
        "Simplificação",
        "Transparência",
        "Menos cumulatividade",
        "Neutralidade",
        "Segurança jurídica",
      ],
      sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    },
    assessmentIds: ["a-ep5-precos"],
    sourceIds: ["ec-132-2023", "rfb-entenda-rtc"],
    conceptIds: ["objetivos-reforma"],
    closingHook: "Agora é hora de contar essa história sem depender do roteiro.",
    fadeStage: "F5",
    estimatedMinutes: 4,
    version: 1,
    status: "verified",
  },
]) satisfies Episode[];

export const moduleOne = moduleSchema.parse({
  id: "modulo-1",
  subjectId: subject.id,
  seasonTitle: "Vazou a Reforma",
  title: "A fofoca que vai trocar os impostos de lugar",
  description:
    "Cinco episódios para distinguir CBS, IBS, Imposto Seletivo, objetivos e a transição até 2033.",
  episodeIds: episodes.map((episode) => episode.id),
  finalAssessmentIds: [
    "a-final-cbs",
    "a-final-ibs",
    "a-final-is",
    "a-final-2026",
    "a-final-substituicao",
    "a-final-transfer",
  ],
  estimatedMinutes: 20,
  prerequisiteConceptIds: [],
  status: "verified",
  version: 1,
}) satisfies Module;

export const content = {
  subject,
  sources,
  misconceptions,
  assessments,
  concepts,
  lens,
  lensMappings,
  episodes,
  module: moduleOne,
};

const ids = <T extends { id: string }>(items: T[]) => new Set(items.map((item) => item.id));
export function validateContentGraph(): void {
  const sourceIds = ids(sources);
  const conceptIds = ids(concepts);
  const assessmentIds = ids(assessments);
  const misconceptionIds = ids(misconceptions);
  const missing: string[] = [];
  const check = (kind: string, owner: string, refs: string[], available: Set<string>) =>
    refs.forEach((ref) => {
      if (!available.has(ref)) missing.push(`${kind} ausente: ${owner} → ${ref}`);
    });
  concepts.forEach((item) => {
    check("source", item.id, item.sourceIds, sourceIds);
    check("assessment", item.id, item.assessmentIds, assessmentIds);
    check("misconception", item.id, item.misconceptionIds, misconceptionIds);
    check("pré-requisito", item.id, item.prerequisiteIds, conceptIds);
  });
  assessments.forEach((item) => {
    check("source", item.id, item.sourceIds, sourceIds);
    check("conceito", item.id, item.conceptIds, conceptIds);
  });
  episodes.forEach((item) => {
    check("source", item.id, item.sourceIds, sourceIds);
    check("assessment", item.id, item.assessmentIds, assessmentIds);
    check("conceito", item.id, item.conceptIds, conceptIds);
  });
  check("episódio", moduleOne.id, moduleOne.episodeIds, ids(episodes));
  check("assessment final", moduleOne.id, moduleOne.finalAssessmentIds, assessmentIds);
  if (missing.length > 0) throw new Error(`Conteúdo inválido:\n${missing.join("\n")}`);
}

validateContentGraph();

export const getAssessment = (id: string) => assessments.find((item) => item.id === id);
export const getConcept = (id: string) => concepts.find((item) => item.id === id);
export const getEpisode = (id: string) => episodes.find((item) => item.id === id);
export const getSource = (id: string) => sources.find((item) => item.id === id);
export const getMisconception = (id: string) => misconceptions.find((item) => item.id === id);
