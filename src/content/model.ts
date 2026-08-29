export type ContentStatus =
  | "requested"
  | "researching"
  | "draft"
  | "review"
  | "beta"
  | "verified"
  | "update_required"
  | "archived";

export type EvidenceType = "recognition" | "recall" | "application" | "transfer" | "teach-back";
export type MasteryLevel =
  "discovering" | "familiar" | "understood" | "proficient" | "consolidated";

export interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string;
  domainIds: string[];
  status: ContentStatus;
  version: number;
}

export interface Concept {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  prerequisiteIds: string[];
  learningObjectiveIds: string[];
  misconceptionIds: string[];
  assessmentIds: string[];
  sourceIds: string[];
  riskLevel: "normal" | "high";
  version: number;
  verifiedAt: string;
}

export interface LensVocabularyItem {
  term: string;
  meaning: string;
}
export interface Lens {
  id: string;
  name: string;
  description: string;
  vocabulary: LensVocabularyItem[];
  narrativePatterns: string[];
  toneRules: string[];
  prohibitedPatterns: string[];
  version: number;
}

export interface LensSuitability {
  structuralFit: number;
  misconceptionSafety: number;
  extensibility: number;
  transferPotential: number;
  familiarity: number;
  narrativePotential: number;
}

export interface LensMapping {
  id: string;
  conceptId: string;
  lensId: string;
  sourceDomain: string;
  mapping: { source: string; target: string; explanation: string }[];
  limitations: string[];
  misconceptionRisks: string[];
  suitability: LensSuitability;
  fadePlanId: string;
  status: "draft" | "reviewed" | "verified";
}

export interface Source {
  id: string;
  title: string;
  authority: string;
  url: string;
  legalReference?: string;
  sourceType: "constitution" | "law" | "regulation" | "official-guidance" | "academic" | "other";
  effectiveFrom?: string;
  effectiveUntil?: string;
  verifiedAt: string;
  freshnessClass: "stable" | "legislative" | "operational";
  status: ContentStatus;
}

export type InteractionKind = "single-choice" | "boolean" | "order" | "matching" | "short-text";
export interface Choice {
  id: string;
  label: string;
}

export interface Assessment {
  id: string;
  conceptIds: string[];
  type: EvidenceType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  scoringRuleId: string;
  lensId?: string;
  verified: boolean;
  kind: InteractionKind;
  choices?: Choice[];
  correctChoiceIds?: string[];
  orderItems?: Choice[];
  correctOrder?: string[];
  matchLeft?: Choice[];
  matchRight?: Choice[];
  correctMatches?: Record<string, string>;
  acceptedKeywordGroups?: string[][];
  feedbackCorrect: string;
  feedbackWrong: string;
  sourceIds: string[];
  misconceptionId?: string;
  asksConfidence?: boolean;
}

export interface MasteryEvidence {
  id: string;
  conceptId: string;
  assessmentId: string;
  outcome: number;
  evidenceType: EvidenceType;
  hintUsed: boolean;
  confidence?: 1 | 2 | 3;
  occurredAt: string;
  delaySinceLearningHours: number;
}

export interface ConceptState {
  conceptId: string;
  mastery: number;
  level: MasteryLevel;
  evidenceIds: string[];
  misconceptionIds: string[];
  nextReviewAt?: string;
  updatedAt: string;
}

export interface StoryMessage {
  character: "Nina" | "Rafa" | "Lia";
  text: string;
}
export interface TruthBlock {
  title: string;
  body: string;
  items?: string[];
  sourceIds: string[];
}

export interface Episode {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  hook: string;
  messages: StoryMessage[];
  truth: TruthBlock;
  assessmentIds: string[];
  sourceIds: string[];
  conceptIds: string[];
  closingHook: string;
  fadeStage: "F1" | "F2" | "F3" | "F4" | "F5";
  estimatedMinutes: number;
  version: number;
  status: ContentStatus;
}

export interface Module {
  id: string;
  subjectId: string;
  seasonTitle: string;
  title: string;
  description: string;
  episodeIds: string[];
  finalAssessmentIds: string[];
  estimatedMinutes: number;
  prerequisiteConceptIds: string[];
  status: ContentStatus;
  version: number;
}

export interface Misconception {
  id: string;
  conceptIds: string[];
  claim: string;
  correction: string;
  whyPlausible: string;
  sourceIds: string[];
  status: ContentStatus;
}
