export type UserRole = 'admin' | 'creator' | 'reviewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organisation: string;
  avatarUrl?: string;
}

export type GuidelineCategory = 
  | 'voice' 
  | 'terminology' 
  | 'claims' 
  | 'facts' 
  | 'visual' 
  | 'regional' 
  | 'accessibility';

export interface BrandGuideline {
  id: string;
  category: GuidelineCategory;
  title: string;
  ruleStatement: string;
  rationale: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  forbiddenTerms?: string[];
  approvedTerms?: string[];
  verifiedFacts?: string[];
  restrictedClaims?: string[];
  language?: 'English' | 'Hindi' | 'Marathi' | 'All';
  version: string;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  updatedBy: string;
}

export type SubmissionStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Analysing' 
  | 'Needs Changes' 
  | 'Pending Approval' 
  | 'Approved' 
  | 'Rejected';

export type IssueSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
export type IssueCategory = 'Tone' | 'Terminology' | 'Facts' | 'Claims' | 'Visual' | 'Multilingual' | 'Accessibility';

export interface AnalysisIssue {
  id: string;
  category: IssueCategory;
  title: string;
  severity: IssueSeverity;
  excerpt: string;
  explanation: string;
  supportingGuideline: string;
  sourceId: string;
  suggestedAction: string;
  suggestedReplacement?: string;
  isUncertain?: boolean;
  status: 'unresolved' | 'accepted' | 'edited' | 'rejected';
  userCustomText?: string;
}

export interface AnalysisReport {
  id: string;
  submissionId: string;
  overallComplianceScore: number;
  summary: string;
  issues: AnalysisIssue[];
  analyzedAt: string;
  metrics: {
    readabilityScore: number; // e.g. 72 (Flesch-Kincaid)
    readabilityLevel: string; // e.g. "Standard / Accessible"
    contrastRatio: string; // e.g. "7.2:1 (Passes AAA)"
    detectedLanguage: 'English' | 'Hindi' | 'Marathi';
  };
}

export interface RevisionEntry {
  revisionNumber: number;
  timestamp: string;
  modifiedBy: string;
  role: string;
  action: string;
  contentSnapshot: string;
  notes?: string;
}

export interface ContentSubmission {
  id: string;
  title: string;
  type: 'text' | 'document' | 'pdf' | 'creative';
  rawContent: string;
  currentContent: string;
  campaign?: string;
  channel?: 'Social Media' | 'Ad Campaign' | 'Website' | 'Brochure' | 'Presentation' | 'Email';
  language: 'English' | 'Hindi' | 'Marathi';
  creatorName: string;
  creatorEmail: string;
  organisation: string;
  submittedAt: string;
  status: SubmissionStatus;
  complianceScore: number;
  analysisReport?: AnalysisReport;
  revisionHistory: RevisionEntry[];
  reviewerNotes?: string;
  thumbnail?: string;
}

export interface TestRuleSimulation {
  proposedRule: string;
  category: GuidelineCategory;
  totalAssetsScanned: number;
  affectedAssetsCount: number;
  projectedViolations: number;
  severityBreakdown: {
    Critical: number;
    High: number;
    Medium: number;
    Low: number;
  };
  sampleImpacts: {
    assetId: string;
    assetTitle: string;
    channel: string;
    snippet: string;
    violationReason: string;
    recommendedChange: string;
  }[];
}

export interface ButterflyNode {
  id: string;
  title: string;
  type: 'rule' | 'campaign' | 'channel' | 'asset';
  channel?: string;
  impactLevel: 'direct' | 'indirect' | 'review' | 'none';
  details: string;
  connections: string[];
}

export interface EvolutionPattern {
  id: string;
  guidelineId: string;
  guidelineTitle: string;
  recurringViolationCount: number;
  patternSummary: string;
  userFrictionReason: string;
  recommendedImprovement: string;
  status: 'pending_review' | 'approved' | 'dismissed';
}
